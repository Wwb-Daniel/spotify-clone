import React from 'react';
import { signOut } from '../lib/auth';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  const navItems = [
    { id: 'home', label: '🏠 Home', icon: '🏠' },
    { id: 'search', label: '🔍 Search', icon: '🔍' },
    { id: 'library', label: '📚 Library', icon: '📚' },
    { id: 'playlists', label: '📋 Playlists', icon: '📋' },
    { id: 'profile', label: '👤 Profile', icon: '👤' },
  ];

  return (
    <div className="w-64 bg-black border-r border-gray-800 p-6 h-screen flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-500">🎵 Spotify</h2>
      </div>

      <div className="flex-1 space-y-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full text-left p-3 rounded-lg transition ${
              currentPage === item.id
                ? 'bg-green-500 text-black font-bold'
                : 'text-gray-300 hover:bg-gray-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};
