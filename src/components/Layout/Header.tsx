import React from 'react';
import { Infinity, LogOut, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { user, role, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="h-16 bg-gray-900/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-800/50 dark:border-gray-800/50 flex items-center justify-between px-6">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Infinity className="h-8 w-8 text-transparent bg-gradient-to-r from-red-400 to-rose-600 bg-clip-text animate-spin-slow" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-600 rounded-full blur opacity-30 animate-pulse-glow"></div>
        </div>
        <h1 className="text-2xl font-bold gradient-text bg-gradient-to-r from-red-400 to-rose-600">
          Vertical Systems
        </h1>
      </div>
      
      {user && (
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-800 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-400" />
            )}
          </button>
          <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-300">
            <User className="h-5 w-5" />
            <div className="text-right">
              <p className="text-sm font-medium">{user.user_metadata?.full_name || user.email}</p>
              {role && (
                <p className="text-xs text-gray-400">{role}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;