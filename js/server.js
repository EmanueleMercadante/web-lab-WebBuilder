// Importa i pacchetti necessari
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config(); // Carica le variabili d'ambiente dal file .env

// Crea un'app Express
const app = express();
const port = 3000;

// Middleware per parsare JSON
app.use(bodyParser.json());

// Configura la connessione al database
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Utilizza l'URL del database da Vercel
  ssl: {
    rejectUnauthorized: false, // Necessario per connessioni SSL
  },
});

// **ROUTE DI REGISTRAZIONE**
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica se l'utente esiste già
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Utente già registrato' });
    }

    // Registra un nuovo utente
    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [
      username,
      email,
      password, // Nota: dovresti aggiungere l'hashing delle password
    ]);

    res.status(201).json({ message: 'Registrazione avvenuta con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella registrazione' });
  }
});

// **ROUTE DI LOGIN**
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se l'utente esiste
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Email o password errati' });
    }

    // Verifica la password (nota: dovresti usare bcrypt per hash)
    if (user.rows[0].password !== password) {
      return res.status(400).json({ error: 'Email o password errati' });
    }

    res.status(200).json({ message: 'Login avvenuto con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel login' });
  }
});

// **TEST DELLA CONNESSIONE AL DATABASE**
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connessione al database riuscita', time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella connessione al database' });
  }
});

// **AVVIO DEL SERVER**
app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});
