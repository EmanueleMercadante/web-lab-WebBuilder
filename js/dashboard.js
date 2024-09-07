document.addEventListener('DOMContentLoaded', function() {
    // Controlla se l'utente è loggato
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('userEmail');

  

    // Mostra il nome utente e l'email nella dashboard
    const userEmailElement = document.getElementById('userEmail');
    const usernameElement = document.getElementById('username');
    userEmailElement.textContent = email;
    usernameElement.textContent = username;

    // Carica il logo del profilo (puoi gestire immagini specifiche per ogni utente se necessario)
    const profileLogo = document.getElementById('profile-logo');
    profileLogo.src = 'path/to/profile-logo.png'; // Sostituisci con il logo corretto per ogni utente

    // Gestisci il logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.href = '/login.html';
    });

    // Menu laterale
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const menuItems = document.querySelectorAll('.side-menu li');
    const modal = document.getElementById('sectionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');

    // Toggle side menu
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.toggle('expanded');
    });

    // Gestisci i click sugli elementi del menu
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            openModal(section);
        });
    });

    // Chiudi il modale
    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Chiudi il modale quando si clicca fuori dal modale
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Apri il modale e riempi con i dati pertinenti
    function openModal(section) {
        modalTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);

        if (section === 'overview') {
            modalContent.innerHTML = `
                <p>Welcome to your dashboard, ${username}!</p>
                <ul>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Projects:</strong> 5 active projects</li>
                    <li><strong>Messages:</strong> 3 unread messages</li>
                    <li><strong>Account Created:</strong> January 12, 2023</li>
                </ul>
            `;
        } else if (section === 'profile') {
            modalContent.innerHTML = `
                <p>Manage your profile details here.</p>
                <form id="profileForm">
                    <label for="username">Username:</label>
                    <input type="text" id="usernameInput" value="${username}" disabled><br><br>

                    <label for="email">Email:</label>
                    <input type="email" id="emailInput" value="${email}" disabled><br><br>

                    <label for="password">Change Password:</label>
                    <input type="password" id="password" placeholder="Enter new password"><br><br>

                    <button type="submit">Save Changes</button>
                </form>
            `;
        } else if (section === 'projects') {
            modalContent.innerHTML = `
                <p>Here are your active projects:</p>
                <ul>
                    <li><strong>Project 1:</strong> Website Redesign</li>
                    <li><strong>Project 2:</strong> Mobile App Development</li>
                    <li><strong>Project 3:</strong> Backend API Development</li>
                </ul>
                <p><a href="#">Create a new project</a></p>
            `;
        } else if (section === 'messages') {
            modalContent.innerHTML = `
                <p>You have the following messages:</p>
                <ul>
                    <li><strong>Message 1:</strong> "Meeting scheduled for Friday..."</li>
                    <li><strong>Message 2:</strong> "Update on project status..."</li>
                    <li><strong>Message 3:</strong> "Invitation to join new project..."</li>
                </ul>
                <p><a href="#">View all messages</a> | <a href="#">Compose new message</a></p>
            `;
        } else if (section === 'settings') {
            modalContent.innerHTML = `
                <p>Adjust your account settings here:</p>
                <ul>
                    <li><label><input type="checkbox" checked> Enable email notifications</label></li>
                    <li><label><input type="checkbox"> Enable SMS notifications</label></li>
                    <li><label><input type="checkbox" checked> Make profile public</label></li>
                </ul>
                <button>Save Settings</button>
            `;
        }

        modal.style.display = "block"; // Mostra il modale
    }
});
