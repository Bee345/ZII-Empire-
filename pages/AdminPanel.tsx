
import React from 'react';

const AdminPanel: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Zii-Empire Admin Console</h1>
        <p className="text-gray-500">Supreme oversight of platform operations and financials.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 flex items-center">
            <span className="mr-2">📝</span> Approval Queue
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl border border-amber-100">
              <div>
                <p className="font-bold text-sm">New Recipe: Yoruba Gown</p>
                <p className="text-xs text-gray-500">Designer: Amaka K.</p>
              </div>
              <button className="text-xs font-bold text-amber-700 bg-white px-3 py-1 rounded shadow-sm">Review</button>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div>
                <p className="font-bold text-sm">Distributor Application</p>
                <p className="text-xs text-gray-500">Shop: Nairobi Crafts</p>
              </div>
              <button className="text-xs font-bold text-blue-700 bg-white px-3 py-1 rounded shadow-sm">Review</button>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 flex items-center">
            <span className="mr-2">💳</span> Financial Settings
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Maker Royalty Rate</span>
              <span className="font-bold">30.0% (Fixed)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Standard Platform Fee</span>
              <span className="font-bold">12.5%</span>
            </div>
            <button className="w-full py-2 bg-gray-100 text-gray-900 font-bold rounded-lg text-xs mt-4">Edit Pricing Rules</button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-lg mb-4 flex items-center">
            <span className="mr-2">📢</span> Marketing Campaigns
          </h2>
          <div className="space-y-4">
            <div className="p-3 border border-gray-100 rounded-xl">
              <p className="font-bold text-sm">Lagos Fashion Week Sale</p>
              <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
                <div className="bg-green-500 h-full w-[85%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Active - 85% Budget Used</p>
            </div>
            <button className="w-full py-2 bg-blue-900 text-white font-bold rounded-lg text-xs">+ Launch New Campaign</button>
          </div>
        </section>
      </div>

      <div className="mt-8 bg-gray-900 p-8 rounded-3xl text-white">
        <h2 className="text-xl font-bold mb-4">Enterprise Resource Planning (ERP) Insights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-400 text-xs">Total Users</p>
            <p className="text-2xl font-bold">12,842</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Revenue (YTD)</p>
            <p className="text-2xl font-bold">$1.2M</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Active Projects</p>
            <p className="text-2xl font-bold">452</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">System Uptime</p>
            <p className="text-2xl font-bold text-green-400">99.9%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
