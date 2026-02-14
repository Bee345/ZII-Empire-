
import React from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';
import { COLORS } from '../constants';

interface NavbarProps {
  role: UserRole;
  onLogout: () => void;
  logo: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ role, onLogout, logo }) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              {logo ? (
                <img src={logo} alt="Zii-Empire Logo" className="h-10 w-10 object-contain rounded-full border border-gray-100" />
              ) : (
                <div className="h-10 w-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">ZE</div>
              )}
              <span className="brand-font text-xl font-bold tracking-tight text-blue-900">ZiiEmpire</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-900 font-medium">Dashboard</Link>
              {(role === UserRole.MAKER || role === UserRole.ADMIN) && (
                <Link to="/studio" className="text-gray-600 hover:text-blue-900 font-medium">AI Studio</Link>
              )}
              <Link to="/shop" className="text-gray-600 hover:text-blue-900 font-medium">Marketplace</Link>
              {role !== UserRole.CUSTOMER && (
                <Link to="/recipes" className="text-gray-600 hover:text-blue-900 font-medium">Recipes</Link>
              )}
              {role === UserRole.ADMIN && (
                <Link to="/admin" className="text-gray-600 hover:text-blue-900 font-medium">Admin</Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-block px-2 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wider">
              {role}
            </span>
            <button 
              onClick={onLogout}
              className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
