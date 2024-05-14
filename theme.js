let isDarkTheme = localStorage.getItem('theme') === 'dark';

// Initialize theme
updateTheme();

document.getElementById('themeButton').addEventListener('click', function() {
  isDarkTheme = !isDarkTheme;
  updateTheme();
});

function updateTheme() {
    const stylesheet = document.getElementById('themeStylesheet');
    if (isDarkTheme) {
      stylesheet.href = 'styles/dark/styles.css';
      
      themeIcon.classList.remove('bi-moon');
      themeIcon.classList.add('bi-sun');
    } else {
      stylesheet.href = 'styles/light/styles.css';
      themeIcon.classList.remove('bi-sun');
      themeIcon.classList.add('bi-moon');
    }
  // Save theme to local storage
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}
