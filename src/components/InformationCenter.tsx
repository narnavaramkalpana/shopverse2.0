import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  HelpCircle,
  Mail,
  Shield,
  FileText,
  RotateCcw,
  Truck,
  ChevronDown,
  Send,
  CheckCircle2,
  Info
} from 'lucide-react';

export const InformationCenter: React.FC = () => {
  const { showToast } = useShop();
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'about' | 'privacy' | 'terms' | 'shipping' | 'returns'>('faq');

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      q: 'How does 3D spatial inspection reduce my return rate?',
      a: 'ShopVerse integrates CSS 3D perspective decks with 2x magnifier zoom lenses. This allows you to inspect genuine product textures, proportions, and material finishes with optical depth before placing your order.'
    },
    {
      q: 'What are the delivery timelines and shipping thresholds?',
      a: 'Standard delivery takes 3-5 business days and is completely FREE on orders above $50. Express express air delivery takes 1-2 business days for a $25 flat rate.'
    },
    {
      q: 'How do 7-day free returns and refunds work?',
      a: 'If you are unsatisfied with an unused item, simply request a return from your User Dashboard. Our courier will pick up the parcel from your doorstep for free, and your refund will be deposited immediately into your virtual wallet or bank card.'
    },
    {
      q: 'How can I become a verified seller/merchant on ShopVerse?',
      a: 'Navigate to the Seller Inventory Portal tab in the top navigation bar. You can list new products, configure stock quantities, and view live inventory value.'
    },
    {
      q: 'How do loyalty reward points work?',
      a: 'Every time you complete a checkout, you automatically earn 1 point for every $2 spent. You can redeem 100 points for code WELCOME10 (10% off) or 200 points for code SAVE20 (20% off) inside your dashboard.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Support ticket #SV-TIC-9942 created! Our customer team will reply within 12 hours.', 'success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5" /> Client Support & Legal Center
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">Help Center & Knowledge Base</h1>
        <p className="text-xs text-slate-500 mt-1">Frequently asked questions, direct support desk, and legal compliance policies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Menu */}
        <div className="lg:col-span-3 space-y-1 bg-white border border-slate-200/80 rounded-3xl p-3 shadow-xs h-fit">
          <button
            onClick={() => setActiveTab('faq')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
              activeTab === 'faq' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> FAQ Knowledge Base
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
              activeTab === 'contact' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-4 h-4" /> 24/7 Support Desk
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
              activeTab === 'about' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Info className="w-4 h-4" /> About ShopVerse
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
              activeTab === 'shipping' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Truck className="w-4 h-4" /> Shipping Policy
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
              activeTab === 'returns' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="w-4 h-4" /> Returns & Refunds
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
              activeTab === 'privacy' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-4 h-4" /> Privacy Policy
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${
              activeTab === 'terms' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" /> Terms of Service
          </button>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-9 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          
          {/* FAQ TAB */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Frequently Asked Questions</h3>
                <p className="text-xs text-slate-500">Quick answers to common questions about orders, payments, and 3D visualizers.</p>
              </div>

              <div className="space-y-3">
                {FAQS.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-100 transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Contact 24/7 Support Desk</h3>
                <p className="text-xs text-slate-500">Have inquiries about delayed shipments, vendor onboarding, or payments? Send us a message.</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Subject Inquiry</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Shipment status inquiry #SV-91823"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Please provide order number or merchant details..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Support Ticket
                </button>
              </form>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">About ShopVerse</h3>
              <p>
                Founded in 2026, <strong>ShopVerse</strong> is an integrated next-generation e-commerce ecosystem designed to eliminate online retail friction. By combining real-time spatial CSS 3D perspective decks, high-fidelity magnifier zoom inspection, and conversational AI recommendation agents, we give shoppers complete physical confidence in their purchases.
              </p>
              <p>
                We bridge global vendors with discerning customers by providing transparent multi-stage delivery milestone tracking, zero-fee virtual wallets, and gamified loyalty cashback engines.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-lg font-extrabold text-indigo-600 font-['Outfit'] block">150+</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Countries Delivered</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-lg font-extrabold text-emerald-600 font-['Outfit'] block">99.8%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">On-Time Courier SLA</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-lg font-extrabold text-purple-600 font-['Outfit'] block">38%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Lower Return Rates</span>
                </div>
              </div>
            </div>
          )}

          {/* SHIPPING TAB */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Global Shipping & Delivery Terms</h3>
              <p>
                Orders are processed and dispatched within 24 hours from verified warehouse hubs. Once dispatched, a live tracking code (e.g. <code>SV-EXP-88194</code>) is generated and viewable in your User Dashboard.
              </p>
              <h4 className="font-bold text-slate-900 pt-2">Shipping Rates:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Standard Ground (3-5 Days):</strong> Free for orders &gt; $50.00 ($10 for orders under $50.00).</li>
                <li><strong>Express Air (1-2 Days):</strong> $25.00 flat priority courier rate.</li>
              </ul>
            </div>
          )}

          {/* RETURNS TAB */}
          {activeTab === 'returns' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">7-Day Free Returns & Instant Wallet Refunds</h3>
              <p>
                If any product does not meet expectations, you have a full 7 calendar days to request a free courier return directly through your Order History dashboard.
              </p>
              <p>
                Once handed to the courier, refunds are settled immediately into your <strong>ShopVerse Virtual Wallet</strong> for 1-click use, or reversed to the source credit card in 3-5 banking days.
              </p>
            </div>
          )}

          {/* PRIVACY TAB */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Privacy Policy & Data Security</h3>
              <p>
                We do not sell your personal data. Address details, contact telephone numbers, and email accounts are strictly used for logistics fulfillment and authorized transaction alerts.
              </p>
              <p>
                All payment operations utilize industry-standard 256-bit SSL encryption and tokenized payment gateways. Credit card credentials are never stored unencrypted.
              </p>
            </div>
          )}

          {/* TERMS TAB */}
          {activeTab === 'terms' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Terms of Service</h3>
              <p>
                By using ShopVerse, you agree to fair usage of promo codes, authentic review postings, and lawful vendor catalog submissions. Suspicious merchant listings are subject to immediate admin suspension.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
