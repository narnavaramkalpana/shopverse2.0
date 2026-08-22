import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import {
  Store,
  Plus,
  Trash2,
  AlertCircle,
  TrendingUp,
  Box,
  DollarSign,
  CheckCircle2,
  X
} from 'lucide-react';

export const SellerPortal: React.FC = () => {
  const { products, addProduct, deleteProduct, currentUser } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('25');
  const [category, setCategory] = useState('beauty');
  const [brand, setBrand] = useState('ShopVerse Partner');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600');

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock <= 10).length;
  const estimatedInventoryValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    addProduct({
      title: title.trim(),
      description: description.trim() || 'High quality certified merchant product.',
      price: Number(price),
      stock: Number(stock),
      category,
      brand,
      thumbnail: thumbnail.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600'
    });

    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
    setPrice('');
    setStock('25');
  };

  return (
    <div className="py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5" /> Merchant & Vendor Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">Seller Inventory Portal</h1>
          <p className="text-xs text-slate-500 mt-1">Manage catalog listings, replenish low stock units, and review revenue volume.</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> List New Product
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inventory Value</span>
            <span className="text-xl font-extrabold text-slate-900 font-['Outfit'] block mt-0.5">
              ${estimatedInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Live Catalog Items</span>
            <span className="text-xl font-extrabold text-slate-900 font-['Outfit'] block mt-0.5">
              {totalProducts} SKU Listings
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Low Stock Warnings</span>
            <span className="text-xl font-extrabold text-amber-600 font-['Outfit'] block mt-0.5">
              {lowStockCount} Units Below Threshold
            </span>
          </div>
        </div>
      </div>

      {/* Inventory Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-['Outfit']">Active Product Stock Inventory</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-bold uppercase">
                <th className="p-3.5">Product SKU</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Unit Price</th>
                <th className="p-3.5">Stock Level</th>
                <th className="p-3.5">Merchant</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {products.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={prod.thumbnail} alt={prod.title} className="w-10 h-10 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100" />
                    <div>
                      <h5 className="font-bold text-slate-800 line-clamp-1">{prod.title}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {prod.id}</span>
                    </div>
                  </td>
                  <td className="p-3.5 capitalize text-slate-700">{prod.category}</td>
                  <td className="p-3.5 font-bold text-indigo-600 font-mono text-sm">${prod.price.toFixed(2)}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      prod.stock <= 10 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {prod.stock} units
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">{prod.sellerName || 'Verified Partner'}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">List New Store Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Product Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Wireless Noise Cancelling Earbuds"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="49.99"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    placeholder="25"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                  >
                    <option value="beauty">Beauty</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="furniture">Furniture</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="groceries">Groceries</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="Brand name"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={e => setThumbnail(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe material, specifications, and warranty details..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
              >
                Publish Listing Live
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
