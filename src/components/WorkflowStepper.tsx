import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ShieldCheck, LogIn, LayoutDashboard, ChevronRight, Check } from 'lucide-react';

export const WorkflowStepper: React.FC = () => {
  const { activeTab, setActiveTab, currentUser } = useShop();

  const steps = [
    {
      id: 'frontpage-3d',
      number: 1,
      label: '3D Frontpage',
      sublabel: 'Spatial 3D Design & Showcase',
      icon: Sparkles,
      color: 'indigo'
    },
    {
      id: 'auth-gateway',
      number: 2,
      label: 'Authentication',
      sublabel: 'Security & Verification Gateway',
      icon: ShieldCheck,
      color: 'purple'
    },
    {
      id: 'login',
      number: 3,
      label: 'Login Portal',
      sublabel: 'Role & Credential Sign-In',
      icon: LogIn,
      color: 'blue'
    },
    {
      id: 'dashboard',
      number: 4,
      label: 'Dashboard & Store',
      sublabel: 'Orders, Catalog, Vendor & Admin',
      icon: LayoutDashboard,
      color: 'emerald'
    }
  ];

  // Map other tabs to their corresponding workflow step for highlighting
  const getActiveStepIndex = () => {
    if (activeTab === 'frontpage-3d') return 0;
    if (activeTab === 'auth-gateway') return 1;
    if (activeTab === 'login') return 2;
    // For dashboard, store, seller, admin, info, real-world, cart:
    return 3;
  };

  const activeIndex = getActiveStepIndex();

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          
          {/* Left badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
              Workflow Guide
            </span>
            <span className="text-xs text-slate-400 hidden lg:inline">
              Step {activeIndex + 1} of 4:
            </span>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto justify-start sm:justify-center no-scrollbar py-0.5">
            {steps.map((step, idx) => {
              const isCurrent = activeIndex === idx;
              const isCompleted = activeIndex > idx;
              const Icon = step.icon;

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setActiveTab(step.id as any)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-white/20'
                        : isCompleted
                        ? 'bg-slate-800/80 text-emerald-400 hover:bg-slate-800 border border-slate-700/60'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-white text-indigo-900'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3 text-emerald-400" /> : step.number}
                    </div>
                    <span className="whitespace-nowrap">{step.label}</span>
                  </button>

                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right status / Quick Jump */}
          <div className="hidden xl:flex items-center gap-2 text-xs">
            {currentUser ? (
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Signed in: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
              </span>
            ) : (
              <button
                onClick={() => setActiveTab('auth-gateway')}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                Authenticate Now &rarr;
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
