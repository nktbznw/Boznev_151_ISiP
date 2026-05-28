const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// Обновление текста и aria-label кнопки
function updateButtonLabel(theme) {
  themeToggleBtn.textContent = theme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';
  themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
}

// Применяем тему
function applyTheme(theme) {
  rootElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateButtonLabel(theme);
}

// Инициализация при загрузке
const savedTheme = localStorage.getItem('theme');
// Если тема уже сохранена, используем её. Иначе оставляем ту, что задал inline-скрипт.
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  // Если в inline-скрипте тема не была задана (редкий случай), определяем по системе
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(systemPrefersDark ? 'dark' : 'light');
}

// Обработчик клика
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// Следим за изменением системной темы
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Меняем тему только если пользователь НЕ делал явный выбор ранее
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});