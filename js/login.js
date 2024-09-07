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
                alert('Login avvenuto con successo! Benvenuto, ' + result.user.username + '!');

                // Salva lo stato dell'utente nel localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', result.user.username); // Salva il nome utente
                localStorage.setItem('userEmail', result.user.email);   // Salva l'email

                // Reindirizza l'utente alla dashboard
                window.location.href = '/dashboard.html'; // Assicurati di avere questa pagina
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
