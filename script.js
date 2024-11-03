// Toggle theme and set icon based on theme
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  document.getElementById('themeIcon').textContent = currentTheme === 'light' ? '🔅' : '🌙';
}

// Assign toggle function to the button if not already assigned
document.getElementById('themeToggle').onclick = toggleTheme;

function toggleProject(card) {
  card.classList.toggle('expanded');
  const isExpanded = card.classList.contains('expanded');

  if (isExpanded) {
    card.innerHTML += 
      <button onclick="this.parentNode.classList.remove('expanded')">Close</button>
      <div class="expanded-content">
        <h3>Details:</h3>
        <p>This project demonstrates key skills in web development and programming, focusing on creating dynamic and user-friendly applications.</p>
        <img src="portfolio.png" alt="Project Image" class="project-image" style="display: block;" />
      </div>
    ;
  } else {
    card.innerHTML = card.innerHTML.split('<button')[0];
  }
}

// Select the toggle button
const themeToggleButton = document.getElementById('theme-toggle'); // Adjust this selector as needed

// Function to apply the theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Load theme preference on page load
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Toggle the theme and save preference
themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
});

// Function to apply the theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.getElementById('themeIcon').textContent = theme === 'light' ? '🔅' : '🌙';
}

// Load theme preference on page load
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Toggle the theme and save preference
document.getElementById('themeToggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
});

