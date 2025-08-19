import React from 'react';
import { Search, Heart, Settings, User, Music } from 'lucide-react';
import { usenavigate, useLocation, Link } from 'react-router-dom';
import Carregando from './Carregando';

export default function Sidebar() {

  const location = useLocation();
  
  console.log('Current path:', location);
  
  const navigation = [
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User },
  ];
  
  
  
  return (
    <div className="w-64 bg-black p-6">
      <Link to="/search">
        <div className="flex items-center gap-2 mb-8">
          <Music className="h-8 w-8 text-white" />
          <span className="text-white text-xl font-bold">Musicfy</span>
        </div>
        </Link>

      <nav className="space-y-4 mb-6">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={location.pathname === item.path ? "flex items-center gap-3 text-lm font-medium text-green-500 hover:text-green-700 transition-colors" :
                "flex items-center gap-3  text-lm font-medium text-gray-400 hover:text-white transition-colors"
              }
            >
              <Icon className="h-7 w-7 " />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="space-y-3">
          <Link
            to="/subscription"
            className={location.pathname === '/subscription' ? "inline-flex items-center justify-center w-full px-4 py-2 bg-green-500 text-black font-medium rounded-full hover:bg-green-700 transition-colors" : "inline-flex items-center justify-center w-full px-4 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"}
          >
            Upgrade Plan
          </Link>
          {location.pathname !== '/login' && 
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors border border-white/20"
            >
              Sign Out
            </Link>}
        </div>
      </div>
    </div>
  );
}