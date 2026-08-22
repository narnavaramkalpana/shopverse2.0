import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Fingerprint,
  Smartphone,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  UserCheck,
  Building2,
  ShieldAlert,
  Laptop
} from 'lucide-react';
import { motion } from 'motion/react';

export const AuthenticationPage: React.FC = () => {
  const { setActiveTab, login, showToast } = useShop();

  const [selectedMethod, setSelectedMethod] = useState<'sso' | 'biometric' | 'otp' | 'credentials'>('credentials');
  const [selectedRole, setSelectedRole] = useState<'Customer' | 'Seller' | 'Admin'>('Customer');
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '8', '2', '', '', '']);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [ssoProvider, setSsoProvider] = useState<string | null>(null);

  // Handle Biometric Simulation
  const handleBiometricAuth = () => {
    setBiometricScanning(true);
    showToast('Scanning WebAuthn TouchID / FaceID passkey...', 'info');

    setTimeout(() => {
      setBiometricScanning(false);
      showToast('Biometric Passkey Verified! 256-bit Key accepted.', 'success');
      // Complete login with selected role
      if (selectedRole === 'Customer') {
        login('alice@example.com', 'Customer');
      } else if (selectedRole === 'Seller') {
        login('partner@shopverse.com', 'Seller');
      } else {
        login('admin@shopverse.com', 'Admin');
      }
      setActiveTab('dashboard');
    }, 1800);
  };

  // Handle SSO Simulation
  const handleSsoAuth = (provider: string) => {
    setSsoProvider(provider);
    setIsVerifying(true);
    showToast(`Connecting to ${provider} OAuth 2.0 Identity Provider...`, 'info');

    setTimeout(() => {
      setIsVerifying(false);
      setSsoProvider(null);
      showToast(`${provider} Authentication Succeeded!`, 'success');
      if (selectedRole === 'Customer') {
        login('alice@example.com', 'Customer');
      } else if (selectedRole === 'Seller') {
        login('partner@shopverse.com', 'Seller');
      } else {
        login('admin@shopverse.com', 'Admin');
      }
      setActiveTab('dashboard');
    }, 1500);
  };

  // Handle OTP Code verify
  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      showToast('One-Time Passcode verified successfully!', 'success');
      login('alice@example.com', selectedRole);
      setActiveTab('dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      
      {/* Top Workflow Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Workflow Step 2 of 4: Authentication Gateway
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Security & Authentication Gateway
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Choose your preferred authentication protocol below or proceed directly to the Login Portal (Step 3).
          </p>
        </div>

        {/* Back / Forward Actions */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('frontpage-3d')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to 3D Frontpage
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
          >
            Proceed to Login (Step 3) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: Auth Options + Security Audit Shield */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Authentication Methods (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Target Role Selector */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-indigo-600" /> Select Authentication Portal Role:
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRole('Customer')}
                className={`p-3 rounded-2xl border text-center transition-all font-semibold ${
                  selectedRole === 'Customer'
                    ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-slate-900">Shopper Buyer</div>
                <div className="text-[10px] text-slate-500 font-normal">Customer Portal</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('Seller')}
                className={`p-3 rounded-2xl border text-center transition-all font-semibold ${
                  selectedRole === 'Seller'
                    ? 'bg-purple-50 border-purple-600 text-purple-900 ring-2 ring-purple-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-slate-900">Vendor Seller</div>
                <div className="text-[10px] text-slate-500 font-normal">Merchant Hub</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('Admin')}
                className={`p-3 rounded-2xl border text-center transition-all font-semibold ${
                  selectedRole === 'Admin'
                    ? 'bg-slate-900 border-slate-900 text-white ring-2 ring-slate-900/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className={selectedRole === 'Admin' ? 'font-bold text-white' : 'font-bold text-slate-900'}>Admin Super</div>
                <div className={selectedRole === 'Admin' ? 'text-[10px] text-slate-300 font-normal' : 'text-[10px] text-slate-500 font-normal'}>Governance</div>
              </button>
            </div>
          </div>

          {/* Authentication Protocols Selection */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Choose Authentication Protocol
              </h2>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> End-to-End Encrypted
              </span>
            </div>

            {/* Protocol Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                onClick={() => setSelectedMethod('credentials')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedMethod === 'credentials'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span className="font-bold">Password Login</span>
              </button>

              <button
                onClick={() => setSelectedMethod('biometric')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedMethod === 'biometric'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Fingerprint className="w-4 h-4" />
                <span className="font-bold">Biometric Passkey</span>
              </button>

              <button
                onClick={() => setSelectedMethod('sso')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedMethod === 'sso'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="font-bold">OAuth SSO</span>
              </button>

              <button
                onClick={() => setSelectedMethod('otp')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedMethod === 'otp'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="font-bold">One-Time OTP</span>
              </button>
            </div>

            {/* Protocol View 1: Standard Password Gateway */}
            {selectedMethod === 'credentials' && (
              <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Standard Secure Credentials Sign-In</h3>
                  <p className="text-xs text-slate-600">
                    Use your registered email and password to access your personalized portal and saved cart.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('login')}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    Proceed to Login Page (Step 3) <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      login('alice@example.com', selectedRole);
                      setActiveTab('dashboard');
                    }}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 font-semibold text-xs border border-indigo-200 transition-colors"
                  >
                    Instant Demo Login as {selectedRole} &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Protocol View 2: Biometric Passkey */}
            {selectedMethod === 'biometric' && (
              <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto relative">
                  <Fingerprint className={`w-8 h-8 ${biometricScanning ? 'animate-pulse text-purple-700' : ''}`} />
                  {biometricScanning && (
                    <span className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping" />
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">FIDO2 / WebAuthn Biometric Authentication</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Authenticate using Touch ID, Face ID, or Windows Hello hardware passkey on your device.
                  </p>
                </div>

                <button
                  disabled={biometricScanning}
                  onClick={handleBiometricAuth}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-purple-600/30 inline-flex items-center gap-2 transition-all"
                >
                  {biometricScanning ? 'Scanning Biometrics...' : `Authenticate as ${selectedRole} via Biometric Passkey`}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Protocol View 3: Single Sign-On */}
            {selectedMethod === 'sso' && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Single Sign-On (OAuth 2.0 & OpenID Connect)</h3>
                  <p className="text-xs text-slate-600">
                    Connect instantly with your trusted enterprise or personal identity provider.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    disabled={isVerifying}
                    onClick={() => handleSsoAuth('Google')}
                    className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <span className="text-rose-500 font-extrabold text-sm">G</span> Continue with Google
                  </button>

                  <button
                    disabled={isVerifying}
                    onClick={() => handleSsoAuth('Apple')}
                    className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <span className="text-slate-900 font-extrabold text-sm">&#63743;</span> Continue with Apple
                  </button>

                  <button
                    disabled={isVerifying}
                    onClick={() => handleSsoAuth('GitHub')}
                    className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <Laptop className="w-4 h-4 text-slate-700" /> Continue with GitHub
                  </button>
                </div>
              </div>
            )}

            {/* Protocol View 4: OTP Verification */}
            {selectedMethod === 'otp' && (
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm">Multi-Factor One-Time Passcode (OTP)</h3>
                  <p className="text-xs text-slate-600">
                    A 6-digit verification code has been dispatched to your verified phone / email.
                  </p>
                </div>

                <div className="flex items-center gap-2 justify-center py-2">
                  {['5', '8', '2', '4', '9', '1'].map((digit, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-12 rounded-xl bg-white border-2 border-emerald-400 text-emerald-900 font-mono font-bold text-lg flex items-center justify-center shadow-xs"
                    >
                      {digit}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleVerifyOtp}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 inline-flex items-center gap-2 transition-all"
                  >
                    Verify Passcode & Enter Dashboard <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Security Health & Live Trust Metrics (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security Status
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                100% SECURE
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">TLS Encryption</span>
                <span className="font-mono text-indigo-400 font-bold">AES-256-GCM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Bot Shield (reCAPTCHA)</span>
                <span className="font-mono text-emerald-400 font-bold">Passed (Score 0.99)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Session Integrity</span>
                <span className="font-mono text-emerald-400 font-bold">Hardened JWT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Anti-Fraud Engine</span>
                <span className="font-mono text-purple-400 font-bold">Real-Time Active</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1 text-xs">
              <span className="font-bold text-white flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Fast-Track Demo
              </span>
              <p className="text-slate-400 text-[11px]">
                Want to test features quickly? You can switch directly between Buyer, Seller, and Admin roles from this gateway.
              </p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Quick Step Links</h4>
            <div className="space-y-2 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('frontpage-3d')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 flex items-center justify-between transition-colors"
              >
                <span>1. 3D Frontpage Showcase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('login')}
                className="w-full text-left p-2.5 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-between transition-colors"
              >
                <span>3. Login Portal Screen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 flex items-center justify-between transition-colors"
              >
                <span>4. Store & User Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
