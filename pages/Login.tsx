
import React from 'react';
import { UserRole } from '../types';
import { COLORS } from '../constants';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  logo: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, logo }) => {
  const roles = [
    { type: UserRole.CUSTOMER, desc: 'Shop the latest designs', icon: '🛍️' },
    { type: UserRole.MAKER, desc: 'Create and monetize designs', icon: '🎨' },
    { type: UserRole.WORKER, desc: 'Production and management', icon: '🧵' },
    { type: UserRole.DISTRIBUTOR, desc: 'Bulk orders and logistics', icon: '🚛' },
    { type: UserRole.ADMIN, desc: 'System control (Owner)', icon: '🔑' },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {logo && <img src={logo} alt="Zii-Empire" className="h-24 mx-auto mb-6 rounded-2xl shadow-lg border-2 border-gold-500" />}
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Zii-Empire</h1>
        <p className="text-gray-500 mb-8 italic">Empowering African Fashion Innovation</p>
        
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Select Your Portal</p>
          <div className="grid grid-cols-1 gap-3">
            {roles.map((r) => (
              <button
                key={r.type}
                onClick={() => onLogin(r.type)}
                className="group flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-900 hover:bg-blue-50 transition-all text-left shadow-sm active:scale-95"
              >
                <span className="text-3xl mr-4 bg-gray-100 p-2 rounded-lg group-hover:bg-blue-100">{r.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-900">{r.type}</h3>
                  <p className="text-xs text-gray-500">{r.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-xs text-gray-400">
          <p>By logging in, you agree to the ZiiEmpire Terms & Conditions.</p>
          <p className="mt-1">Version 1.0 - Feb 14, 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
