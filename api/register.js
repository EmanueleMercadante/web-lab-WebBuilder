import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Carica le variabili d'ambiente

// Configura la connessione al database
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Handler per la registrazione
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Controllo dei campi
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }

    try {
      // Verifica se l'utente esiste già
      const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'Utente già registrato' });
      }

      // Inserimento dell'utente
      await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [
        username,
        email,
        password, // Nota: aggiungi l'hashing delle password con bcrypt
      ]);

      res.status(201).json({ message: 'Registrazione avvenuta con successo' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore nella registrazione' });
    }
  } else {
    // Restituisce un errore 405 se il metodo non è POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metodo ${req.method} non permesso`);
  }
}
