import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 3000);

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

await pool.query(`
  CREATE TABLE IF NOT EXISTS future_messages (
    id BIGSERIAL PRIMARY KEY,
    profile VARCHAR(64) NOT NULL UNIQUE,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`);

const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map(v => v.trim()).filter(Boolean)
  : true;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '8kb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, service: 'carla-birthday-api', database: 'postgresql' });
  } catch {
    res.status(503).json({ ok: false, error: 'Database unavailable' });
  }
});

app.get('/api/future-message', async (req, res) => {
  const profile = String(req.query.profile || 'carla').trim().slice(0, 64);
  if (!profile) return res.status(400).json({ error: 'Perfil inválido.' });

  try {
    const { rows } = await pool.query(
      'SELECT message, created_at, updated_at FROM future_messages WHERE profile = $1',
      [profile]
    );
    if (!rows[0]) return res.status(404).json({ message: null });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: 'No se pudo recuperar el mensaje.' });
  }
});

app.put('/api/future-message', async (req, res) => {
  const profile = String(req.body?.profile || 'carla').trim().slice(0, 64);
  const message = String(req.body?.message || '').trim();

  if (!profile) return res.status(400).json({ error: 'Perfil inválido.' });
  if (!message) return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
  if (message.length > 4000) return res.status(400).json({ error: 'El mensaje no puede superar 4000 caracteres.' });

  try {
    const { rows } = await pool.query(
      `INSERT INTO future_messages (profile, message)
       VALUES ($1, $2)
       ON CONFLICT (profile) DO UPDATE SET message = EXCLUDED.message, updated_at = NOW()
       RETURNING message, created_at, updated_at`,
      [profile, message]
    );
    res.json({ ok: true, ...rows[0] });
  } catch {
    res.status(500).json({ error: 'No se pudo guardar el mensaje.' });
  }
});

app.delete('/api/future-message', async (req, res) => {
  const profile = String(req.query.profile || 'carla').trim().slice(0, 64);
  try {
    await pool.query('DELETE FROM future_messages WHERE profile = $1', [profile]);
    res.status(204).end();
  } catch {
    res.status(500).json({ error: 'No se pudo eliminar el mensaje.' });
  }
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Carla API listening on port ${port}`);
});

const shutdown = async () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
