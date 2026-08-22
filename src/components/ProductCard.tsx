import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, ShoppingCart, Heart, Layers, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    wishlist,
    toggleCompare,
    compareList,
    setSelectedProductModal
  } = useShop();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
      
      {/* Discount Badge */}
      {product.discountPercentage && product.discountPercentage > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          -{product.discountPercentage}%
        </span>
      )}

      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-transform hover:scale-110 ${
            isWishlisted
              ? 'bg-pink-500 text-white'
              : 'bg-white/90 text-slate-500 hover:text-pink-600 hover:bg-white'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        <button
          type="button"
          onClick={() => toggleCompare(product.id)}
          title={isCompared ? 'In Compare Deck' : 'Add to Compare'}
          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-transform hover:scale-110 ${
            isCompared
              ? 'bg-purple-600 text-white'
              : 'bg-white/90 text-slate-500 hover:text-purple-600 hover:bg-white'
          }`}
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image Stage */}
      <div
        onClick={() => setSelectedProductModal(product)}
        className="cursor-pointer bg-slate-50 relative h-52 sm:h-60 overflow-hidden flex items-center justify-center p-6"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-indigo-600" /> Quick Preview
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
          <span className="uppercase tracking-wider text-indigo-600 font-bold">{product.category}</span>
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(2)}</span>
            <span className="text-slate-400 text-[10px]">({product.reviews.length})</span>
          </div>
        </div>

        <h3
          onClick={() => setSelectedProductModal(product)}
          className="text-sm font-bold text-slate-800 line-clamp-2 hover:text-indigo-600 cursor-pointer transition-colors leading-snug mb-2"
        >
          {product.title}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Stock info */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-900 font-['Outfit']">
              ${product.price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            product.stock <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {product.stock <= 5 ? `Low Stock (${product.stock})` : 'In Stock'}
          </span>
        </div>

        {/* Add to Cart CTA */}
        <button
          type="button"
          onClick={() => addToCart(product, 1)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98]"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Bag
        </button>
      </div>

    </div>
  );
};
