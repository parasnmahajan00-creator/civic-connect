export const loadTheme = () => {
  return localStorage.getItem('cc_theme') || 'light';
};

export const saveTheme = (theme) => {
  localStorage.setItem('cc_theme', theme);
};