document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

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
            } else {
                const error = await response.json();
                alert('Errore nella registrazione: ' + error.error);
            }
        } catch (error) {
            console.error('Errore durante la registrazione:', error);
            alert('Si è verificato un errore durante la registrazione.');
        }
    });
});
