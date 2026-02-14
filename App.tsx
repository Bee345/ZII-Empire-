
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { UserRole } from './types';
import { COLORS } from './constants';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DesignStudio from './pages/DesignStudio';
import Marketplace from './pages/Marketplace';
import RecipeSystem from './pages/RecipeSystem';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import { generateAppLogo } from './services/geminiService';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const generatedLogo = await generateAppLogo();
        setLogo(generatedLogo);
      } catch (e) {
        console.error("Logo generation failed", e);
      }
    };
    loadLogo();
  }, []);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {userRole && <Navbar role={userRole} onLogout={handleLogout} logo={logo} />}
        <main className="flex-grow pb-20 md:pb-0">
          <Routes>
            <Route 
              path="/" 
              element={userRole ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} logo={logo} />} 
            />
            <Route 
              path="/dashboard" 
              element={userRole ? <Dashboard role={userRole} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/studio" 
              element={userRole === UserRole.MAKER || userRole === UserRole.ADMIN ? <DesignStudio /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/shop" 
              element={<Marketplace role={userRole!} />} 
            />
            <Route 
              path="/recipes" 
              element={userRole !== UserRole.CUSTOMER ? <RecipeSystem role={userRole!} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/admin" 
              element={userRole === UserRole.ADMIN ? <AdminPanel /> : <Navigate to="/dashboard" />} 
            />
          </Routes>
        </main>
        
        {/* Mobile Navigation Bar as specified in PRD 8.2 */}
        {userRole && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 md:hidden z-50">
            <Link to="/dashboard" className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-900">
              <span className="text-xl">🏠</span> Home
            </Link>
            {(userRole === UserRole.MAKER || userRole === UserRole.ADMIN) && (
              <Link to="/studio" className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-900">
                <span className="text-xl">✨</span> Studio
              </Link>
            )}
            <Link to="/shop" className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-900">
              <span className="text-xl">🛍️</span> Shop
            </Link>
            <Link to="/recipes" className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-900">
              <span className="text-xl">📜</span> Tasks
            </Link>
          </nav>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
