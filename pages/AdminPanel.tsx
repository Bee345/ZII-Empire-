
import React from 'react';
import { Recipe, Product } from '../types';

interface AdminPanelProps {
  recipes: Recipe[];
  onApproveRecipe: (id: string) => void;
  products: Product[];
  onApproveProduct: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ recipes, onApproveRecipe, products, onApproveProduct }) => {
  const pendingRecipes = recipes.filter(r => r.status === 'Draft' || r.status === 'Pending Approval');
  const pendingProducts = products.filter(p => !p.isApproved);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-blue-900">Supreme Admin Console</h1>
        <p className="text-gray-500 italic">"Authority over elegance, oversight over production."</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center text-blue-900"><span className="mr-3">📜</span> Recipe Approval</h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1 rounded-full">{pendingRecipes.length} PENDING</span>
          </div>
          
          <div className="space-y-4">
            {pendingRecipes.map(r => (
              <div key={r.id} className="p-5 bg-gray-50 rounded-3xl border border-gray-100 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900">{r.name}</h4>
                  <p className="text-xs text-gray-400">Priority: {r.priority} • {r.materials.length} Materials</p>
                </div>
                <button 
                  onClick={() => onApproveRecipe(r.id)}
                  className="bg-blue-900 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-md hover:bg-blue-800"
                >
                  APPROVE
                </button>
              </div>
            ))}
            {pendingRecipes.length === 0 && <p className="text-center py-10 text-gray-300 italic">No recipes awaiting approval.</p>}
          </div>
        </section>

        <section className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center text-blue-900"><span className="mr-3">🛍️</span> Marketplace Approval</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1 rounded-full">{pendingProducts.length} NEW ITEMS</span>
          </div>

          <div className="space-y-4">
            {pendingProducts.map(p => (
              <div key={p.id} className="p-5 bg-gray-50 rounded-3xl border border-gray-100 flex items-center space-x-4">
                <img src={p.image} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900">{p.name}</h4>
                  <p className="text-xs text-blue-900 font-bold">${p.price} • {p.category}</p>
                </div>
                <button 
                  onClick={() => onApproveProduct(p.id)}
                  className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-md hover:bg-green-700"
                >
                  RELEASE
                </button>
              </div>
            ))}
            {pendingProducts.length === 0 && <p className="text-center py-10 text-gray-300 italic">No marketplace items pending.</p>}
          </div>
        </section>
      </div>

      <div className="mt-12 bg-gray-900 p-10 rounded-[50px] text-white shadow-2xl">
        <h2 className="text-2xl font-bold mb-8">Empire Real-Time ERP</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div><p className="text-gray-400 text-xs uppercase mb-2">Total Artisans</p><p className="text-4xl font-bold">142</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-2">Pending Tasks</p><p className="text-4xl font-bold text-amber-400">{pendingRecipes.length + pendingProducts.length}</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-2">Monthly Sales</p><p className="text-4xl font-bold">$124.8k</p></div>
          <div><p className="text-gray-400 text-xs uppercase mb-2">System Health</p><p className="text-4xl font-bold text-green-400">EXCELLENT</p></div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
