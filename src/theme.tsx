const saved = localStorage.getItem('theme');
const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (saved === 'light' || (!saved && systemLight)) {
  document.documentElement.classList.add('light-theme');
} else if (saved === 'dark' || (!saved && !systemLight)) {
  document.documentElement.classList.add('dark-theme');
}
