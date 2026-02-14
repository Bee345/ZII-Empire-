
import React from 'react';
import { UserRole } from '../types';

const Marketplace: React.FC<{ role: UserRole }> = ({ role }) => {
  const products = [
    { id: '1', name: 'Royal Kente Blouse', price: 120, category: 'African Native', img: 'https://picsum.photos/seed/kente/400/500' },
    { id: '2', name: 'Midnight Silk Wrap', price: 250, category: 'European', img: 'https://picsum.photos/seed/silk/400/500' },
    { id: '3', name: 'Savannah Linen Suit', price: 340, category: 'Western', img: 'https://picsum.photos/seed/linen/400/500' },
    { id: '4', name: 'Zii Heritage Gown', price: 580, category: 'Modern', img: 'https://picsum.photos/seed/gown/400/500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Zii-Empire Marketplace</h1>
          <p className="text-gray-500">Discover hand-crafted elegance from top designers.</p>
        </div>
        <div className="flex space-x-2">
          <input 
            type="text" 
            placeholder="Search designs..." 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 text-sm"
          />
          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Filters</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:bg-white text-red-500">❤️</button>
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold text-blue-900 uppercase tracking-widest mb-1">{p.category}</p>
              <h3 className="font-bold text-gray-900 mb-2">{p.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">${p.price}</span>
                <button className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-900">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {role === UserRole.DISTRIBUTOR && (
        <div className="mt-12 bg-blue-900 p-8 rounded-3xl text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Wholesale Distributor Portal (PRD 3.4)</h2>
              <p className="text-blue-100 max-w-lg">Place bulk orders at discounted rates. Access your sales analytics and inventory management tools below.</p>
            </div>
            <button className="mt-6 md:mt-0 px-8 py-3 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-all">
              Request Wholesale Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
