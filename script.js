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
        <img src="path/to/your/image.jpg" alt="Project Image" class="project-image" style="display: block;" />
      </div>
    `;
  } else {
    card.innerHTML = card.innerHTML.split('<button')[0];
  }
}

// Function to apply the theme
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
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Select the toggle button
const themeToggleButton = document.getElementById('themeToggle'); // Adjust this selector as needed

// Toggle the theme and save preference
themeToggleButton.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme); // Save preference
});
