import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Layers, ShoppingCart, Trash2, Star, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const CompareModal: React.FC = () => {
  const {
    isCompareModalOpen,
    setIsCompareModalOpen,
    compareList,
    removeFromCompare,
    products,
    addToCart
  } = useShop();

  if (!isCompareModalOpen) return null;

  const compareProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">Side-by-Side Product Comparison</h2>
              <p className="text-xs text-slate-500">Compare specs, ratings, and pricing for optimal purchase decisions</p>
            </div>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="overflow-y-auto p-6">
          {compareProducts.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Layers className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No products selected for comparison</p>
              <p className="text-xs text-slate-400">Click the compare icon on product cards to add up to 3 items.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 rounded-2xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 font-bold text-slate-500 w-1/4">Product Feature</th>
                    {compareProducts.map(p => (
                      <th key={p.id} className="p-4 text-center min-w-[200px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute -top-2 -right-2 p-1 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-100"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-24 h-24 object-contain mx-auto bg-white p-2 rounded-xl border border-slate-100 mb-2"
                          />
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{p.title}</h4>
                          <p className="text-indigo-600 font-extrabold text-sm mt-0.5">${p.price.toFixed(2)}</p>
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="mt-2 w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm"
                          >
                            <ShoppingCart className="w-3 h-3" /> Add to Bag
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Category</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3.5 text-center font-medium capitalize text-slate-800">{p.category}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Customer Rating</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3.5 text-center">
                        <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{p.rating.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400">({p.reviews.length})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Stock Availability</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3.5 text-center font-semibold text-emerald-600">
                        {p.stock > 0 ? `${p.stock} In Stock` : 'Out of Stock'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Brand Manufacturer</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3.5 text-center text-slate-700 font-medium">{p.brand}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Key Features</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3.5 text-slate-600 text-left">
                        <ul className="space-y-1 text-[11px]">
                          {p.features?.map((f, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">Overview Description</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="p-3.5 text-slate-500 text-[11px] leading-relaxed line-clamp-4">
                        {p.description}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
