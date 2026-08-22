import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';
import {
  X,
  ShieldCheck,
  CreditCard,
  Wallet,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    appliedCoupon,
    placeOrder,
    currentUser,
    setActiveTab,
    openAuthModal,
    showToast
  } = useShop();

  const [fullName, setFullName] = useState(currentUser ? currentUser.name : '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.addresses[0]?.phoneNumber || '+1 (555) 234-5678');
  const [streetAddress, setStreetAddress] = useState(currentUser?.addresses[0]?.streetAddress || '742 Evergreen Terrace, Apt 4B');
  const [city, setCity] = useState(currentUser?.addresses[0]?.city || 'Springfield');
  const [state, setState] = useState(currentUser?.addresses[0]?.state || 'OR');
  const [postalCode, setPostalCode] = useState(currentUser?.addresses[0]?.postalCode || '97477');
  const [country] = useState('United States');

  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Wallet' | 'COD' | 'UPI'>('Card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  const [placedOrderInfo, setPlacedOrderInfo] = useState<any>(null);

  if (!isCheckoutModalOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 10;
  const taxAmount = (subtotal - discountAmount) * 0.18;
  const totalAmount = subtotal - discountAmount + shippingFee + taxAmount;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      showToast('Please sign in or create an account to process your order!', 'info');
      openAuthModal('login');
      return;
    }

    const shippingAddress: Address = {
      id: `addr_${Date.now()}`,
      fullName,
      phoneNumber,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      isDefault: true
    };

    const order = placeOrder(shippingAddress, paymentMethod);
    if (order) {
      setPlacedOrderInfo(order);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">Encrypted 256-Bit Checkout</h2>
              <p className="text-xs text-slate-500">Fast, verified e-commerce tokenization</p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCheckoutModalOpen(false);
              setPlacedOrderInfo(null);
            }}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {placedOrderInfo ? (
            /* Order Placed Success Confirmation Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Order Placed Successfully!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you for shopping with ShopVerse. Your receipt and confirmation have been recorded.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Order Reference:</span>
                  <span className="font-bold font-mono text-indigo-600">{placedOrderInfo.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Tracking Number:</span>
                  <span className="font-mono text-slate-800">{placedOrderInfo.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Payment Settled:</span>
                  <span className="font-bold text-emerald-600">${placedOrderInfo.totalAmount.toFixed(2)} ({placedOrderInfo.paymentMethod})</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500 font-semibold">Shipping Address:</span>
                  <span className="text-slate-800 font-medium text-right truncate max-w-[200px]">{placedOrderInfo.shippingAddress.streetAddress}, {placedOrderInfo.shippingAddress.city}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setPlacedOrderInfo(null);
                    setActiveTab('dashboard');
                  }}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Track Live Shipment Stepper
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setPlacedOrderInfo(null);
                    setActiveTab('store');
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              
              {/* Shipping Address Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-indigo-600" /> 1. Shipping Address Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Full Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Alice Smith"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Phone Contact Number</label>
                    <input
                      type="text"
                      required
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Street Address / Unit</label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={e => setStreetAddress(e.target.value)}
                    placeholder="123 Shopping Blvd, Suite 400"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="New York"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">State / Region</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={e => setState(e.target.value)}
                      placeholder="NY"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder="10001"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-indigo-600" /> 2. Payment Gateway & Options
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'Card' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900 mt-2 block">Credit / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Wallet')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Wallet'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Wallet className={`w-5 h-5 ${paymentMethod === 'Wallet' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900 mt-2 block">
                      ShopVerse Wallet
                      <span className="text-[10px] text-emerald-600 block font-semibold">
                        (${currentUser ? currentUser.walletBalance.toFixed(2) : '0.00'})
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Truck className={`w-5 h-5 ${paymentMethod === 'COD' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900 mt-2 block">Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'Card' && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 mb-1 block">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">Expiry</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Total & Pay Button */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Total to Pay</span>
                  <span className="text-2xl font-extrabold text-indigo-600 font-['Outfit']">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                  Confirm & Pay <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
