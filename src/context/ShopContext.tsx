import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  User,
  Coupon,
  NotificationItem,
  ToastMessage,
  Address,
  OrderStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_USERS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  orders: Order[];
  currentUser: User | null;
  users: User[];
  notifications: NotificationItem[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  activeTab: 'frontpage-3d' | 'auth-gateway' | 'login' | 'dashboard' | 'store' | '3d-showcase' | 'cart' | 'seller' | 'admin' | 'info' | 'real-world';
  selectedCategory: string;
  searchQuery: string;
  selectedBrand: string;
  sortBy: string;
  priceRange: [number, number];
  selectedProductModal: Product | null;
  isCheckoutModalOpen: boolean;
  isCompareModalOpen: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  toasts: ToastMessage[];
  
  setActiveTab: (tab: 'frontpage-3d' | 'auth-gateway' | 'login' | 'dashboard' | 'store' | '3d-showcase' | 'cart' | 'seller' | 'admin' | 'info' | 'real-world') => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  setSelectedBrand: (brand: string) => void;
  setSortBy: (sort: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSelectedProductModal: (product: Product | null) => void;
  setIsCheckoutModalOpen: (open: boolean) => void;
  setIsCompareModalOpen: (open: boolean) => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  updateCartQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  placeOrder: (shippingAddress: Address, paymentMethod: 'Card' | 'Wallet' | 'COD' | 'UPI') => Order | null;
  advanceOrderStatus: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  returnOrder: (orderId: string) => void;
  addReview: (productId: string, rating: number, comment: string) => void;
  depositWalletFunds: (amount: number) => void;
  redeemRewards: (points: number, rewardTitle: string, couponCode: string) => boolean;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (addressId: string) => void;
  updateUserProfile: (name: string, avatar?: string) => void;
  login: (email: string, role?: 'Customer' | 'Seller' | 'Admin') => boolean;
  register: (name: string, email: string, role?: 'Customer' | 'Seller' | 'Admin') => boolean;
  logout: () => void;
  addProduct: (productData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  toggleUserBlock: (userId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or default
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shopverse_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shopverse_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[3], quantity: 1 }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('shopverse_wishlist');
    return saved ? JSON.parse(saved) : ['prod_1', 'prod_6'];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('shopverse_compare');
    return saved ? JSON.parse(saved) : ['prod_1', 'prod_2'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shopverse_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('shopverse_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shopverse_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('shopverse_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(INITIAL_COUPONS[0]);

  // UI state
  const [activeTab, setActiveTab] = useState<'frontpage-3d' | 'auth-gateway' | 'login' | 'dashboard' | 'store' | '3d-showcase' | 'cart' | 'seller' | 'admin' | 'info' | 'real-world'>('frontpage-3d');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('shopverse_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shopverse_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopverse_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('shopverse_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('shopverse_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopverse_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('shopverse_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('shopverse_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    const newToast: ToastMessage = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor }];
    });
    showToast(`Added "${product.title}" to your cart!`, 'success');
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const title = product ? product.title : 'Product';

    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast(`Removed "${title}" from wishlist.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Added "${title}" to your wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from comparison.', 'info');
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        showToast('You can compare a maximum of 3 products at a time.', 'error');
        return prev;
      }
      showToast('Added to comparison deck!', 'success');
      return [...prev, productId];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
    showToast('Removed from comparison.', 'info');
  };

  const applyCoupon = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      showToast(`Promo code ${found.code} applied! Saved ${found.discountPercentage}%.`, 'success');
      return true;
    }
    showToast('Invalid promo code.', 'error');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  const placeOrder = (shippingAddress: Address, paymentMethod: 'Card' | 'Wallet' | 'COD' | 'UPI'): Order | null => {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty!', 'error');
      return null;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
    const shippingFee = subtotal > 50 ? 0 : 10;
    const taxAmount = (subtotal - discountAmount) * 0.18;
    const totalAmount = subtotal - discountAmount + shippingFee + taxAmount;

    // Check wallet balance if paymentMethod is Wallet
    if (paymentMethod === 'Wallet') {
      if (!currentUser || currentUser.walletBalance < totalAmount) {
        showToast('Insufficient wallet balance. Please load cash or choose card.', 'error');
        return null;
      }
      // Deduct from wallet
      setCurrentUser(prev => prev ? { ...prev, walletBalance: prev.walletBalance - totalAmount } : null);
    }

    const orderNumber = `SV-${Math.floor(10000 + Math.random() * 90000)}-${new Date().getFullYear()}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...cart],
      shippingAddress,
      paymentMethod,
      paymentStatus: 'Paid',
      subtotal,
      discountAmount,
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      shippingFee,
      taxAmount,
      totalAmount,
      status: 'Placed',
      timeline: [
        {
          title: 'Order Placed & Confirmed',
          description: `Payment authorized via ${paymentMethod}. Order received by fulfillment team.`,
          timestamp: new Date().toISOString(),
          completed: true
        },
        {
          title: 'Processing at Warehouse',
          description: 'Goods undergoing safety QA inspection and parceling.',
          timestamp: 'Estimated: Today',
          completed: false
        },
        {
          title: 'Dispatched with Courier',
          description: 'Handover to express ground logistics.',
          timestamp: 'Estimated: Next Business Day',
          completed: false
        },
        {
          title: 'Delivered',
          description: 'Package delivered to recipient doorstep.',
          timestamp: 'Estimated: 3-5 Business Days',
          completed: false
        }
      ],
      trackingNumber: `SV-TRK-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders(prev => [newOrder, ...prev]);

    // Give reward points (1 point for every $2 spent)
    const earnedPoints = Math.floor(totalAmount / 2);
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, rewardPoints: prev.rewardPoints + earnedPoints } : null);
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: `Order Confirmed #${orderNumber}`,
      message: `Your order of ${cart.length} item(s) for $${totalAmount.toFixed(2)} was placed successfully.`,
      type: 'Order',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    clearCart();
    showToast(`Order #${orderNumber} placed successfully! Earned +${earnedPoints} Reward Points.`, 'success');
    return newOrder;
  };

  const advanceOrderStatus = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          let nextStatus: OrderStatus = ord.status;
          const updatedTimeline = ord.timeline.map(step => ({ ...step }));

          if (ord.status === 'Placed') {
            nextStatus = 'Processing';
            if (updatedTimeline[1]) {
              updatedTimeline[1].completed = true;
              updatedTimeline[1].timestamp = new Date().toISOString();
            }
          } else if (ord.status === 'Processing') {
            nextStatus = 'Shipped';
            if (updatedTimeline[2]) {
              updatedTimeline[2].completed = true;
              updatedTimeline[2].timestamp = new Date().toISOString();
            }
          } else if (ord.status === 'Shipped') {
            nextStatus = 'Delivered';
            if (updatedTimeline[3]) {
              updatedTimeline[3].completed = true;
              updatedTimeline[3].timestamp = new Date().toISOString();
            }
          } else {
            showToast('Order is already in final delivered state.', 'info');
            return ord;
          }

          showToast(`Order status updated to "${nextStatus}"!`, 'success');
          return {
            ...ord,
            status: nextStatus,
            timeline: updatedTimeline
          };
        }
        return ord;
      })
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          // Refund to wallet
          if (currentUser) {
            setCurrentUser(u => u ? { ...u, walletBalance: u.walletBalance + ord.totalAmount } : null);
          }
          showToast(`Order #${ord.orderNumber} cancelled. Refund credited to your wallet!`, 'info');
          return {
            ...ord,
            status: 'Cancelled' as OrderStatus,
            paymentStatus: 'Refunded'
          };
        }
        return ord;
      })
    );
  };

  const returnOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          showToast(`7-Day Return initiated for Order #${ord.orderNumber}. Courier pickup scheduled!`, 'success');
          return {
            ...ord,
            status: 'Returned' as OrderStatus,
            paymentStatus: 'Refunded'
          };
        }
        return ord;
      })
    );
  };

  const addReview = (productId: string, rating: number, comment: string) => {
    const author = currentUser ? currentUser.name : 'Verified Customer';
    const newRev = {
      id: `rev_${Date.now()}`,
      userName: author,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true
    };

    setProducts(prev =>
      prev.map(prod => {
        if (prod.id === productId) {
          const updatedRev = [newRev, ...prod.reviews];
          const newAvgRating = updatedRev.reduce((sum, r) => sum + r.rating, 0) / updatedRev.length;
          return {
            ...prod,
            reviews: updatedRev,
            rating: Number(newAvgRating.toFixed(2))
          };
        }
        return prod;
      })
    );

    if (selectedProductModal && selectedProductModal.id === productId) {
      setSelectedProductModal(prev => prev ? {
        ...prev,
        reviews: [newRev, ...prev.reviews],
        rating: Number(((prev.reviews.reduce((s, r) => s + r.rating, 0) + rating) / (prev.reviews.length + 1)).toFixed(2))
      } : null);
    }

    showToast('Your customer review was posted successfully!', 'success');
  };

  const depositWalletFunds = (amount: number) => {
    if (amount <= 0) return;
    setCurrentUser(prev => prev ? { ...prev, walletBalance: prev.walletBalance + amount } : null);
    showToast(`$${amount.toFixed(2)} loaded successfully to your virtual wallet!`, 'success');
  };

  const redeemRewards = (points: number, rewardTitle: string, couponCode: string) => {
    if (!currentUser || currentUser.rewardPoints < points) {
      showToast('Insufficient loyalty reward points.', 'error');
      return false;
    }
    setCurrentUser(prev => prev ? { ...prev, rewardPoints: prev.rewardPoints - points } : null);
    applyCoupon(couponCode);
    showToast(`Redeemed ${points} points for "${rewardTitle}"! Coupon code ${couponCode} applied to cart.`, 'success');
    return true;
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...address,
      id: `addr_${Date.now()}`
    };
    if (currentUser) {
      setCurrentUser(prev => prev ? {
        ...prev,
        addresses: [...prev.addresses, newAddr]
      } : null);
    }
    showToast('New shipping address saved!', 'success');
  };

  const deleteAddress = (addressId: string) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? {
        ...prev,
        addresses: prev.addresses.filter(a => a.id !== addressId)
      } : null);
    }
    showToast('Address removed.', 'info');
  };

  const updateUserProfile = (name: string, avatar?: string) => {
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, name, avatar: avatar || prev.avatar } : null);
      showToast('Profile details updated successfully!', 'success');
    }
  };

  const login = (email: string, role: 'Customer' | 'Seller' | 'Admin' = 'Customer') => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (!existing.isVerified) {
        showToast('This user account has been suspended by the platform admin.', 'error');
        return false;
      }
      setCurrentUser(existing);
      showToast(`Welcome back, ${existing.name}! (${existing.role} Portal)`, 'success');
      closeAuthModal();
      return true;
    }

    // Quick demo login creation
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      walletBalance: 100.00,
      rewardPoints: 50,
      addresses: [],
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Welcome to ShopVerse, ${newUser.name}!`, 'success');
    closeAuthModal();
    return true;
  };

  const register = (name: string, email: string, role: 'Customer' | 'Seller' | 'Admin' = 'Customer') => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      walletBalance: 50.00, // Welcome gift
      rewardPoints: 100, // Welcome bonus points
      addresses: [],
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account registered! You received a $50.00 welcome wallet credit.`, 'success');
    closeAuthModal();
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of ShopVerse session.', 'info');
  };

  const addProduct = (productData: Partial<Product>) => {
    const newProd: Product = {
      id: `prod_${Date.now()}`,
      title: productData.title || 'Untitled Product',
      description: productData.description || 'No description provided.',
      price: productData.price || 49.99,
      discountPercentage: productData.discountPercentage || 0,
      rating: 5.0,
      stock: productData.stock || 20,
      brand: productData.brand || 'ShopVerse Partner',
      category: productData.category || 'beauty',
      thumbnail: productData.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
      images: [productData.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'],
      specs: productData.specs || { 'Condition': 'Brand New Factory Sealed' },
      features: productData.features || ['Manufacturer authentic certified warranty'],
      reviews: [],
      sellerName: currentUser ? currentUser.name : 'Bob Tech Store',
      isApproved: true,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.title}" listed to live store catalog!`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product listing removed.', 'info');
  };

  const toggleUserBlock = (userId: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const updatedState = !u.isVerified;
          showToast(`User ${u.name} is now ${updatedState ? 'Active' : 'Blocked'}.`, 'info');
          return { ...u, isVerified: updatedState };
        }
        return u;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read.', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        compareList,
        orders,
        currentUser,
        users,
        notifications,
        coupons,
        appliedCoupon,
        activeTab,
        selectedCategory,
        searchQuery,
        selectedBrand,
        sortBy,
        priceRange,
        selectedProductModal,
        isCheckoutModalOpen,
        isCompareModalOpen,
        isAuthModalOpen,
        authModalMode,
        toasts,
        setActiveTab,
        setSelectedCategory,
        setSearchQuery,
        setSelectedBrand,
        setSortBy,
        setPriceRange,
        setSelectedProductModal,
        setIsCheckoutModalOpen,
        setIsCompareModalOpen,
        openAuthModal,
        closeAuthModal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        toggleWishlist,
        toggleCompare,
        removeFromCompare,
        applyCoupon,
        removeCoupon,
        placeOrder,
        advanceOrderStatus,
        cancelOrder,
        returnOrder,
        addReview,
        depositWalletFunds,
        redeemRewards,
        addAddress,
        deleteAddress,
        updateUserProfile,
        login,
        register,
        logout,
        addProduct,
        deleteProduct,
        toggleUserBlock,
        markNotificationRead,
        markAllNotificationsRead,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
