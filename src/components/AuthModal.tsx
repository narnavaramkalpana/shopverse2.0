import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, login, register } = useShop();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Customer' | 'Seller' | 'Admin'>('Customer');

  if (!isAuthModalOpen) return null;

  // Password strength calculation
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = calculateStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      login(email, role);
    } else {
      register(name || email.split('@')[0], email, role);
    }
  };

  const handleDemoPreset = (presetEmail: string, presetRole: 'Customer' | 'Seller' | 'Admin') => {
    setEmail(presetEmail);
    setRole(presetRole);
    login(presetEmail, presetRole);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative"
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
            {authModalMode === 'login' ? 'Sign in to ShopVerse' : 'Create Customer Account'}
          </h2>
          <p className="text-xs text-slate-500">
            {authModalMode === 'login'
              ? 'Access saved addresses, live tracking, and wallet balance.'
              : 'Join today and receive a $50.00 wallet welcome bonus!'}
          </p>
        </div>

        {/* Demo Fast Preset Chips */}
        <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> One-Click Quick Demo Sign-Ins:
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => handleDemoPreset('alice@example.com', 'Customer')}
              className="px-2 py-1.5 bg-white text-indigo-700 rounded-lg border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Buyer (Alice)
            </button>
            <button
              type="button"
              onClick={() => handleDemoPreset('partner@shopverse.com', 'Seller')}
              className="px-2 py-1.5 bg-white text-purple-700 rounded-lg border border-purple-200 hover:bg-purple-600 hover:text-white transition-colors"
            >
              Seller (Bob)
            </button>
            <button
              type="button"
              onClick={() => handleDemoPreset('admin@shopverse.com', 'Admin')}
              className="px-2 py-1.5 bg-white text-slate-800 rounded-lg border border-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="yourname@example.com"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
              />
            </div>

            {/* Strength Meter */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map(s => (
                    <div
                      key={s}
                      className={`flex-1 rounded-full transition-colors ${
                        strength >= s
                          ? strength === 4
                            ? 'bg-emerald-500'
                            : strength >= 2
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold block">
                  Password Strength: {strength >= 4 ? 'Excellent' : strength >= 2 ? 'Moderate' : 'Weak'}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Portal Account Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden"
            >
              <option value="Customer">Customer (Buyer)</option>
              <option value="Seller">Seller (Vendor Hub)</option>
              <option value="Admin">Admin (Platform Oversight)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            {authModalMode === 'login' ? 'Sign In Now' : 'Create Free Account'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          {authModalMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                onClick={() => openAuthModal('register')}
                className="font-bold text-indigo-600 hover:underline"
              >
                Register here
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => openAuthModal('login')}
                className="font-bold text-indigo-600 hover:underline"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
