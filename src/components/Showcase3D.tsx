import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Eye, ShoppingCart, Heart, ArrowRight, Layers, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

export const Showcase3D: React.FC = () => {
  const { products, setSelectedProductModal, addToCart, toggleWishlist, wishlist } = useShop();
  const [spreadDistance, setSpreadDistance] = useState(80);
  const [rotateAngle, setRotateAngle] = useState(-30);
  const [pitchAngle, setPitchAngle] = useState(50);
  const [activeDeckIndex, setActiveDeckIndex] = useState<number | null>(null);

  // Take top 3 showcase items
  const showcaseItems = products.slice(0, 3);

  return (
    <div className="relative py-12 px-4 sm:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-3xl text-white overflow-hidden shadow-2xl border border-slate-800 my-8">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Explanation & Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive 3D Virtual Showcase
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] leading-tight">
            Next-Gen Spatial <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Visual Deck Explorer
            </span>
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Overcome online shopping uncertainty with true physical depth. Hover over or manipulate the 3D perspective layers below to separate items across Z-space, inspect high-res textures, and verify build craftsmanship before purchase.
          </p>

          {/* Interactive Sliders */}
          <div className="bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-indigo-400" /> Spatial Z-Spread</span>
              <span className="text-indigo-400 font-mono">{spreadDistance}px</span>
            </div>
            <input
              type="range"
              min="30"
              max="160"
              value={spreadDistance}
              onChange={e => setSpreadDistance(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 pt-2">
              <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-purple-400" /> Perspective Yaw & Pitch</span>
              <span className="text-purple-400 font-mono">{rotateAngle}° / {pitchAngle}°</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="range"
                min="-60"
                max="20"
                value={rotateAngle}
                onChange={e => setRotateAngle(Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <input
                type="range"
                min="25"
                max="75"
                value={pitchAngle}
                onChange={e => setPitchAngle(Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Real-Time CSS Matrices</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-400" /> GPU Accelerated</span>
          </div>
        </div>

        {/* Right 3D Spatial Deck Stage */}
        <div className="lg:col-span-7 flex items-center justify-center min-h-[28rem] relative scene-3d">
          <div
            className="relative w-72 sm:w-80 h-96 sm:h-[26rem] transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${pitchAngle}deg) rotateZ(${rotateAngle}deg)`
            }}
          >
            {showcaseItems.map((prod, idx) => {
              const zOffset = (2 - idx) * spreadDistance;
              const isHovered = activeDeckIndex === idx;
              const isWish = wishlist.includes(prod.id);

              return (
                <div
                  key={prod.id}
                  onMouseEnter={() => setActiveDeckIndex(idx)}
                  onMouseLeave={() => setActiveDeckIndex(null)}
                  className="deck-card-item absolute inset-0 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 p-6 flex flex-col justify-between shadow-2xl cursor-pointer"
                  style={{
                    transform: `translateZ(${zOffset + (isHovered ? 40 : 0)}px) translateY(${isHovered ? -20 : 0}px)`,
                    boxShadow: isHovered
                      ? '0 30px 60px -15px rgba(99, 102, 241, 0.5), 0 0 25px rgba(168, 85, 247, 0.3)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.7)'
                  }}
                  onClick={() => setSelectedProductModal(prod)}
                >
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider border border-indigo-400/30">
                      {prod.category}
                    </span>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isWish ? 'text-pink-500 bg-pink-500/20' : 'text-slate-400 hover:text-white bg-slate-800'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={isWish ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* 3D Floating Product Image */}
                  <div className="my-auto flex items-center justify-center relative py-4">
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="max-h-36 sm:max-h-44 object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110"
                      style={{
                        transform: 'translateZ(30px)'
                      }}
                    />
                  </div>

                  {/* Bottom Footer inside card */}
                  <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                    <div className="min-w-0 pr-2">
                      <p className="text-[11px] font-semibold uppercase text-slate-400">{prod.brand}</p>
                      <h4 className="text-sm font-bold text-white truncate">{prod.title}</h4>
                      <p className="text-indigo-400 font-extrabold text-base">${prod.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          addToCart(prod, 1);
                        }}
                        className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
