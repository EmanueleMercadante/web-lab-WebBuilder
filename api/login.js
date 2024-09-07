import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Carica le variabili d'ambiente

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Handler per il login lato server
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password sono obbligatori' });
    }

    try {
      // Cerca l'utente nel database
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ error: 'Utente non trovato' });
      }

      // Verifica la password (dovresti usare bcrypt per l'hashing delle password)
      if (user.rows[0].password !== password) {
        return res.status(400).json({ error: 'Password errata' });
      }

      // Se la password è corretta, restituisci i dati dell'utente
      const userData = {
        username: user.rows[0].username,
        email: user.rows[0].email,
      };

      // Restituisci i dati per il client
      res.status(200).json({
        message: 'Login avvenuto con successo',
        user: userData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore nel login' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Metodo ${req.method} non permesso`);
  }
}
