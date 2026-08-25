import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);
const dbPath = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'carla.sqlite');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS future_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, profile TEXT NOT NULL UNIQUE, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);

app.use(cors({ origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',').map(v => v.trim()) : true }));
app.use(express.json({ limit: '8kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'carla-birthday-api' }));

app.get('/api/future-message', (req, res) => {
  const profile = String(req.query.profile || 'carla').trim().slice(0, 64);
  const row = db.prepare('SELECT message, created_at, updated_at FROM future_messages WHERE profile = ?').get(profile);
  if (!row) return res.status(404).json({ message: null });
  res.json(row);
});

app.put('/api/future-message', (req, res) => {
  const profile = String(req.body?.profile || 'carla').trim().slice(0, 64);
  const message = String(req.body?.message || '').trim();
  if (!message) return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
  if (message.length > 4000) return res.status(400).json({ error: 'El mensaje no puede superar 4000 caracteres.' });

  const now = new Date().toISOString();
  db.prepare(`INSERT INTO future_messages (profile, message, created_at, updated_at) VALUES (?, ?, ?, ?)
    ON CONFLICT(profile) DO UPDATE SET message = excluded.message, updated_at = excluded.updated_at`).run(profile, message, now, now);
  res.json({ ok: true, message, updated_at: now });
});

app.delete('/api/future-message', (req, res) => {
  const profile = String(req.query.profile || 'carla').trim().slice(0, 64);
  db.prepare('DELETE FROM future_messages WHERE profile = ?').run(profile);
  res.status(204).end();
});

app.listen(port, '0.0.0.0', () => console.log(`Carla API listening on port ${port}`));
