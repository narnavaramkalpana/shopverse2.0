import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Layers,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Send,
  ZoomIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetailsModal: React.FC = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    toggleWishlist,
    wishlist,
    toggleCompare,
    compareList,
    addReview,
    currentUser,
    openAuthModal
  } = useShop();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [activeDetailTab, setActiveDetailTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const imgRef = useRef<HTMLImageElement>(null);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const isWish = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const images = product.images.length > 0 ? product.images : [product.thumbnail];
  const currentImg = images[activeImgIndex] || product.thumbnail;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${currentImg})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    addReview(product.id, newRating, newComment.trim());
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Top Main Grid: Visuals & Buy Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Image & Interactive Magnifier Lens */}
            <div className="md:col-span-6 space-y-4">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative h-72 sm:h-84 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-6 cursor-crosshair group"
              >
                <img
                  ref={imgRef}
                  src={currentImg}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />

                {/* 2x Magnifier Lens Zoom Window */}
                <div
                  style={zoomStyle}
                  className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-2 border-indigo-500 shadow-2xl transition-opacity"
                />

                <span className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" /> Hover to 2x Zoom
                </span>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 overflow-hidden shrink-0 transition-all ${
                        activeImgIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Product Overview Details */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-['Outfit'] leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  Brand: <span className="text-slate-700">{product.brand}</span> &bull; Sold by <span className="text-indigo-600">{product.sellerName || 'Verified Vendor'}</span>
                </p>
              </div>

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(2)}</span>
                </div>
                <span className="text-xs text-slate-500">
                  Based on <strong>{product.reviews.length} verified customer reviews</strong>
                </span>
              </div>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <>
                    <span className="text-sm text-slate-400 line-through">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      Save {product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Shopping Bag
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                      isWish
                        ? 'bg-pink-50 text-pink-600 border-pink-200'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isWish ? 'currentColor' : 'none'} />
                    {isWish ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  </button>

                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                      isCompared
                        ? 'bg-purple-50 text-purple-600 border-purple-200'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    {isCompared ? 'In Compare Deck' : 'Compare Specs'}
                  </button>
                </div>
              </div>

              {/* Trust Micro-Bullets */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> Free Dispatch</div>
                <div className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 7-Day Free Return</div>
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-purple-500 shrink-0" /> Genuine Warranty</div>
              </div>
            </div>

          </div>

          {/* Tabbed Section: Details / Specs / Reviews */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
              <button
                onClick={() => setActiveDetailTab('details')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeDetailTab === 'details' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Product Overview
              </button>
              <button
                onClick={() => setActiveDetailTab('specs')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeDetailTab === 'specs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications & Features
              </button>
              <button
                onClick={() => setActiveDetailTab('reviews')}
                className={`pb-3 border-b-2 transition-colors ${
                  activeDetailTab === 'reviews' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Customer Reviews ({product.reviews.length})
              </button>
            </div>

            {/* Tab 1: Details Content */}
            {activeDetailTab === 'details' && (
              <div className="py-5 space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>{product.description}</p>
                {product.features && product.features.length > 0 && (
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Key Highlights</h4>
                    <ul className="space-y-1.5">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Specs Content */}
            {activeDetailTab === 'specs' && (
              <div className="py-5">
                <table className="w-full text-xs text-left border border-slate-100 rounded-xl overflow-hidden">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-slate-50">
                      <td className="p-3 font-semibold text-slate-500 w-1/3">Stock Availability</td>
                      <td className="p-3 text-slate-800 font-bold">{product.stock} units remaining</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-500">Category Tag</td>
                      <td className="p-3 text-slate-800 capitalize">{product.category}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-semibold text-slate-500">Brand Manufacturer</td>
                      <td className="p-3 text-slate-800">{product.brand}</td>
                    </tr>
                    {product.specs && Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key}>
                        <td className="p-3 font-semibold text-slate-500">{key}</td>
                        <td className="p-3 text-slate-800">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Reviews Content & Post Review Form */}
            {activeDetailTab === 'reviews' && (
              <div className="py-5 space-y-6">
                
                {/* Submit Review Box */}
                <form onSubmit={handleSubmitReview} className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Write a Customer Review</h4>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">Your Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 text-amber-400 hover:scale-125 transition-transform"
                        >
                          <Star className="w-5 h-5" fill={star <= newRating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Share your experience regarding texture, speed, comfort, or quality..."
                    required
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-hidden resize-none"
                  />

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Review
                  </button>
                </form>

                {/* Existing Reviews List */}
                <div className="space-y-3">
                  {product.reviews.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No customer reviews yet. Be the first to leave one!</p>
                  ) : (
                    product.reviews.map(rev => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{rev.userName}</span>
                            {rev.verifiedPurchase && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 text-[11px]">{rev.date}</span>
                        </div>

                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5"
                              fill={i < Math.floor(rev.rating) ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

          </div>

        </div>
      </motion.div>
    </div>
  );
};
