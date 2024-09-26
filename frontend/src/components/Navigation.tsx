import { FaGithub, FaMoon, FaSun } from 'react-icons/fa';

type NavigationProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const Navigation = ({ toggleTheme, isDarkMode }: NavigationProps) => {

  return (
    <nav className="flex justify-between items-center p-2 pt-7">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Title</h1>
      <div className="flex items-center space-x-4">
        <a href="https://github.com/arisa277" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className='hover:text-gray-600' />
        </a>
        <button onClick={toggleTheme} aria-label="Toggle Dark Mode">
          {isDarkMode ? (
            <FaSun size={24} className="text-yellow-500 hover:text-yellow-300" />
          ) : (
            <FaMoon size={24} className=" hover:text-gray-600 dark:text-gray-200" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
