
import React, { useState } from 'react';
// Added Link to the import from react-router-dom
import { useNavigate, Link } from 'react-router-dom';
import { UserRole, UserProfile } from '../types';

interface SignupProps {
  onSignup: (user: UserProfile) => void;
  logo: string | null;
}

const Signup: React.FC<SignupProps> = ({ onSignup, logo }) => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', username: '', email: '', country: '', state: '', address: '',
    department: '', title: '', dob: '', gender: 'Male', role: UserRole.CUSTOMER,
    password: '', confirmPassword: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      ...formData,
      joinDate: new Date().toLocaleDateString(),
      stats: { ordersCount: 0, wishlistCount: 0, totalSpent: 0 }
    };
    onSignup(newUser);
    alert("Account created! Now select your portal to Login.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8">
        <div className="text-center mb-8">
          {logo && <img src={logo} alt="Zii" className="h-16 mx-auto mb-4 rounded-xl" />}
          <h1 className="text-3xl font-bold text-blue-900">Join Zii-Empire</h1>
          <p className="text-gray-500 text-sm">Step {step} of 4: {['Role Selection', 'Personal Info', 'Location Details', 'Professional & Security'][step-1]}</p>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-4">
            <div className={`bg-blue-900 h-full rounded-full transition-all duration-300`} style={{ width: `${step * 25}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="grid grid-cols-1 gap-3">
              <label className="text-xs font-bold text-gray-400 uppercase">Select Your User Type</label>
              {Object.values(UserRole).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setFormData({...formData, role: r}); nextStep(); }}
                  className={`p-4 border rounded-2xl text-left transition-all hover:border-blue-900 ${formData.role === r ? 'bg-blue-50 border-blue-900' : 'bg-white border-gray-100'}`}
                >
                  <p className="font-bold text-gray-900">{r}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required className="p-3 border rounded-xl w-full" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                <input type="text" placeholder="Username" required className="p-3 border rounded-xl w-full" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
              </div>
              <input type="email" placeholder="Email" required className="p-3 border rounded-xl w-full" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" required className="p-3 border rounded-xl w-full text-sm" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                <select className="p-3 border rounded-xl w-full text-sm" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Country" required className="p-3 border rounded-xl w-full" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                <input type="text" placeholder="State" required className="p-3 border rounded-xl w-full" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
              </div>
              <textarea placeholder="Residential Address" required className="p-3 border rounded-xl w-full h-24" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Department" className="p-3 border rounded-xl w-full" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
                <input type="text" placeholder="Title" className="p-3 border rounded-xl w-full" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <input type="password" placeholder="Password" required className="p-3 border rounded-xl w-full" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              <input type="password" placeholder="Confirm Password" required className="p-3 border rounded-xl w-full" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && <button type="button" onClick={prevStep} className="px-6 py-3 font-bold text-gray-500 hover:text-blue-900">Back</button>}
            {step > 1 && step < 4 && <button type="button" onClick={nextStep} className="ml-auto px-10 py-3 bg-blue-900 text-white font-bold rounded-xl shadow-lg">Next</button>}
            {step === 4 && <button type="submit" className="ml-auto px-10 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg">Complete Signup</button>}
          </div>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-900 font-bold">Portals</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
