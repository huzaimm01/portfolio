    // Function to apply the theme
function applyTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        document.getElementById('themeIcon').textContent = '🌙'; // Update icon for dark mode
    } else {
        body.classList.remove('dark-mode');
        document.getElementById('themeIcon').textContent = '🔅'; // Update icon for light mode
    }
}

// Load theme preference on page load
const savedTheme = localStorage.getItem('theme') || 'light'; // Default to 'light' if nothing is saved
applyTheme(savedTheme); // Apply the saved theme on load

// Toggle the theme and save preference
document.getElementById('themeToggle').onclick = function () {
    const currentTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme); // Save preference
    applyTheme(currentTheme); // Apply new theme
};


//end of retainer code

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
    card.innerHTML += `
      <button onclick="this.parentNode.classList.remove('expanded')">Close</button>
      <div class="expanded-content">
        <h3>Details:</h3>
        <p>This project demonstrates key skills in web development and programming, focusing on creating dynamic and user-friendly applications.</p>
        <img src="portfolio.png" alt="Project Image" class="project-image" style="display: block;" />
      </div>
    `;
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


// Function to apply the saved or default theme
function applyTheme(theme) {
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');
  
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '🌙'; // Icon for dark mode
  } else {
    body.classList.remove('dark-mode');
    themeIcon.textContent = '🔅'; // Icon for light mode
  }
}

// Toggle theme and save the selection to localStorage
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
  
  // Toggle the dark-mode class
  body.classList.toggle('dark-mode');
  
  // Update the icon
  document.getElementById('themeIcon').textContent = currentTheme === 'dark' ? '🌙' : '🔅';
  
  // Save the selected theme to localStorage
  localStorage.setItem('theme', currentTheme);
}

// Retrieve and apply the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light if no theme is saved
  applyTheme(savedTheme);
});

// Attach the toggleTheme function to the theme toggle button
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
