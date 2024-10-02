import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import BlogList from './components/BlogList';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    isDarkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <>
      <div className="container mx-10">
        <Navigation toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <BlogList />
      </div>
    </>
  );
}

export default App;
