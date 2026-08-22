import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutModalOpen,
    setActiveTab
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 10;
  const taxAmount = (subtotal - discountAmount) * 0.18;
  const grandTotal = subtotal - discountAmount + shippingFee + taxAmount;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (applyCoupon(couponInput.trim())) {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center max-w-lg mx-auto space-y-5 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm my-6">
        <div className="w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Your Shopping Bag is Empty</h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Looks like you haven't added any products to your cart yet. Explore our curated categories and seasonal clearance deals!
        </p>
        <button
          onClick={() => setActiveTab('store')}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 inline-flex items-center gap-2 transition-all hover:scale-105"
        >
          Explore Catalog Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">Shopping Bag</h1>
          <p className="text-xs text-slate-500 mt-1">Review your selected items and apply coupons before checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Empty Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Cart Items Table Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100">
            {cart.map(item => {
              const itemTotal = item.product.price * item.quantity;
              return (
                <div key={item.product.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-slate-50 p-2 border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                        {item.product.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 truncate">{item.product.title}</h4>
                      <p className="text-xs text-slate-500 font-mono">${item.product.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateCartQty(item.product.id, -1)}
                        className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.product.id, 1)}
                        className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[5rem]">
                      <span className="text-sm font-extrabold text-slate-900 font-['Outfit'] block">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-indigo-500" /> Free Shipping on orders $50+</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 256-bit SSL Guaranteed</span>
          </div>
        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5 sticky top-28">
            <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Promo ({appliedCoupon.code} -{appliedCoupon.discountPercentage}%)
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-900">
                  {shippingFee === 0 ? <span className="text-emerald-600">Free</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax (18%)</span>
                <span className="font-semibold text-slate-900">${taxAmount.toFixed(2)}</span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                <span className="font-extrabold text-slate-900 text-base">Grand Total</span>
                <span className="text-2xl font-extrabold text-indigo-600 font-['Outfit']">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">Have a Coupon Code?</label>
              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{appliedCoupon.code} applied (-{appliedCoupon.discountPercentage}%)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="Try SAVE20 or WELCOME10"
                    className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-hidden font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
              <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Tip: Try code <strong className="text-indigo-600">SAVE20</strong> for 20% off!
              </p>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
