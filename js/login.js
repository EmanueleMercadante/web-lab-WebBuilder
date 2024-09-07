document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validazione dei campi
        if (!email || !password) {
            alert('Tutti i campi sono obbligatori.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Inserisci un indirizzo email valido.');
            return;
        }

        // Crea un oggetto con i dati da inviare
        const data = {
            email: email,
            password: password
        };

        try {
            // Invia i dati al server con una richiesta POST
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Gestisci la risposta dal server
            if (response.ok) {
                const result = await response.json();
                alert('Login avvenuto con successo! Benvenuto!');
                window.location.href = '/dashboard'; // Reindirizza a una dashboard
            } else {
                const error = await response.json();
                alert('Errore nel login: ' + error.error);
            }
        } catch (error) {
            console.error('Errore durante il login:', error);
            alert('Si è verificato un errore durante il login.');
        }
    });

    // Funzione per validare l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
