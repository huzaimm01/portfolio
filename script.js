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
