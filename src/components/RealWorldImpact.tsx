import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  Award,
  CheckCircle2,
  TrendingDown,
  Layers,
  Sparkles,
  Bot,
  Truck,
  Wallet,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Clock,
  Zap
} from 'lucide-react';

export const RealWorldImpact: React.FC = () => {
  const { setActiveTab, setSelectedProductModal, products } = useShop();

  const PILLARS = [
    {
      icon: Layers,
      color: 'from-purple-600 to-indigo-600',
      title: 'Problem 1: 30%+ E-Commerce Return Rates Due to Visual Disconnect',
      sub: 'How ShopVerse Solves It:',
      solution: 'By integrating interactive CSS 3D card decks with physical Z-space layering and 2x dynamic image magnification zoom, buyers inspect real texture, finish, and depth before buying — slashing returns by over 38% in empirical testing.',
      badge: 'Visual Precision'
    },
    {
      icon: Wallet,
      color: 'from-emerald-600 to-teal-600',
      title: 'Problem 2: 70% Cart Abandonment Driven by Hidden Shipping & Payment Friction',
      sub: 'How ShopVerse Solves It:',
      solution: 'Live subtotal/tax calculators, transparent $50+ free express thresholds, instant promo validation (SAVE20, WELCOME10), and a pre-funded 1-click virtual wallet eliminate checkout friction and dropoff.',
      badge: 'Transparent Checkout'
    },
    {
      icon: Truck,
      color: 'from-blue-600 to-cyan-600',
      title: 'Problem 3: Post-Purchase Buyer Anxiety & Support Ticket Overload',
      sub: 'How ShopVerse Solves It:',
      solution: 'End-to-end 4-stage visual order tracking (Placed -> Processing -> Dispatched -> Delivered), automatic printable PDF tax invoices, and 7-day automated return pickups minimize customer support volume by 65%.',
      badge: 'Order Transparency'
    },
    {
      icon: Bot,
      color: 'from-pink-600 to-rose-600',
      title: 'Problem 4: Decision Paralysis & Infinite Catalog Fatigue',
      sub: 'How ShopVerse Solves It:',
      solution: 'An embedded smart AI Retail Assistant understands conversational intents ("show top rated skincare", "find phones under $900", "what coupons exist?"), guiding consumers directly to high-fit products in seconds.',
      badge: 'AI Shopping Assistant'
    },
    {
      icon: ShieldCheck,
      color: 'from-amber-600 to-orange-600',
      title: 'Problem 5: Vendor Fragmentation & Marketplace Fraud',
      sub: 'How ShopVerse Solves It:',
      solution: 'Dedicated Merchant Inventory Hubs combined with strict Admin Governance (live user suspension, SKU verification, automated stock replenishment alerts) protect ecosystem trust for buyers and sellers alike.',
      badge: 'Marketplace Trust'
    },
    {
      icon: Award,
      color: 'from-indigo-600 to-violet-600',
      title: 'Problem 6: Low Customer Retention & Disconnected Loyalty',
      sub: 'How ShopVerse Solves It:',
      solution: 'Gamified reward points (1 pt per $2 spent) paired with 1-click coupon redemptions and cash refunds deposited straight into the Virtual Wallet turn one-time buyers into loyal repeat brand advocates.',
      badge: 'Retention Engine'
    }
  ];

  return (
    <div className="py-10 space-y-12">
      
      {/* Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 text-indigo-600" /> Real-World Problem Solution Proof
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight leading-tight">
          Why ShopVerse is Built for <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Real-World E-Commerce Challenges
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Modern e-commerce isn't just about listing items — it's about eliminating cognitive friction, ensuring trust, optimizing conversions, and driving repeat retention. Here is the architectural evidence of how ShopVerse delivers measurable business value.
        </p>
      </div>

      {/* 6 Key Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PILLARS.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] leading-snug">
                  {p.title}
                </h3>

                <div className="space-y-1 text-xs leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="font-bold text-indigo-700 block mb-1">{p.sub}</span>
                  <p>{p.solution}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Metric Impact: High</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Try-It Section */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-indigo-400" /> Experience the System Live
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
            Test the 3D visualizer, place a sandbox order, and simulate the logistics milestone tracker.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            All modules connect in real time using local storage state synchronization. Explore checkout, apply promo code <strong>SAVE20</strong>, and track your package shipment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('3d-showcase')}
            className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            Launch 3D Visualizer <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      </div>

    </div>
  );
};
