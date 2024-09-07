const { Pool } = require('pg');
require('dotenv').config(); // Carica le variabili d'ambiente dal file .env

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Utilizza l'URL completo da Vercel
  ssl: {
    rejectUnauthorized: false, // Necessario per connessioni SSL
  },
});

module.exports = pool;
