// Function to toggle the theme and set the icon based on the current theme
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    document.getElementById('themeIcon').textContent = currentTheme === 'light' ? '🔅' : '🌙';
}

// Function to apply the theme based on the saved preference
function applyTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        document.getElementById('themeIcon').textContent = '🌙'; // Set icon for dark mode
    } else {
        body.classList.remove('dark-mode');
        document.getElementById('themeIcon').textContent = '🔅'; // Set icon for light mode
    }
}

// Load theme preference on page load
const savedTheme = localStorage.getItem('theme') || 'light'; // Default to 'light' if not set
applyTheme(savedTheme);

// Assign the toggle function to the button
document.getElementById('themeToggle').onclick = toggleTheme;

// Function to toggle project expansion
function toggleProject(card) {
    card.classList.toggle('expanded');
    const isExpanded = card.classList.contains('expanded');

    if (isExpanded) {
        card.innerHTML += `
            <button onclick="this.parentNode.classList.remove('expanded')">Close</button>
            <div class="expanded-content">
                <h3>Details:</h3>
                <p>This project demonstrates key skills in web development and programming, focusing on creating dynamic and user-friendly applications.</p>
                <img src="path/to/your/image.jpg" alt="Project Image" class="project-image" style="display: block;" />
            </div>
        `;
    } else {
        const buttonIndex = card.innerHTML.indexOf('<button');
        if (buttonIndex !== -1) {
            card.innerHTML = card.innerHTML.slice(0, buttonIndex); // Remove the expanded content
        }
    }
}
