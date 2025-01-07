import { useEffect, useState } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="bg-black text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
              GradeFlow
            </h1>
            <p className="text-white text-sm md:text-base max-w-lg mx-auto md:mx-0">
              A course grade calculator for BSCS program in TIP
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            aria-label="Toggle dark mode"
          >
            <i className={`fas fa-${darkMode ? 'sun' : 'moon'} text-xl`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;