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

await pool.query(`
  CREATE TABLE IF NOT EXISTS mural_photos (
    id BIGSERIAL PRIMARY KEY,
    author VARCHAR(64) NOT NULL DEFAULT 'Anónimo',
    caption TEXT NOT NULL DEFAULT '',
    filter VARCHAR(32) NOT NULL DEFAULT 'natural',
    image_data TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`);

await pool.query(`
  CREATE TABLE IF NOT EXISTS custom_profiles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`);

// CORS is a browser security policy, not API authentication. The API currently
// has no private credentials in browser requests, so allow web clients to call it.
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204
}));
app.use(express.json({ limit: '15mb' }));

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
      'SELECT message, created_at, updated_at FROM future_messages WHERE profile = $1', [profile]
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
      `INSERT INTO future_messages (profile, message) VALUES ($1, $2)
       ON CONFLICT (profile) DO UPDATE SET message = EXCLUDED.message, updated_at = NOW()
       RETURNING message, created_at, updated_at`, [profile, message]
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

// ============================================================================
// MURAL DE FOTOS - REST API
// ============================================================================
app.get('/api/mural-photos', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, author, caption, filter, image_data, created_at FROM mural_photos ORDER BY created_at DESC LIMIT 150'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al recuperar fotos del mural:', err);
    res.status(500).json({ error: 'No se pudieron recuperar las fotos del mural.' });
  }
});

app.post('/api/mural-photos', async (req, res) => {
  const author = String(req.body?.author || 'Anónimo').trim().slice(0, 64);
  const caption = String(req.body?.caption || '').trim().slice(0, 300);
  const filter = String(req.body?.filter || 'natural').trim().slice(0, 32);
  const imageData = String(req.body?.image_data || '').trim();

  if (!imageData) {
    return res.status(400).json({ error: 'La imagen es obligatoria.' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO mural_photos (author, caption, filter, image_data)
       VALUES ($1, $2, $3, $4)
       RETURNING id, author, caption, filter, image_data, created_at`,
      [author, caption, filter, imageData]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error al guardar foto en el mural:', err);
    res.status(500).json({ error: 'No se pudo guardar la foto en el mural.' });
  }
});

app.delete('/api/mural-photos/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id || Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID de foto inválido.' });
  }

  try {
    const result = await pool.query('DELETE FROM mural_photos WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Foto no encontrada.' });
    }
    res.status(204).end();
  } catch (err) {
    console.error('Error al eliminar foto del mural:', err);
    res.status(500).json({ error: 'No se pudo eliminar la foto del mural.' });
  }
});

// ============================================================================
// ARCHIVOS SECRETOS PERSONALIZADOS - CLOUD STORAGE REST API
// ============================================================================
app.get('/api/custom-profiles', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT name, data, created_at, updated_at FROM custom_profiles ORDER BY created_at ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al recuperar perfiles de la nube:', err);
    res.status(500).json({ error: 'No se pudieron recuperar los perfiles de la nube.' });
  }
});

app.post('/api/custom-profiles', async (req, res) => {
  const name = String(req.body?.name || '').trim().slice(0, 120);
  const data = req.body?.data;

  if (!name) {
    return res.status(400).json({ error: 'El nombre del perfil es obligatorio.' });
  }
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Los datos del perfil son obligatorios.' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO custom_profiles (name, data)
       VALUES ($1, $2)
       ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
       RETURNING name, data, created_at, updated_at`,
      [name, JSON.stringify(data)]
    );
    res.status(201).json({ ok: true, profile: rows[0] });
  } catch (err) {
    console.error('Error al guardar perfil en la nube:', err);
    res.status(500).json({ error: 'No se pudo guardar el perfil en la nube.' });
  }
});

app.delete('/api/custom-profiles/:name', async (req, res) => {
  const name = String(req.params.name || '').trim().slice(0, 120);
  if (!name) {
    return res.status(400).json({ error: 'Nombre de perfil inválido.' });
  }

  try {
    const result = await pool.query('DELETE FROM custom_profiles WHERE LOWER(name) = LOWER($1)', [name]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Perfil no encontrado en la nube.' });
    }
    res.status(204).end();
  } catch (err) {
    console.error('Error al eliminar perfil de la nube:', err);
    res.status(500).json({ error: 'No se pudo eliminar el perfil de la nube.' });
  }
});

const server = app.listen(port, '0.0.0.0', () => console.log(`Carla API listening on port ${port}`));
const shutdown = async () => server.close(async () => { await pool.end(); process.exit(0); });
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
