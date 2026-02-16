
import React, { useState } from 'react';
import { UserRole } from '../types';
import { useNavigate, Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (username: string, role: UserRole) => void;
  logo: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, logo }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && selectedRole) {
      onLogin(username, selectedRole);
      navigate('/dashboard');
    }
  };

  const portals = [
    { type: UserRole.CUSTOMER, desc: 'Shop & Style', icon: '🛍️' },
    { type: UserRole.MAKER, desc: 'Design & Monetize', icon: '🎨' },
    { type: UserRole.WORKER, desc: 'Create & Manage', icon: '🧵' },
    { type: UserRole.DISTRIBUTOR, desc: 'Orders & Logistics', icon: '🚛' },
    { type: UserRole.ADMIN, desc: 'Supreme Control', icon: '🔑' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {logo && <img src={logo} alt="Zii-Empire" className="h-20 mx-auto mb-6 rounded-2xl shadow-lg" />}
        
        {!selectedRole ? (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Zii-Empire Portals</h1>
            <p className="text-gray-500 mb-8 italic">Choose your gateway to the empire</p>
            <div className="grid grid-cols-1 gap-3">
              {portals.map((r) => (
                <button
                  key={r.type}
                  onClick={() => setSelectedRole(r.type)}
                  className="group flex items-center p-5 border border-white bg-white rounded-2xl hover:border-blue-900 hover:bg-blue-50 transition-all text-left shadow-sm active:scale-95"
                >
                  <span className="text-3xl mr-4 bg-gray-50 p-3 rounded-2xl group-hover:bg-blue-100">{r.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-900">{r.type} Portal</h3>
                    <p className="text-xs text-gray-400">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-8 text-sm text-gray-500">New here? <Link to="/signup" className="text-blue-900 font-bold">Join the Empire</Link></p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl shadow-xl animate-slide-up">
            <button onClick={() => setSelectedRole(null)} className="text-xs text-gray-400 font-bold mb-4 hover:text-blue-900">← Change Portal</button>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{selectedRole} Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Username" required 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" 
                value={username} onChange={e => setUsername(e.target.value)}
              />
              <input 
                type="password" placeholder="Password" required 
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" 
                value={password} onChange={e => setPassword(e.target.value)}
              />
              <button type="submit" className="w-full py-4 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800">
                Log In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
