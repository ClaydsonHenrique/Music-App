import React from 'react';
import { Search, Heart, Settings, User, Music } from 'lucide-react';
import { usenavigate, useLocation, Link } from 'react-router-dom';
import Carregando from './Carregando';

export default function Sidebar() {

  const navigation = [
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Profile Edit', path: '/profile/edit', icon: Settings },
  ];

  return (
    <div className="w-64 bg-black h-screen p-6">
      <div className="flex items-center gap-2 mb-8">
        <Music className="h-8 w-8 text-white" />
        <span className="text-white text-xl font-bold">Musicfy</span>
      </div>

      <nav className="space-y-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="space-y-3">
          <Link
            to="/subscription"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            Upgrade Plan
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors border border-white/20"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}