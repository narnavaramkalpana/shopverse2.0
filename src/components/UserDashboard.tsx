import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User as UserIcon,
  ShoppingBag,
  Truck,
  Wallet,
  Award,
  Bell,
  MapPin,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  XCircle,
  CheckCircle2,
  Package,
  Clock,
  ArrowRight,
  Shield,
  CreditCard
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    orders,
    notifications,
    updateUserProfile,
    addAddress,
    deleteAddress,
    depositWalletFunds,
    redeemRewards,
    advanceOrderStatus,
    cancelOrder,
    returnOrder,
    markNotificationRead,
    markAllNotificationsRead,
    showToast,
    openAuthModal
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'tracking' | 'wallet' | 'rewards' | 'notifications'>('profile');
  
  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser ? currentUser.name : '');
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || '');

  // Add address state
  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrZip, setNewAddrZip] = useState('');

  // Wallet load state
  const [depositAmount, setDepositAmount] = useState('50');

  // Tracking query state
  const [trackingSearch, setTrackingSearch] = useState('');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<string>(orders[0]?.id || '');

  if (!currentUser) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-8">
        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">Sign In Required</h2>
        <p className="text-xs text-slate-500">Please authenticate to view your orders, wallet balance, and shipment tracking.</p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(editName, editAvatar);
    setIsEditingProfile(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      fullName: newAddrName,
      phoneNumber: newAddrPhone,
      streetAddress: newAddrStreet,
      city: newAddrCity,
      state: newAddrState,
      postalCode: newAddrZip,
      country: 'United States',
      isDefault: false
    });
    setIsAddingAddr(false);
    setNewAddrName('');
    setNewAddrPhone('');
    setNewAddrStreet('');
    setNewAddrCity('');
    setNewAddrState('');
    setNewAddrZip('');
  };

  const handlePrintInvoice = (order: typeof orders[0]) => {
    showToast(`Generating invoice for Order #${order.orderNumber}...`, 'success');
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${order.orderNumber}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: 800; color: #4f46e5; }
            .invoice-meta { margin-top: 20px; line-height: 1.6; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; }
            th, td { padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 13px; }
            th { background: #f8fafc; font-weight: 600; }
            .totals { margin-top: 30px; float: right; width: 280px; font-size: 14px; line-height: 1.8; }
            .grand-total { font-size: 18px; font-weight: 800; color: #4f46e5; border-top: 2px solid #e2e8f0; padding-top: 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">ShopVerse E-Commerce</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Official Tax Invoice & Receipt</div>
            </div>
            <div style="text-align: right; font-size: 13px;">
              <strong>Invoice #:</strong> ${order.orderNumber}<br>
              <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br>
              <strong>Payment:</strong> ${order.paymentMethod} (${order.paymentStatus})
            </div>
          </div>

          <div class="invoice-meta">
            <strong>Billed To:</strong><br>
            ${order.shippingAddress.fullName}<br>
            ${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br>
            Phone: ${order.shippingAddress.phoneNumber}
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(i => `
                <tr>
                  <td>${i.product.title}</td>
                  <td>${i.quantity}</td>
                  <td>$${i.product.price.toFixed(2)}</td>
                  <td>$${(i.product.price * i.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <div>Subtotal: $${order.subtotal.toFixed(2)}</div>
            ${order.discountAmount > 0 ? `<div style="color: #10b981;">Discount (${order.couponCode || 'Promo'}): -$${order.discountAmount.toFixed(2)}</div>` : ''}
            <div>Shipping: $${order.shippingFee.toFixed(2)}</div>
            <div>Tax (18%): $${order.taxAmount.toFixed(2)}</div>
            <div class="grand-total">Grand Total: $${order.totalAmount.toFixed(2)}</div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
  };

  const trackedOrder = orders.find(o => o.id === selectedOrderForTracking || o.orderNumber.toLowerCase() === trackingSearch.toLowerCase().trim()) || orders[0];

  return (
    <div className="py-8 space-y-6">
      
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-['Outfit']">{currentUser.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-400/30">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
          <div>
            <span className="text-[10px] text-slate-300 uppercase font-semibold block">Wallet Cash</span>
            <span className="text-lg font-extrabold text-emerald-400 font-['Outfit']">
              ${currentUser.walletBalance.toFixed(2)}
            </span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <span className="text-[10px] text-slate-300 uppercase font-semibold block">Reward Points</span>
            <span className="text-lg font-extrabold text-amber-400 font-['Outfit']">
              {currentUser.rewardPoints} pts
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigation & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-3 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <UserIcon className="w-4 h-4" /> Profile & Addresses
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Order History ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === 'tracking' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-4 h-4" /> Live Tracking Stepper
            </button>

            <button
              onClick={() => setActiveTab('wallet')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === 'wallet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Wallet className="w-4 h-4" /> Virtual Wallet
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === 'rewards' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Award className="w-4 h-4" /> Rewards & Cashback
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                activeTab === 'notifications' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-4 h-4" /> Notifications ({notifications.filter(n => !n.isRead).length})
            </button>
          </div>
        </div>

        {/* Right Content Pane */}
        <div className="lg:col-span-9 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          
          {/* TAB 1: Profile & Saved Addresses */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Personal Information</h3>
                  <p className="text-xs text-slate-500">Manage your profile metadata and default delivery addresses.</p>
                </div>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                >
                  {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileSave} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 mb-1 block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 mb-1 block">Avatar Photo URL</label>
                      <input
                        type="text"
                        value={editAvatar}
                        onChange={e => setEditAvatar(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block">Full Name</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 block">{currentUser.name}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block">Email Address</span>
                    <span className="text-sm font-bold text-slate-800 mt-1 block">{currentUser.email}</span>
                  </div>
                </div>
              )}

              {/* Saved Addresses Section */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-indigo-600" /> Saved Delivery Addresses
                  </h4>
                  <button
                    onClick={() => setIsAddingAddr(!isAddingAddr)}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                </div>

                {isAddingAddr && (
                  <form onSubmit={handleAddAddress} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Recipient Name"
                        value={newAddrName}
                        onChange={e => setNewAddrName(e.target.value)}
                        className="text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Phone Number"
                        value={newAddrPhone}
                        onChange={e => setNewAddrPhone(e.target.value)}
                        className="text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Street Address"
                      value={newAddrStreet}
                      onChange={e => setNewAddrStreet(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={newAddrCity}
                        onChange={e => setNewAddrCity(e.target.value)}
                        className="text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="State"
                        value={newAddrState}
                        onChange={e => setNewAddrState(e.target.value)}
                        className="text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Postal Code"
                        value={newAddrZip}
                        onChange={e => setNewAddrZip(e.target.value)}
                        className="text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
                      Save Address
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentUser.addresses.map(addr => (
                    <div key={addr.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex justify-between items-start text-xs space-y-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{addr.fullName}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-slate-600 mt-1">{addr.streetAddress}</p>
                        <p className="text-slate-500">{addr.city}, {addr.state} {addr.postalCode}</p>
                        <p className="text-slate-400 text-[11px]">{addr.phoneNumber}</p>
                      </div>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Order History & Invoices</h3>
                <p className="text-xs text-slate-500">Track current shipments, download PDF tax invoices, or request refunds.</p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">No orders recorded yet.</div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
                      {/* Order Head */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 text-xs">
                        <div>
                          <span className="font-mono font-bold text-indigo-600 text-sm">{order.orderNumber}</span>
                          <span className="text-slate-400 text-[11px] ml-2">&bull; {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                            order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                            order.status === 'Returned' ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {order.status}
                          </span>
                          <button
                            onClick={() => handlePrintInvoice(order)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center gap-1 font-semibold"
                            title="Download Invoice PDF"
                          >
                            <Download className="w-3.5 h-3.5" /> PDF
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.product.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img src={item.product.thumbnail} alt={item.product.title} className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1" />
                              <div>
                                <h5 className="font-bold text-slate-800 line-clamp-1">{item.product.title}</h5>
                                <span className="text-slate-400 text-[11px]">Qty: {item.quantity} &bull; ${item.product.price.toFixed(2)}</span>
                              </div>
                            </div>
                            <span className="font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer & Actions */}
                      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs gap-3">
                        <div className="text-slate-500 font-medium">
                          Total: <strong className="text-slate-900 font-extrabold text-sm">${order.totalAmount.toFixed(2)}</strong> via {order.paymentMethod}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrderForTracking(order.id);
                              setActiveTab('tracking');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors"
                          >
                            Live Tracking
                          </button>

                          {(order.status === 'Placed' || order.status === 'Processing') && (
                            <button
                              onClick={() => cancelOrder(order.id)}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-colors"
                            >
                              Cancel Order
                            </button>
                          )}

                          {order.status === 'Delivered' && (
                            <button
                              onClick={() => returnOrder(order.id)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                            >
                              7-Day Free Return
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Live Order Tracking Stepper */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Shipment Milestone Tracking</h3>
                  <p className="text-xs text-slate-500">Live logistics stages updated in real time.</p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search Order Reference..."
                    value={trackingSearch}
                    onChange={e => setTrackingSearch(e.target.value)}
                    className="text-xs p-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              {trackedOrder ? (
                <div className="space-y-6">
                  {/* Tracking Header */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Shipment ID</span>
                      <span className="font-mono font-extrabold text-base">{trackedOrder.orderNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Carrier Code</span>
                      <span className="font-mono text-xs">{trackedOrder.trackingNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Status</span>
                      <span className="text-xs font-bold text-emerald-400">{trackedOrder.status}</span>
                    </div>
                  </div>

                  {/* Visual Stepper Timeline */}
                  <div className="py-4 space-y-6">
                    {trackedOrder.timeline.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start relative">
                        {/* Dot indicator */}
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            step.completed ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}>
                            {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          {idx < trackedOrder.timeline.length - 1 && (
                            <div className={`w-0.5 h-12 ${step.completed ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between text-xs">
                            <h4 className={`font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>{step.title}</h4>
                            <span className="text-[11px] text-slate-400">{step.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Simulator Control Box */}
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-indigo-950 block">Logistics Sandbox Simulator</span>
                      <span className="text-indigo-700 text-[11px]">Click to advance package to the next transit milestone.</span>
                    </div>
                    <button
                      onClick={() => advanceOrderStatus(trackedOrder.id)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm"
                    >
                      Advance Status
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">No matching order found for tracking.</div>
              )}
            </div>
          )}

          {/* TAB 4: Virtual Wallet */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">ShopVerse Virtual Wallet</h3>
                <p className="text-xs text-slate-500">Fast 1-click zero fee checkouts with automatic refund settlements.</p>
              </div>

              {/* Balance Card */}
              <div className="bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <span className="text-xs text-indigo-200 font-semibold uppercase tracking-wider block">Available Balance</span>
                  <span className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] mt-1 block">
                    ${currentUser.walletBalance.toFixed(2)}
                  </span>
                  <span className="text-xs text-indigo-200 mt-1 block flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Protected with biometric 2FA authentication
                  </span>
                </div>

                {/* Load Cash form */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col gap-2 w-full sm:w-auto">
                  <label className="text-[11px] font-bold text-white uppercase">Add Funds via Card</label>
                  <div className="flex gap-2">
                    <select
                      value={depositAmount}
                      onChange={e => setDepositAmount(e.target.value)}
                      className="bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-xl outline-hidden"
                    >
                      <option value="25">$25.00</option>
                      <option value="50">$50.00</option>
                      <option value="100">$100.00</option>
                      <option value="250">$250.00</option>
                    </select>
                    <button
                      onClick={() => depositWalletFunds(Number(depositAmount))}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                    >
                      Deposit Cash
                    </button>
                  </div>
                </div>
              </div>

              {/* Transaction History Log */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Recent Activity Ledger</h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  <div className="p-3.5 flex justify-between items-center text-xs bg-slate-50 font-semibold text-slate-500">
                    <span>Description / Reference</span>
                    <span>Type & Date</span>
                    <span>Amount</span>
                  </div>
                  {orders.map(o => (
                    <div key={o.id} className="p-3.5 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-800">Order Checkout #{o.orderNumber}</span>
                        <span className="text-slate-400 text-[11px] block">{o.paymentMethod} Payment</span>
                      </div>
                      <span className="text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</span>
                      <span className="font-bold text-rose-600">-${o.totalAmount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Reward Points */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Loyalty Rewards & Coupons</h3>
                <p className="text-xs text-slate-500">Earn 1 point for every $2 spent. Redeem points for instant store discounts!</p>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-100 font-bold uppercase tracking-wider block">Accumulated Loyalty Points</span>
                  <span className="text-3xl font-extrabold font-['Outfit'] mt-1 block">{currentUser.rewardPoints} Points</span>
                </div>
                <Award className="w-12 h-12 text-amber-200" />
              </div>

              {/* Available Redemptions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Available Redemption Vouchers</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">10% OFF Voucher</span>
                      <span className="text-xs font-bold text-amber-600">100 Points</span>
                    </div>
                    <p className="text-xs text-slate-600">Apply a 10% discount on orders above $20 with code WELCOME10.</p>
                    <button
                      onClick={() => redeemRewards(100, '10% OFF Voucher', 'WELCOME10')}
                      disabled={currentUser.rewardPoints < 100}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 disabled:opacity-50 text-white text-xs font-bold transition-colors"
                    >
                      Redeem 100 Points
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">20% OFF Voucher</span>
                      <span className="text-xs font-bold text-amber-600">200 Points</span>
                    </div>
                    <p className="text-xs text-slate-600">Apply a 20% discount on orders above $40 with code SAVE20.</p>
                    <button
                      onClick={() => redeemRewards(200, '20% OFF Voucher', 'SAVE20')}
                      disabled={currentUser.rewardPoints < 200}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 disabled:opacity-50 text-white text-xs font-bold transition-colors"
                    >
                      Redeem 200 Points
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Notification Center</h3>
                  <p className="text-xs text-slate-500">Real-time alerts regarding deliveries, deals, and wallet updates.</p>
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Mark All Read
                </button>
              </div>

              <div className="space-y-3">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      notif.isRead ? 'bg-white border-slate-100 opacity-70' : 'bg-indigo-50/50 border-indigo-100 shadow-xs'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs">
                        <h4 className="font-bold text-slate-900">{notif.title}</h4>
                        <span className="text-[10px] text-slate-400">{new Date(notif.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
