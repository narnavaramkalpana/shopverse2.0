import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Mail,
  Phone,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory, showToast } = useShop();
  const [subEmail, setSubEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    showToast(`Subscribed ${subEmail} for VIP flash sale coupons! Code SAVE20 sent to your inbox.`, 'success');
    setSubEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => setActiveTab('store')}
              className="cursor-pointer flex items-center gap-2.5 text-white"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-['Outfit']">
                Shop<span className="text-indigo-400">Verse</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The next dimension of modern digital retail. Experience physical Z-space 3D product previews, 2x magnifier inspection, real-time shipment milestone steppers, and context-aware AI shopping guidance.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-300">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL Verified</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-indigo-400" /> Free Global $50+</span>
              <span className="flex items-center gap-1"><RotateCcw className="w-4 h-4 text-purple-400" /> 7-Day Returns</span>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Curated Departments</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('beauty');
                    setActiveTab('store');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Beauty & Skincare
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('smartphones');
                    setActiveTab('store');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Smartphones & Electronics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('furniture');
                    setActiveTab('store');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Nordic Oak Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('fragrances');
                    setActiveTab('store');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Luxury Fragrances
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('groceries');
                    setActiveTab('store');
                  }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Organic Groceries
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ecosystem Portals</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('3d-showcase')} className="hover:text-indigo-400 transition-colors">
                  3D Spatial Visualizer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('real-world')} className="hover:text-indigo-400 transition-colors">
                  Real-World Solution Proof
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('seller')} className="hover:text-indigo-400 transition-colors">
                  Vendor Inventory Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-indigo-400 transition-colors">
                  Admin Governance Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-indigo-400 transition-colors">
                  Live Order Tracker & Wallet
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">VIP Sales & Coupon Club</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Subscribe to get instant alerts on flash discount drops and 20% off your initial purchase.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={subEmail}
                onChange={e => setSubEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                Join & Get Coupon <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>&copy; 2026 ShopVerse E-Commerce Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('info')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <span>&bull;</span>
            <button onClick={() => setActiveTab('info')} className="hover:text-slate-300 transition-colors">Terms of Service</button>
            <span>&bull;</span>
            <button onClick={() => setActiveTab('info')} className="hover:text-slate-300 transition-colors">Shipping & Returns</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
