import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Users,
  Activity,
  BarChart2,
  CheckSquare,
  TrendingUp,
  DollarSign,
  UserCheck,
  UserX
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { users, orders, toggleUserBlock } = useShop();

  const totalPlatformRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 18495.20;
  const totalUsersCount = users.length;
  const activeOrdersCount = orders.filter(o => o.status !== 'Cancelled' && o.status !== 'Returned').length;

  return (
    <div className="py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Platform Governance & Oversight
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">Admin Command Center</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time GMV analytics, seller account verification, and user access controls.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Platform Revenue</span>
            <span className="text-xl font-extrabold text-slate-900 font-['Outfit'] block mt-0.5">
              ${totalPlatformRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Registered Accounts</span>
            <span className="text-xl font-extrabold text-slate-900 font-['Outfit'] block mt-0.5">
              {totalUsersCount} Profiles
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Transactions</span>
            <span className="text-xl font-extrabold text-slate-900 font-['Outfit'] block mt-0.5">
              {activeOrdersCount} Live Shipments
            </span>
          </div>
        </div>
      </div>

      {/* Analytics & User Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: User Access Control Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">Registered Account Governance</h3>
            <span className="text-xs text-slate-400 font-semibold">{users.length} Active Accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase">
                  <th className="pb-3">User & Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 flex items-center gap-3">
                      <img src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="font-bold text-slate-800 block">{u.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                        u.role === 'Seller' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {u.isVerified ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => toggleUserBlock(u.id)}
                        className={`text-xs font-bold px-3 py-1 rounded-xl transition-colors ${
                          u.isVerified
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                      >
                        {u.isVerified ? 'Suspend User' : 'Restore Access'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Revenue Growth Visualizer & Category Shares */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-600" /> Monthly Revenue Growth (USD)
            </h3>

            {/* Pure CSS Bar Chart */}
            <div className="flex items-end justify-between h-40 pt-6 px-2 border-b-2 border-slate-100">
              <div className="flex flex-col items-center gap-1.5 w-10">
                <div className="w-full bg-indigo-200 rounded-t-lg transition-all hover:bg-indigo-400" style={{ height: '35%' }} />
                <span className="text-[10px] text-slate-400 font-bold">Mar</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-10">
                <div className="w-full bg-indigo-300 rounded-t-lg transition-all hover:bg-indigo-400" style={{ height: '55%' }} />
                <span className="text-[10px] text-slate-400 font-bold">Apr</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-10">
                <div className="w-full bg-indigo-400 rounded-t-lg transition-all hover:bg-indigo-500" style={{ height: '70%' }} />
                <span className="text-[10px] text-slate-400 font-bold">May</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-10">
                <div className="w-full bg-indigo-500 rounded-t-lg transition-all hover:bg-indigo-600" style={{ height: '85%' }} />
                <span className="text-[10px] text-slate-400 font-bold">Jun</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-10">
                <div className="w-full bg-indigo-600 rounded-t-lg shadow-md shadow-indigo-600/30" style={{ height: '100%' }} />
                <span className="text-[10px] text-indigo-600 font-extrabold">Jul-Aug</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold">Conversion Rate</span>
                <span className="text-sm font-bold text-slate-800">4.18% (+0.8%)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-semibold">Avg. Order Value</span>
                <span className="text-sm font-bold text-slate-800">$78.40</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Category GMV Share</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">Beauty & Skincare</span>
                <span className="font-bold text-white">42%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[42%] h-full bg-pink-500 rounded-full" />
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-slate-300">Smartphones & Electronics</span>
                <span className="font-bold text-white">36%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[36%] h-full bg-indigo-500 rounded-full" />
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-slate-300">Furniture & Fragrances</span>
                <span className="font-bold text-white">22%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[22%] h-full bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
