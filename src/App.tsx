import React, { useState, useMemo } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { WorkflowStepper } from './components/WorkflowStepper';
import { Frontpage3D } from './components/Frontpage3D';
import { AuthenticationPage } from './components/AuthenticationPage';
import { LoginPage } from './components/LoginPage';
import { HeroSlider } from './components/HeroSlider';
import { Showcase3D } from './components/Showcase3D';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CompareModal } from './components/CompareModal';
import { UserDashboard } from './components/UserDashboard';
import { SellerPortal } from './components/SellerPortal';
import { AdminPortal } from './components/AdminPortal';
import { RealWorldImpact } from './components/RealWorldImpact';
import { InformationCenter } from './components/InformationCenter';
import { AuthModal } from './components/AuthModal';
import { AiAssistant } from './components/AiAssistant';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { CATEGORIES_LIST } from './data/mockData';
import {
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  RotateCcw,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    products,
    activeTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    setActiveTab
  } = useShop();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navbar */}
      <Navbar />

      {/* Persistent Workflow Stepper Banner */}
      <WorkflowStepper />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* WORKFLOW STEP 1: FRONTPAGE (3D DESIGN & SPATIAL SHOWCASE) */}
        {activeTab === 'frontpage-3d' && <Frontpage3D />}

        {/* WORKFLOW STEP 2: AUTHENTICATION GATEWAY (BETWEEN FRONTPAGE AND LOGIN) */}
        {activeTab === 'auth-gateway' && <AuthenticationPage />}

        {/* WORKFLOW STEP 3: LOGIN PORTAL */}
        {activeTab === 'login' && <LoginPage />}

        {/* WORKFLOW STEP 4: USER DASHBOARD */}
        {activeTab === 'dashboard' && <UserDashboard />}

        {/* STOREFRONT CATALOG */}
        {activeTab === 'store' && (
          <div className="space-y-10">
            
            {/* Hero Slider */}
            <HeroSlider />

            {/* Quick Link to 3D Visualizer */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Experience Products in Spatial 3D</h3>
                  <p className="text-xs text-slate-300">Rotate models, inspect CAD tolerances, and test dynamic finishes.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('frontpage-3d')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
              >
                Launch 3D Frontpage <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Department Category Pills */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
                  Explore Curated Departments
                </h2>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Category Filter
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                {CATEGORIES_LIST.map(cat => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105'
                          : 'bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Bar & Sort Controls */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Showing <strong>{filteredProducts.length}</strong> items in catalog</span>
                {searchQuery && (
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    Matching "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-indigo-950 font-bold ml-1">&times;</button>
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" /> Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-hidden cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Top Deals & Discounts</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">No products found</h3>
                <p className="text-xs text-slate-400">Try changing your search terms or selecting another department category.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Embedded 3D Teaser Section */}
            <Showcase3D />

          </div>
        )}

        {/* 3D SPATIAL VISUALIZER TAB */}
        {activeTab === '3d-showcase' && <Showcase3D />}

        {/* SHOPPING CART TAB */}
        {activeTab === 'cart' && <CartDrawer />}

        {/* SELLER PORTAL */}
        {activeTab === 'seller' && <SellerPortal />}

        {/* ADMIN COMMAND CENTER */}
        {activeTab === 'admin' && <AdminPortal />}

        {/* REAL WORLD PROBLEM SOLUTION */}
        {activeTab === 'real-world' && <RealWorldImpact />}

        {/* HELP & INFORMATION CENTER */}
        {activeTab === 'info' && <InformationCenter />}

      </main>

      {/* Global Modals */}
      <ProductDetailsModal />
      <CheckoutModal />
      <CompareModal />
      <AuthModal />

      {/* AI Assistant Chatbot */}
      <AiAssistant />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
