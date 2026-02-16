
import React, { useState, useEffect } from 'react';
import { UserRole, Order } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMarketIntelligence } from '../services/geminiService';

const chartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
];

interface DashboardProps {
  role: UserRole;
  orders: Order[];
}

const Dashboard: React.FC<DashboardProps> = ({ role, orders }) => {
  const [news, setNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchMarketIntelligence();
      setNews(data);
      setLoadingNews(false);
    };
    loadNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Welcome, {role}</h1>
        <p className="text-gray-500">Insights and status overview for Zii-Empire.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Sales</p>
          <p className="text-2xl font-bold text-gray-900">${orders.reduce((s, o) => s + o.total, 12450)}</p>
          <p className="text-xs text-green-500 mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Active Orders</p>
          <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status !== 'Delivered').length}</p>
          <p className="text-xs text-blue-500 mt-2">Next delivery tomorrow</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Market Activity</p>
          <p className="text-2xl font-bold text-gray-900">8.4k</p>
          <p className="text-xs text-amber-500 mt-2">Visits this week</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Profitability</p>
          <p className="text-2xl font-bold text-blue-900">22.4%</p>
          <p className="text-xs text-gray-500 mt-2">Avg. Margin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6 text-gray-900">Revenue Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
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
          <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
            <span className="mr-2">🗞️</span> Market Intelligence
          </h3>
          <div className="space-y-4">
            {loadingNews ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-xl"></div>)}
              </div>
            ) : (
              news.map((item, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                  <p className="text-[10px] font-bold text-blue-900 uppercase tracking-wider mb-1">{item.category}</p>
                  <h4 className="font-bold text-sm leading-tight mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.summary}</p>
                </div>
              ))
            )}
            <button className="w-full py-3 text-blue-900 text-sm font-bold bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              Read More Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
