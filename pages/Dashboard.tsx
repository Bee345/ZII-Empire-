
import React from 'react';
import { UserRole } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, royalties: 1200 },
  { name: 'Feb', revenue: 3000, royalties: 900 },
  { name: 'Mar', revenue: 5000, royalties: 1500 },
  { name: 'Apr', revenue: 4500, royalties: 1350 },
  { name: 'May', revenue: 6000, royalties: 1800 },
];

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Welcome, {role}</h1>
        <p className="text-gray-500">Here is what's happening at Zii-Empire today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Sales</p>
          <p className="text-2xl font-bold text-gray-900">$12,450.00</p>
          <p className="text-xs text-green-500 mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Designs Created</p>
          <p className="text-2xl font-bold text-gray-900">142</p>
          <p className="text-xs text-blue-500 mt-2">12 pending approval</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Team Tasks</p>
          <p className="text-2xl font-bold text-gray-900">28</p>
          <p className="text-xs text-amber-500 mt-2">8 high priority</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Net Earnings</p>
          <p className="text-2xl font-bold text-blue-900">$3,735.00</p>
          <p className="text-xs text-gray-500 mt-2">30% Lifetime Royalties (PRD 3.2)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6 text-gray-900">Performance Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00008B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00008B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#00008B" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-900">Market Intelligence (PRD 5.3)</h3>
          <div className="space-y-4">
            <div className="pb-4 border-b border-gray-100">
              <p className="text-xs font-bold text-blue-900 uppercase">Trend Alert</p>
              <h4 className="font-semibold text-sm">Ankara patterns rising in Western markets</h4>
              <p className="text-xs text-gray-500 mt-1">Lagos Fashion Week highlights modern fusion...</p>
            </div>
            <div className="pb-4 border-b border-gray-100">
              <p className="text-xs font-bold text-blue-900 uppercase">Industry News</p>
              <h4 className="font-semibold text-sm">Zii-Empire expands to Nairobi hub</h4>
              <p className="text-xs text-gray-500 mt-1">Partnership with local artisan guilds announced...</p>
            </div>
            <button className="w-full py-2 text-blue-900 text-sm font-bold hover:underline">View News Feed →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
