import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  Search,
  Mic,
  User as UserIcon,
  LogOut,
  Layers,
  ShieldCheck,
  Store,
  HelpCircle,
  Sparkles,
  Bell,
  Check,
  Award,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    compareList,
    currentUser,
    notifications,
    activeTab,
    searchQuery,
    products,
    setActiveTab,
    setSearchQuery,
    setSelectedCategory,
    openAuthModal,
    logout,
    markNotificationRead,
    markAllNotificationsRead,
    showToast,
    setIsCompareModalOpen
  } = useShop();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  // Filter auto suggestions
  const suggestions = searchQuery.trim()
    ? products
        .filter(p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Voice speech recognition is not supported in this browser. Try typing your search!', 'info');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      setIsListening(true);
      showToast('Listening... Speak product name now', 'info');

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setActiveTab('store');
        setIsListening(false);
        showToast(`Searched for: "${transcript}"`, 'success');
      };

      recognition.onerror = () => {
        setIsListening(false);
        showToast('Could not hear audio. Please try again.', 'error');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      showToast('Microphone access unavailable.', 'error');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('frontpage-3d')}
            className="cursor-pointer flex items-center gap-2.5 shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-['Outfit']">
              Shop<span className="text-indigo-600">Verse</span>
            </span>
          </div>

          {/* Search Bar with Autocomplete Suggestions */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative">
            <div className="w-full flex items-center bg-slate-100/80 hover:bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'store') setActiveTab('store');
                }}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search products, beauty, tech..."
                className="w-full bg-transparent border-none outline-hidden text-xs text-slate-800 placeholder-slate-400"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                title="Voice Search"
                className={`p-1 rounded-full text-slate-400 hover:text-indigo-600 transition-colors ${
                  isListening ? 'text-indigo-600 animate-pulse bg-indigo-50' : ''
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 py-2">
                <div className="px-4 py-1 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  Suggested Products
                </div>
                {suggestions.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSearchQuery(item.title);
                      setIsSearchFocused(false);
                      setActiveTab('store');
                    }}
                    className="px-4 py-2.5 hover:bg-indigo-50/70 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img src={item.thumbnail} alt={item.title} className="w-9 h-9 object-cover rounded-lg bg-slate-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                      <span className="text-xs text-indigo-600 font-semibold">${item.price.toFixed(2)} &bull; {item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('frontpage-3d')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'frontpage-3d' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> 1. 3D Frontpage
            </button>

            <button
              onClick={() => setActiveTab('auth-gateway')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'auth-gateway' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" /> 2. Auth
            </button>

            <button
              onClick={() => setActiveTab('login')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'login' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5 text-blue-500" /> 3. Login
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              4. Dashboard
            </button>

            <button
              onClick={() => setActiveTab('store')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'store' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Store
            </button>

            <button
              onClick={() => setActiveTab('real-world')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                activeTab === 'real-world' ? 'bg-amber-50 text-amber-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" /> Solution Proof
            </button>

            <button
              onClick={() => setActiveTab('seller')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                activeTab === 'seller' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-slate-500" /> Vendor
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                activeTab === 'admin' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Admin
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Compare Button */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                title="Compare Products"
                className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Layers className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-purple-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setActiveTab('dashboard');
              }}
              title="My Wishlist"
              className="relative p-2 text-slate-600 hover:text-pink-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-pink-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setActiveTab('cart')}
              title="Shopping Cart"
              className={`relative p-2 rounded-full transition-colors ${
                activeTab === 'cart'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full text-xs font-bold flex items-center justify-center border-2 ${
                  activeTab === 'cart' ? 'bg-amber-400 text-slate-900 border-indigo-600' : 'bg-indigo-600 text-white border-white'
                }`}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                title="Notifications"
                className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-ping" />
                )}
                {unreadNotifs > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800">Notifications ({unreadNotifs} unread)</span>
                    {unreadNotifs > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-indigo-600 font-semibold hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3 text-xs cursor-pointer transition-colors ${
                            notif.isRead ? 'bg-white opacity-70' : 'bg-indigo-50/40 hover:bg-indigo-50'
                          }`}
                        >
                          <p className="font-semibold text-slate-800 mb-0.5">{notif.title}</p>
                          <p className="text-slate-600 leading-relaxed">{notif.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Auth / Profile Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-indigo-200"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-slate-800">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 py-1.5">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full">
                          {currentUser.role}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          ${currentUser.walletBalance.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" /> My Profile & Orders
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('seller');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                    >
                      <Store className="w-4 h-4" /> Vendor Inventory
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" /> Admin Analytics
                    </button>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-600/30 transition-all"
                >
                  Join Free
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent border-none outline-hidden text-sm"
            />
            <button onClick={handleVoiceSearch} className="text-slate-400 p-1">
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
