import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    background: isDark ? '#000' : '#fff',
    colorText: isDark ? '#fff' : '#000',
    toggleTheme: () => setIsDark((prev) => !prev),
    isDark,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
