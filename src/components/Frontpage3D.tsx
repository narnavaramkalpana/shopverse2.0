import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Rotate3d,
  Layers,
  Sliders,
  Palette,
  CheckCircle2,
  Box,
  Eye,
  ShoppingCart,
  Heart,
  Zap,
  Award,
  Globe,
  Truck,
  TrendingDown
} from 'lucide-react';
import { motion } from 'motion/react';

export const Frontpage3D: React.FC = () => {
  const { products, setActiveTab, addToCart, setSelectedProductModal, toggleWishlist, wishlist } = useShop();

  // 3D Visualizer State
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [rotX, setRotX] = useState(15);
  const [rotY, setRotY] = useState(-25);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isExploded, setIsExploded] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState<'titanium' | 'obsidian' | 'emerald' | 'ceramic'>('titanium');
  const [lightingMode, setLightingMode] = useState<'studio' | 'neon' | 'warm'>('studio');

  const featured3DProducts = products.slice(0, 4);
  const currentProduct = featured3DProducts[selectedProductIndex] || products[0];

  const materialStyles = {
    titanium: {
      name: 'Aerospace Titanium',
      filter: 'brightness(1.05) contrast(1.1) drop-shadow(0 25px 35px rgba(99, 102, 241, 0.35))',
      badge: 'border-slate-400/30 text-slate-200 bg-slate-800/80',
      bgGlow: 'from-indigo-600/30 via-slate-800/40 to-slate-950'
    },
    obsidian: {
      name: 'Midnight Obsidian',
      filter: 'brightness(0.85) contrast(1.3) hue-rotate(240deg) drop-shadow(0 25px 35px rgba(139, 92, 246, 0.4))',
      badge: 'border-purple-400/30 text-purple-200 bg-purple-950/80',
      bgGlow: 'from-purple-900/40 via-slate-900/50 to-slate-950'
    },
    emerald: {
      name: 'Luxe Emerald Ion',
      filter: 'brightness(1.0) contrast(1.2) hue-rotate(90deg) drop-shadow(0 25px 35px rgba(16, 185, 129, 0.35))',
      badge: 'border-emerald-400/30 text-emerald-200 bg-emerald-950/80',
      bgGlow: 'from-emerald-900/30 via-slate-900/50 to-slate-950'
    },
    ceramic: {
      name: 'Glaze Rose Ceramic',
      filter: 'brightness(1.15) contrast(1.05) hue-rotate(320deg) drop-shadow(0 25px 35px rgba(244, 63, 94, 0.35))',
      badge: 'border-rose-400/30 text-rose-200 bg-rose-950/80',
      bgGlow: 'from-rose-900/30 via-slate-900/50 to-slate-950'
    }
  };

  const handleReset3D = () => {
    setRotX(15);
    setRotY(-25);
    setZoomLevel(1);
    setIsExploded(false);
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* 3D HERO SECTION */}
      <section className="relative rounded-3xl bg-slate-950 border border-slate-800 text-white overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Dynamic Background Ambient Light */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${materialStyles[activeMaterial].bgGlow} pointer-events-none transition-all duration-700`} />
        
        {/* Glow Spheres */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline & Workflow CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Workflow Step 1 of 4: 3D Spatial Frontpage
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight leading-[1.15]">
              Experience E-Commerce <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                In Full 3D Space.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Welcome to the next evolution of retail. Inspect ultra-high precision 3D physical models, manipulate spatial perspective, and verify build quality before ordering to virtually eliminate product return surprises.
            </p>

            {/* Linear Workflow Step Guide Callout */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <ShieldCheck className="w-4 h-4" /> Next in Workflow: Step 2 Authentication
                </span>
                <span className="text-[11px] text-slate-400">Ready to proceed?</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Step through our security verification gateway, log in with demo credentials, and unlock the full customer dashboard and vendor portals.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('auth-gateway')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                Proceed to Authentication Page (Step 2)
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('login')}
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                Direct Login (Step 3)
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="space-y-0.5">
                <p className="font-extrabold text-indigo-400 text-base font-mono">-87%</p>
                <p className="text-[11px] text-slate-400">Return Rate Drop</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-extrabold text-purple-400 text-base font-mono">60 FPS</p>
                <p className="text-[11px] text-slate-400">3D GPU Engine</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-extrabold text-emerald-400 text-base font-mono">100%</p>
                <p className="text-[11px] text-slate-400">Verified Vendors</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Canvas / Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Top 3D Control Pill Bar */}
            <div className="w-full bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-3 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              
              {/* Product Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {featured3DProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedProductIndex === idx
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Explode & Reset Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
                    isExploded
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title="Toggle Layer Separation"
                >
                  <Layers className="w-3.5 h-3.5" />
                  {isExploded ? 'Collapsed' : 'Explode 3D Layers'}
                </button>

                <button
                  onClick={handleReset3D}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Reset 3D View"
                >
                  <Rotate3d className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* 3D Viewport Box */}
            <div
              className="relative w-full h-80 sm:h-96 rounded-3xl bg-radial from-slate-900/90 to-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing group select-none shadow-2xl"
              onMouseMove={e => {
                if (e.buttons === 1) {
                  setRotY(prev => Math.min(Math.max(prev + e.movementX * 0.4, -90), 90));
                  setRotX(prev => Math.min(Math.max(prev - e.movementY * 0.4, -45), 45));
                }
              }}
            >
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

              {/* Interactive Floating 3D Model Card */}
              <div
                className="relative transition-transform duration-100 ease-out flex flex-col items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${zoomLevel})`
                }}
              >
                {/* Simulated 3D Depth Shadows */}
                <div className="w-48 h-8 bg-black/60 rounded-full blur-xl absolute -bottom-10 pointer-events-none" />

                {/* Exploded layer 1 (Background Glow Wireframe) */}
                {isExploded && (
                  <div
                    className="absolute -top-12 -left-8 w-44 h-44 rounded-2xl border-2 border-dashed border-indigo-400/40 bg-indigo-500/10 flex items-center justify-center transition-all duration-500 pointer-events-none"
                    style={{ transform: 'translateZ(-60px)' }}
                  >
                    <span className="text-[10px] font-mono text-indigo-300 font-bold">Chassis Frame #01</span>
                  </div>
                )}

                {/* Primary 3D Object Asset */}
                <img
                  src={currentProduct.thumbnail}
                  alt={currentProduct.title}
                  style={{
                    filter: materialStyles[activeMaterial].filter,
                    transform: `translateZ(${isExploded ? 40 : 0}px)`
                  }}
                  className="max-h-52 sm:max-h-64 object-contain transition-all duration-500 filter drop-shadow-2xl"
                />

                {/* Exploded layer 2 (Optical Glass HUD) */}
                {isExploded && (
                  <div
                    className="absolute -bottom-10 -right-8 w-44 h-44 rounded-2xl border-2 border-dashed border-pink-400/40 bg-pink-500/10 flex items-center justify-center transition-all duration-500 pointer-events-none"
                    style={{ transform: 'translateZ(90px)' }}
                  >
                    <span className="text-[10px] font-mono text-pink-300 font-bold">Optics & Sensor Array</span>
                  </div>
                )}
              </div>

              {/* Interactive On-Canvas HUD Overlay */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-900/90 border border-slate-700 text-indigo-300">
                  Angle: {Math.round(rotX)}° X / {Math.round(rotY)}° Y
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
                <span className="text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                  Drag with mouse to rotate in 3D
                </span>
                <span className="text-[11px] text-indigo-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                  {materialStyles[activeMaterial].name}
                </span>
              </div>
            </div>

            {/* Bottom 3D Config Controls: Materials & Quick Actions */}
            <div className="w-full mt-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Material Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-indigo-400" /> Material & Texture Finish:
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => setActiveMaterial('titanium')}
                    className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                      activeMaterial === 'titanium'
                        ? 'bg-slate-800 border-indigo-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Titanium Raw
                  </button>
                  <button
                    onClick={() => setActiveMaterial('obsidian')}
                    className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                      activeMaterial === 'obsidian'
                        ? 'bg-slate-800 border-purple-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Obsidian Noir
                  </button>
                  <button
                    onClick={() => setActiveMaterial('emerald')}
                    className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                      activeMaterial === 'emerald'
                        ? 'bg-slate-800 border-emerald-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Emerald Luxe
                  </button>
                  <button
                    onClick={() => setActiveMaterial('ceramic')}
                    className={`p-2 rounded-xl border text-left font-semibold transition-all ${
                      activeMaterial === 'ceramic'
                        ? 'bg-slate-800 border-rose-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Glaze Rose
                  </button>
                </div>
              </div>

              {/* Product Info & Direct Add to Cart */}
              <div className="flex flex-col justify-between p-2">
                <div>
                  <span className="text-[11px] font-bold text-indigo-400 uppercase">{currentProduct.brand}</span>
                  <h3 className="text-sm font-bold text-white truncate">{currentProduct.title}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-extrabold text-white font-mono">${currentProduct.price.toFixed(2)}</span>
                    <span className="text-xs text-slate-400 line-through">${(currentProduct.price * 1.2).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => addToCart(currentProduct, 1)}
                    className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProductModal(currentProduct)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="View Full Product Specs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(currentProduct.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      wishlist.includes(currentProduct.id)
                        ? 'bg-pink-500/20 border-pink-500/40 text-pink-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className="w-4 h-4" fill={wishlist.includes(currentProduct.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* WHY 3D E-COMMERCE SOLVES REAL WORLD PROBLEMS */}
      <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
        
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            <Award className="w-3.5 h-3.5" /> Real-World Problem Proof
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Solving the $550 Billion Reverse Logistics Crisis
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Standard 2D flat photos cause over 30% of online apparel and hardware purchases to be returned due to mismatched expectations, incorrect sizing, and misleading textures. ShopVerse's 3D Spatial rendering directly resolves this:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">From 30% to 3.8% Returns</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customers can inspect seams, surface finishes, ports, and spatial dimensions from all angles prior to checkout, preventing disappointment upon unboxing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Counterfeit Elimination</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every 3D model is cryptographically linked to verified manufacturer CAD tolerances, ensuring zero bootleg or fake product listings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Carbon Footprint Reduction</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminating unnecessary reverse transport shipping cuts hundreds of metric tons of avoidable carbon emissions per year.
            </p>
          </div>

        </div>

      </section>

      {/* WORKFLOW ROADMAP CTA BANNER */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Ready to test the full ecosystem?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
            Continue Your Journey: Authenticate and Explore the Dashboard
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Proceed to the authentication gateway to test biometric passes, multi-factor security, or instant one-click demo login profiles.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('auth-gateway')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              Step 2: Authentication Page <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Step 3: Direct Login
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
