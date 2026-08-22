import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  MessageSquare,
  Bot,
  X,
  Send,
  Sparkles,
  ShoppingBag,
  Tag,
  Truck,
  ArrowRight,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  recommendedProducts?: string[]; // Product IDs
}

export const AiAssistant: React.FC = () => {
  const { products, setSelectedProductModal, applyCoupon, setActiveTab } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'bot',
      text: 'Hello! I am your ShopVerse AI Shopping Assistant. Ask me to find trending beauty products, compare smartphones, recommend gifts, or look up promo coupons!'
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputVal.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      generateBotReply(query);
      setIsTyping(false);
    }, 700);
  };

  const generateBotReply = (queryText: string) => {
    const q = queryText.toLowerCase();
    let replyText = '';
    let recIds: string[] = [];

    if (q.includes('makeup') || q.includes('beauty') || q.includes('cosmetic') || q.includes('skin')) {
      replyText = 'Here are our highest-rated skincare and beauty picks crafted with organic ingredients:';
      recIds = ['prod_1', 'prod_8'];
    } else if (q.includes('phone') || q.includes('tech') || q.includes('smartphone') || q.includes('audio') || q.includes('headphone')) {
      replyText = 'Check out these top-tier tech items equipped with cutting-edge specs and high endurance:';
      recIds = ['prod_2', 'prod_6'];
    } else if (q.includes('chair') || q.includes('furniture') || q.includes('decor') || q.includes('leather')) {
      replyText = 'Here are our finest Scandinavian oak furniture and artisan leather pieces:';
      recIds = ['prod_3', 'prod_7'];
    } else if (q.includes('coupon') || q.includes('promo') || q.includes('discount') || q.includes('code') || q.includes('offer')) {
      replyText = '🎟️ Active Discount Codes for you:\n\n1. **SAVE20** - 20% off all orders (min $40)\n2. **WELCOME10** - 10% off for newcomers\n3. **FLASH50** - 50% VIP flash sale voucher on orders $150+';
    } else if (q.includes('shipping') || q.includes('delivery') || q.includes('return')) {
      replyText = '🚚 Shipping & Return Policy:\n\n• Standard delivery: 3-5 business days (FREE on orders $50+)\n• Express delivery: 1-2 business days ($25 flat)\n• Returns: 7-day free return pickup on all unused items!';
    } else if (q.includes('wallet') || q.includes('cashback') || q.includes('reward')) {
      replyText = '💳 ShopVerse Rewards & Wallet:\n\n• Earn 1 point for every $2 spent on checkout.\n• Redeem 100 points for a 10% coupon, or 200 points for a 20% coupon in your User Dashboard!';
    } else {
      replyText = `I found some top-rated recommendations that match your interest in "${queryText}":`;
      recIds = ['prod_1', 'prod_2', 'prod_4'];
    }

    const botMsg: ChatMessage = {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: replyText,
      recommendedProducts: recIds.length > 0 ? recIds : undefined
    };

    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AI Shopping Assistant"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[32rem] h-[32rem] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold font-['Outfit'] flex items-center gap-1.5">
                    AI Shopping Assistant <Sparkles className="w-3 h-3 text-amber-300" />
                  </h3>
                  <span className="text-[10px] text-indigo-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online &bull; Context Aware
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-100 shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommended Product Cards Carousel if any */}
                  {msg.recommendedProducts && (
                    <div className="mt-2 space-y-2 w-full max-w-[90%]">
                      {msg.recommendedProducts.map(pid => {
                        const prod = products.find(p => p.id === pid);
                        if (!prod) return null;
                        return (
                          <div
                            key={prod.id}
                            onClick={() => {
                              setSelectedProductModal(prod);
                            }}
                            className="bg-white p-2.5 rounded-xl border border-slate-200 hover:border-indigo-500 flex items-center gap-3 cursor-pointer shadow-xs transition-colors group"
                          >
                            <img
                              src={prod.thumbnail}
                              alt={prod.title}
                              className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600">{prod.title}</h5>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-extrabold text-indigo-600">${prod.price.toFixed(2)}</span>
                                <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-400" /> {prod.rating}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl rounded-bl-none border border-slate-100 w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => handleSendMessage('Recommend top makeup items')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-[11px] font-semibold text-slate-600 shrink-0 transition-colors"
              >
                💄 Skincare & Beauty
              </button>
              <button
                onClick={() => handleSendMessage('Show flagship smartphones')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-[11px] font-semibold text-slate-600 shrink-0 transition-colors"
              >
                📱 Smartphones
              </button>
              <button
                onClick={() => handleSendMessage('What promo coupons are active?')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-[11px] font-semibold text-slate-600 shrink-0 transition-colors"
              >
                🎟️ Promo Coupons
              </button>
              <button
                onClick={() => handleSendMessage('How does shipping and return work?')}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-[11px] font-semibold text-slate-600 shrink-0 transition-colors"
              >
                🚚 Delivery Times
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-100 flex gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="Ask about deals, products, tracking..."
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-hidden"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
