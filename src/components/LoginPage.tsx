import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  LogIn,
  Lock,
  Mail,
  User as UserIcon,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  KeyRound,
  Store,
  Crown
} from 'lucide-react';
import { motion } from 'motion/react';

export const LoginPage: React.FC = () => {
  const { setActiveTab, login, register, showToast, currentUser } = useShop();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('alice@example.com');
  const [password, setPassword] = useState('ShopVerse@2025');
  const [name, setName] = useState('Alice Johnson');
  const [role, setRole] = useState<'Customer' | 'Seller' | 'Admin'>('Customer');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

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
    if (mode === 'login') {
      const success = login(email, role);
      if (success) {
        setActiveTab('dashboard');
      }
    } else {
      const success = register(name || email.split('@')[0], email, role);
      if (success) {
        setActiveTab('dashboard');
      }
    }
  };

  const handleDemoPreset = (presetEmail: string, presetName: string, presetRole: 'Customer' | 'Seller' | 'Admin') => {
    setEmail(presetEmail);
    setName(presetName);
    setRole(presetRole);
    login(presetEmail, presetRole);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 py-4 sm:py-8">
      
      {/* Workflow Navigation Header */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1">
            <LogIn className="w-3.5 h-3.5" />
            Workflow Step 3 of 4: Login Portal
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
            {mode === 'login' ? 'Account Sign-In' : 'Register New Account'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('auth-gateway')}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Back to Step 2: Authentication"
          >
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Step 2 Auth</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-3.5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1 transition-colors"
            title="Skip directly to Dashboard"
          >
            <span className="hidden sm:inline">Dashboard</span> <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
        
        {/* Fast 1-Click Demo Profiles */}
        <div className="p-4 bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-pink-50/80 rounded-2xl border border-indigo-100/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> One-Click Quick Sign-In:
            </span>
            <span className="text-[10px] text-indigo-600 font-medium">Instant Workflow Access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoPreset('alice@example.com', 'Alice Johnson', 'Customer')}
              className="p-2.5 bg-white text-indigo-900 rounded-xl border border-indigo-200/80 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white transition-all shadow-xs flex items-center justify-center gap-1.5 font-bold group"
            >
              <UserIcon className="w-3.5 h-3.5 text-indigo-500 group-hover:text-white" />
              <span>Buyer (Alice)</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoPreset('partner@shopverse.com', 'Bob Martinez', 'Seller')}
              className="p-2.5 bg-white text-purple-900 rounded-xl border border-purple-200/80 hover:border-purple-500 hover:bg-purple-600 hover:text-white transition-all shadow-xs flex items-center justify-center gap-1.5 font-bold group"
            >
              <Store className="w-3.5 h-3.5 text-purple-500 group-hover:text-white" />
              <span>Vendor (Bob)</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoPreset('admin@shopverse.com', 'Admin Supervisor', 'Admin')}
              className="p-2.5 bg-white text-slate-900 rounded-xl border border-slate-300 hover:border-slate-800 hover:bg-slate-900 hover:text-white transition-all shadow-xs flex items-center justify-center gap-1.5 font-bold group"
            >
              <Crown className="w-3.5 h-3.5 text-amber-500 group-hover:text-white" />
              <span>Platform Admin</span>
            </button>
          </div>
        </div>

        {/* Tab switch between Sign In and Register */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In with Existing Account
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Register New Account ($50 Bonus)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alice Johnson"
                  className="w-full text-xs pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-hidden transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="yourname@example.com"
                className="w-full text-xs pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-hidden transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to demo email.', 'info')}
                  className="text-[11px] font-semibold text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-hidden transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
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
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Security Score: {strength >= 4 ? 'Very Strong (256-bit safe)' : strength >= 2 ? 'Moderate' : 'Basic'}</span>
                  <span>{password.length} characters</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Account Role & Portal Access</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as any)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden cursor-pointer"
            >
              <option value="Customer">Customer (Store Buyer & Orders)</option>
              <option value="Seller">Seller (Vendor Hub & Inventory)</option>
              <option value="Admin">Admin (Platform Governance & Analytics)</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-md text-indigo-600 focus:ring-indigo-500"
              />
              <span>Remember this session on this device</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
          >
            {mode === 'login' ? 'Sign In & Enter Dashboard (Step 4)' : 'Create Free Account & Enter Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          <p className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Protected by SSL 256-bit encryption and zero-knowledge token vaults.
          </p>
        </div>

      </div>

    </div>
  );
};
