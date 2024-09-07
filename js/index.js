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
