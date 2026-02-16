
import React from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  onLogout: () => void;
  logo: string | null;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ role, onLogout, logo, cartCount }) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              {logo ? (
                <img src={logo} alt="Zii-Empire Logo" className="h-10 w-10 object-contain rounded-full" />
              ) : (
                <div className="h-10 w-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xs">ZE</div>
              )}
              <span className="brand-font text-lg font-bold tracking-tight text-blue-900 hidden xs:block">ZiiEmpire</span>
            </Link>
            <div className="hidden lg:flex ml-8 space-x-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-900 font-medium text-sm transition-colors">Dashboard</Link>
              {(role === UserRole.MAKER || role === UserRole.ADMIN) && (
                <Link to="/studio" className="text-gray-600 hover:text-blue-900 font-medium text-sm transition-colors">AI Studio</Link>
              )}
              <Link to="/shop" className="text-gray-600 hover:text-blue-900 font-medium text-sm transition-colors">Marketplace</Link>
              {role !== UserRole.CUSTOMER && (
                <Link to="/recipes" className="text-gray-600 hover:text-blue-900 font-medium text-sm transition-colors">Recipes</Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/shop" className="relative p-2 text-gray-500 hover:text-blue-900">
              <span className="text-lg">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="p-2 text-gray-500 hover:text-blue-900">
              <span className="text-xl">👤</span>
            </Link>
            <button 
              onClick={onLogout}
              className="text-gray-500 hover:text-red-600 font-medium text-xs transition-colors p-2"
              title="Logout"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden text-lg">🚪</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
