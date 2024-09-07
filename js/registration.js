document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validazione dei campi
        if (!username || !email || !password) {
            alert('Tutti i campi sono obbligatori.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Inserisci un indirizzo email valido.');
            return;
        }

        if (password.length < 6) {
            alert('La password deve avere almeno 6 caratteri.');
            return;
        }

        // Crea un oggetto con i dati da inviare
        const data = {
            username: username,
            email: email,
            password: password
        };

        try {
            // Invia i dati al server con una richiesta POST
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Gestisci la risposta dal server
            if (response.ok) {
                const result = await response.json();
                alert('Registrazione completata! Benvenuto su Stack, ' + username + '!');
                form.reset(); // Pulisci il form dopo la registrazione
                window.location.href = '/login.html';
            } else {
                const error = await response.json();
                alert('Errore nella registrazione: ' + error.error);
            }
        } catch (error) {
            console.error('Errore durante la registrazione:', error);
            alert('Si è verificato un errore durante la registrazione.');
        }
    });

    // Funzione per validare l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});





document.addEventListener('DOMContentLoaded', function() {
    // Controlla se l'utente è loggato
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('userEmail');

    // Recupera l'elemento con l'ID 'dash'
    const dashElement = document.getElementById('dash');

    if (isLoggedIn && email) {
        // Se l'utente è loggato, mostra l'elemento 'dash'
        dashElement.style.display = 'inline-block';
    } else {
        // Se non è loggato, nascondi l'elemento 'dash'
        dashElement.style.display = 'none';
    }
});
