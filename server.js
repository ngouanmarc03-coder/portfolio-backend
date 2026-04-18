// ═══════════════════════════════════════════════
// SERVER.JS — Portfolio Marc – Backend Express
// Hébergement recommandé : Render.com
// ═══════════════════════════════════════════════

const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const { connectDB } = require('./database');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARES ──────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── STATIC FILES (si hébergé ensemble) ──
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// ── API ROUTES ───────────────────────
app.use('/api', require('./routes/contactRoutes'));
app.use('/api', require('./routes/adminRoutes'));

// ── HEALTH CHECK ─────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString(), server: 'Portfolio Marc' });
});

// ── SPA FALLBACK ─────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ── START ─────────────────────────────
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log('\x1b[32m%s\x1b[0m', `
╔══════════════════════════════════════╗
║   < PORTFOLIO MARC – SERVER />       ║
║   Port    : ${PORT}                     ║
║   URL     : http://localhost:${PORT}    ║
║   Admin   : http://localhost:${PORT}/admin ║
╚══════════════════════════════════════╝`);
  });
}
start();

module.exports = app;
