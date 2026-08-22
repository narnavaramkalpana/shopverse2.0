import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Headphones, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDES = [
  {
    title: 'Next-Gen 3D Shopping Experience',
    subtitle: 'Inspect products with interactive 3D perspective decks & 2x crystal zoom before ordering.',
    tag: 'Virtual Retail Engine',
    bg: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    actionText: 'Explore 3D Visualizer',
    actionTab: '3d-showcase' as const,
    category: 'smartphones'
  },
  {
    title: 'Curated Luxury Fragrance & Skincare',
    subtitle: 'Dermatologist-tested formulas, artisanal extractions & verified customer video reviews.',
    tag: 'Summer Clearance &bull; Up to 50% Off',
    bg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop',
    actionText: 'Shop Beauty Catalog',
    actionTab: 'store' as const,
    category: 'beauty'
  },
  {
    title: 'Nordic Minimalist Living & Tech',
    subtitle: 'Solid oak ergonomics, studio acoustics, and instant express door dispatch.',
    tag: 'Top Trending Designs',
    bg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop',
    actionText: 'Browse Furniture Deals',
    actionTab: 'store' as const,
    category: 'furniture'
  }
];

export const HeroSlider: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useShop();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div className="space-y-6">
      {/* Slider Hero Container */}
      <div className="relative h-[22rem] sm:h-[26rem] md:h-[30rem] rounded-3xl overflow-hidden shadow-2xl bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})` }}
          >
            {/* Gradient Overlays for optimal readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            {/* Slide Content */}
            <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center max-w-2xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 w-fit"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {slide.tag}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3 sm:mb-4 text-white drop-shadow-md font-['Outfit']"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                <button
                  onClick={() => {
                    setSelectedCategory(slide.category);
                    setActiveTab(slide.actionTab);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                  {slide.actionText} <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('real-world')}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white text-sm font-semibold transition-all"
                >
                  Why ShopVerse?
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">Free Express Shipping</h4>
            <p className="text-[11px] text-slate-500">Orders above $50</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">7-Day Free Returns</h4>
            <p className="text-[11px] text-slate-500">Zero hassle refund policy</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">100% Secure Checkout</h4>
            <p className="text-[11px] text-slate-500">Encrypted tokenization</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">24/7 AI & Human Help</h4>
            <p className="text-[11px] text-slate-500">Instant retail support</p>
          </div>
        </div>
      </div>
    </div>
  );
};
