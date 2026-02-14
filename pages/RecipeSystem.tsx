
import React, { useState } from 'react';
import { UserRole } from '../types';

const RecipeSystem: React.FC<{ role: UserRole }> = ({ role }) => {
  const [isCreating, setIsCreating] = useState(false);

  const activeRecipes = [
    { id: 'R1', name: 'Zii Heritage Gown', status: 'In Production', priority: 'High', worker: 'Jane Doe', materials: ['Silk', 'Gold Thread', 'Zippers'] },
    { id: 'R2', name: 'Midnight Wrap', status: 'Quality Check', priority: 'Medium', worker: 'John Smith', materials: ['Cotton', 'Elastic', 'Buttons'] },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Design Recipe System</h1>
          <p className="text-gray-500">Reproducible production methodologies for master craftsmanship.</p>
        </div>
        {role === UserRole.MAKER && (
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="bg-blue-900 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-blue-800"
          >
            {isCreating ? 'Close Editor' : '+ New Recipe'}
          </button>
        )}
      </header>

      {isCreating ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
          <h2 className="text-xl font-bold mb-6">Create New Production Recipe (PRD 5.2)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Design Reference</label>
                <select className="w-full p-2 border border-gray-200 rounded-lg">
                  <option>Select a design from your portfolio...</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Materials List</label>
                <textarea className="w-full p-2 border border-gray-200 rounded-lg h-24" placeholder="Enter materials, quantities, thread types..." />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Estimated Production Time</label>
                <input type="text" className="w-full p-2 border border-gray-200 rounded-lg" placeholder="e.g. 12 hours" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Step-by-Step Instructions</label>
                <textarea className="w-full p-2 border border-gray-200 rounded-lg h-48" placeholder="1. Cut fabric based on template... 2. Embroider motifs... 3. Quality check seams..." />
              </div>
              <button className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700">Submit for Approval</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold mb-4">Active Production Queue</h2>
            {activeRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group hover:border-blue-300 transition-all">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs font-bold bg-blue-50 text-blue-900 px-2 py-1 rounded">{recipe.id}</span>
                    <h3 className="font-bold text-lg">{recipe.name}</h3>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>👤 {recipe.worker}</span>
                    <span>📍 {recipe.status}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {recipe.materials.map(m => (
                      <span key={m} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold ${recipe.priority === 'High' ? 'text-red-500' : 'text-amber-500'} block mb-2`}>{recipe.priority} Priority</span>
                  <button className="text-blue-900 font-bold text-sm hover:underline">View Details →</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="font-bold mb-4">Employee Management (PRD 5.4)</h2>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 font-bold uppercase">Today's Attendance</p>
                <p className="text-xl font-bold">14 / 16 Present</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 font-bold uppercase">Pending Payroll</p>
                <p className="text-xl font-bold">$2,450.00</p>
              </div>
              <button className="w-full py-2 bg-gray-900 text-white font-bold rounded-lg text-sm">Open HR Portal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSystem;
