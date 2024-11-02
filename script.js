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
