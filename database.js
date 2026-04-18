// ═══════════════════════════════════════════════
// DATABASE.JS — Connexion MongoDB
// ═══════════════════════════════════════════════

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_marc';

let connected = false;

async function connectDB() {
  if (connected) return;
  try {
    await mongoose.connect(MONGO_URI);
    connected = true;
    console.log('\x1b[32m[DB] ✓ MongoDB connecté :', mongoose.connection.host, '\x1b[0m');
  } catch (err) {
    console.warn('\x1b[33m[DB] MongoDB non disponible – utilisation du fichier JSON\x1b[0m');
    // Le serveur continue avec data.json comme fallback
  }
}

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('[DB] Connexion fermée');
  process.exit(0);
});

module.exports = { connectDB, mongoose };
