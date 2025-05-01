import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Cargar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    
    setDarkMode(initialTheme === 'dark');
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="theme-toggle-container">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        <Icon name={darkMode ? 'sun' : 'moon'} />
        <span>{darkMode ? 'Light' : 'Dark'}</span>
      </button>
    </div>
  );
};

export default ThemeToggle;