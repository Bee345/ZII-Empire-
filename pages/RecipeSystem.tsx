
import React, { useState } from 'react';
import { UserRole, Recipe } from '../types';

interface RecipeSystemProps {
  role: UserRole;
  recipes: Recipe[];
  onAddRecipe: (r: Recipe) => void;
}

const RecipeSystem: React.FC<RecipeSystemProps> = ({ role, recipes, onAddRecipe }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: '', materials: '', steps: '', time: '4h', priority: 'Medium' as const });

  // WORKERS see only approved recipes. MAKERS see their own submissions.
  const visibleRecipes = recipes.filter(r => {
    if (role === UserRole.WORKER) return r.status === 'Approved';
    return true; // Makers and Admin see everything
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newRecipe: Recipe = {
      id: `R${Date.now()}`,
      name: formData.name,
      materials: formData.materials.split(',').map(s => s.trim()),
      steps: formData.steps.split('\n').filter(s => s.trim()),
      estimatedTime: formData.time,
      priority: formData.priority,
      status: 'Pending Approval',
      creatorId: 'current'
    };

    onAddRecipe(newRecipe);
    setIsCreating(false);
    setFormData({ name: '', materials: '', steps: '', time: '4h', priority: 'Medium' });
    alert("Methodology submitted for Admin approval!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-blue-900">Craftsmanship Protocols</h1>
          <p className="text-gray-500">Master production methodologies.</p>
        </div>
        {role === UserRole.MAKER && (
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className={`px-8 py-3 rounded-2xl font-bold shadow-xl transition-all ${isCreating ? 'bg-gray-100 text-gray-600' : 'bg-blue-900 text-white hover:bg-blue-800'}`}
          >
            {isCreating ? 'Close Form' : 'New Protocol'}
          </button>
        )}
      </header>

      {isCreating ? (
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 animate-slide-up max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-blue-900">Define Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <input type="text" placeholder="Design Name (e.g. Silk Kaftan)" required className="w-full p-4 border rounded-2xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <textarea placeholder="Materials (comma separated: Silk, Thread, Gold Pins...)" required className="w-full p-4 border rounded-2xl h-40" value={formData.materials} onChange={e => setFormData({...formData, materials: e.target.value})} />
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Time (e.g. 6h)" className="w-full p-4 border rounded-2xl" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                <select className="p-4 border rounded-2xl" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as any})}>
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
              <textarea placeholder="Step-by-step instructions (one per line)" required className="w-full p-4 border rounded-2xl h-40" value={formData.steps} onChange={e => setFormData({...formData, steps: e.target.value})} />
              <button type="submit" className="w-full py-5 bg-blue-900 text-white font-bold rounded-3xl shadow-2xl hover:bg-blue-800">Submit to Admin</button>
            </div>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {visibleRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center group hover:border-blue-900 transition-all">
              <div className="flex space-x-8 items-center text-center md:text-left">
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center font-bold shadow-sm ${recipe.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-900'}`}>
                  {recipe.priority[0]}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{recipe.name}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-400 mt-2 font-medium">
                    <span className="bg-gray-50 px-3 py-1 rounded-full flex items-center">⏱️ {recipe.estimatedTime}</span>
                    <span className="bg-gray-50 px-3 py-1 rounded-full flex items-center">🧵 {recipe.materials.length} Items</span>
                    <span className={`px-3 py-1 rounded-full font-bold uppercase ${recipe.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{recipe.status}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex items-center space-x-6">
                <div className="hidden lg:block text-right pr-6 border-r border-gray-100">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Technician</p>
                  <p className="text-sm font-bold text-blue-900">{recipe.worker || 'Station Free'}</p>
                </div>
                <button className="bg-gray-50 p-4 rounded-2xl text-blue-900 font-bold hover:bg-blue-900 hover:text-white transition-all">Protocol →</button>
              </div>
            </div>
          ))}
          {visibleRecipes.length === 0 && (
            <div className="text-center py-40 opacity-20">
              <p className="text-7xl mb-6">🏜️</p>
              <p className="text-2xl font-bold">No Protocols Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeSystem;
