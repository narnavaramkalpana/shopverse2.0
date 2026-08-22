import { Product, User, Coupon, NotificationItem, Order } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_customer_1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    role: 'Customer',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    walletBalance: 150.00,
    rewardPoints: 240,
    addresses: [
      {
        id: 'addr_1',
        fullName: 'Alice Smith',
        phoneNumber: '+1 (555) 234-5678',
        streetAddress: '742 Evergreen Terrace, Apt 4B',
        city: 'Springfield',
        state: 'OR',
        postalCode: '97477',
        country: 'United States',
        isDefault: true
      }
    ],
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'usr_seller_1',
    name: 'Bob Johnson',
    email: 'partner@shopverse.com',
    role: 'Seller',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    walletBalance: 3200.00,
    rewardPoints: 110,
    addresses: [],
    createdAt: '2026-02-01T08:30:00Z'
  },
  {
    id: 'usr_admin_1',
    name: 'Admin Supervisor',
    email: 'admin@shopverse.com',
    role: 'Admin',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    walletBalance: 10000.00,
    rewardPoints: 500,
    addresses: [],
    createdAt: '2026-01-01T00:00:00Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'SAVE20',
    discountPercentage: 20,
    description: 'Get 20% off on your entire shopping cart',
    minSpend: 40,
    validUntil: '2026-12-31'
  },
  {
    code: 'WELCOME10',
    discountPercentage: 10,
    description: '10% discount for first-time shoppers',
    minSpend: 20,
    validUntil: '2026-12-31'
  },
  {
    code: 'FLASH50',
    discountPercentage: 50,
    description: 'Flash sale half-price voucher (VIP Exclusive)',
    minSpend: 150,
    validUntil: '2026-09-30'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: 'Glam Palette Face & Glow Kit',
    description: 'Ultra-pigmented multi-shade contour, blush, and highlighter makeup palette crafted with nourishing vitamin E and organic mineral pigments for 24-hour radiant wear.',
    price: 29.90,
    discountPercentage: 15,
    rating: 4.85,
    stock: 45,
    brand: 'ShopVerse Beauty',
    category: 'beauty',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Skin Type': 'All Skin Types',
      'Finish': 'Satin & Luminescent Glow',
      'Cruelty Free': 'Yes (Leaping Bunny Certified)',
      'Net Weight': '28g (0.98 oz)'
    },
    features: [
      'Velvety smooth micro-fine blendable powder formula',
      'Zero fallout and crease-resistant for 24 hours',
      'Includes built-in HD mirror and dual applicator brush'
    ],
    reviews: [
      {
        id: 'rev_101',
        userName: 'Sophia Martinez',
        rating: 5,
        comment: 'Absolutely in love with the highlighter tones! Looks natural in daylight.',
        date: '2026-07-14',
        verifiedPurchase: true
      },
      {
        id: 'rev_102',
        userName: 'Emma Watson',
        rating: 4.7,
        comment: 'High quality packaging and very pigmented shades. Highly recommend.',
        date: '2026-07-28',
        verifiedPurchase: true
      }
    ],
    sellerName: 'Bob Tech & Cosmetics',
    isApproved: true,
    createdAt: '2026-05-10T12:00:00Z'
  },
  {
    id: 'prod_2',
    title: 'Galaxy Z Fold Max 5G (512GB)',
    description: 'Next-generation folding AMOLED display with 144Hz dynamic refresh rate, titanium frame, Snapdragon 8 Gen 4 AI engine, and dual studio-grade cameras.',
    price: 899.00,
    discountPercentage: 10,
    rating: 4.92,
    stock: 18,
    brand: 'ShopVerse Devices',
    category: 'smartphones',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Screen': '7.6-inch Foldable Dynamic AMOLED 2X',
      'Storage': '512GB UFS 4.0',
      'RAM': '16GB LPDDR5X',
      'Battery': '5000mAh with 65W Fast Charging',
      'Connectivity': '5G Ultra, Wi-Fi 7, Bluetooth 5.4'
    },
    features: [
      'Flex Mode multi-tasking allows 3 apps simultaneously',
      'Armor Aluminum frame with IP68 water resistance',
      'AI live audio transcription & photo remastering'
    ],
    reviews: [
      {
        id: 'rev_201',
        userName: 'David Miller',
        rating: 5,
        comment: 'The folding crease is practically invisible. Battery easily lasts 2 full days.',
        date: '2026-08-02',
        verifiedPurchase: true
      }
    ],
    sellerName: 'Silicon Global Direct',
    isApproved: true,
    createdAt: '2026-06-01T09:00:00Z'
  },
  {
    id: 'prod_3',
    title: 'Minimalist Ergonomic Lounge Chair',
    description: 'Crafted with genuine Scandinavian solid oak wood and high-resilience memory foam cushions upholstered in stain-resistant textured linen weave.',
    price: 149.00,
    discountPercentage: 20,
    rating: 4.78,
    stock: 12,
    brand: 'ShopVerse Decor',
    category: 'furniture',
    thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580481077194-07301c238b72?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Material': 'Solid Oak & Linen Weave',
      'Weight Capacity': '350 lbs (158 kg)',
      'Dimensions': '32" H x 28" W x 30" D',
      'Assembly': 'Tool-free 10-minute setup'
    },
    features: [
      'Ergonomic lumbar contoured back support',
      'Removable washable zip-cover fabrics',
      'Non-slip floor protection rubber pads included'
    ],
    reviews: [
      {
        id: 'rev_301',
        userName: 'Chloe Vance',
        rating: 5,
        comment: 'Looks identical to high-end architectural designer chairs costing $600+.',
        date: '2026-07-20',
        verifiedPurchase: true
      }
    ],
    sellerName: 'Nordic Artisan Living',
    isApproved: true,
    createdAt: '2026-04-15T14:30:00Z'
  },
  {
    id: 'prod_4',
    title: 'Eau De Parfum Mystique Noir (100ml)',
    description: 'A mesmerizing fragrance blend of Calabrian bergamot, smoked vanilla oud, and velvety Turkish rose that leaves an unforgettable sophisticated sillage.',
    price: 68.50,
    discountPercentage: 0,
    rating: 4.90,
    stock: 30,
    brand: 'Luxe Fragrance',
    category: 'fragrances',
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Concentration': 'Eau De Parfum (20% essential oils)',
      'Longevity': '12+ Hours',
      'Top Notes': 'Bergamot, Black Pepper, Pink Grapefruit',
      'Base Notes': 'Oud Wood, Amber, Bourbon Vanilla'
    },
    features: [
      'Artisanal batch distillation in Grasse, France',
      'Heavy magnetic glass bottle with gold foil atomizer',
      'Hypoallergenic and phthalate-free'
    ],
    reviews: [
      {
        id: 'rev_401',
        userName: 'Marcus Aurelius',
        rating: 5,
        comment: 'Gets compliments everywhere I go. 2 sprays last all evening.',
        date: '2026-08-10',
        verifiedPurchase: true
      }
    ],
    sellerName: 'Parisian Scent Labs',
    isApproved: true,
    createdAt: '2026-06-12T11:00:00Z'
  },
  {
    id: 'prod_5',
    title: 'Organic Cold-Pressed Olive Oil Reserve',
    description: 'Single-estate extra virgin olive oil harvested from century-old Mediterranean groves. Rich in polyphenols and healthy omega antioxidants.',
    price: 24.50,
    discountPercentage: 5,
    rating: 4.80,
    stock: 60,
    brand: 'Mediterranean Harvest',
    category: 'groceries',
    thumbnail: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Volume': '750 ml (25.4 fl oz)',
      'Acidity': '< 0.2% Ultra Low Acidity',
      'Origin': 'Peloponnese, Greece',
      'Harvest Date': 'Current Season 2026'
    },
    features: [
      'Cold extracted within 4 hours of tree harvest',
      'Dark glass UV-protective bottle preserves freshness',
      'USDA Organic & Non-GMO Verified'
    ],
    reviews: [
      {
        id: 'rev_501',
        userName: 'Elena Rostova',
        rating: 4.8,
        comment: 'Incredible peppery finish! Perfect for fresh salads and bread dipping.',
        date: '2026-07-05',
        verifiedPurchase: true
      }
    ],
    sellerName: 'Olive Valley Co.',
    isApproved: true,
    createdAt: '2026-05-18T16:00:00Z'
  },
  {
    id: 'prod_6',
    title: 'Smart Pulse ANC Wireless Headphones',
    description: 'High-fidelity lossless wireless headphones with spatial audio tracking, custom 40mm beryllium drivers, and 60-hour ultra-long battery endurance.',
    price: 189.99,
    discountPercentage: 25,
    rating: 4.88,
    stock: 22,
    brand: 'Acoustic Labs',
    category: 'smartphones',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Active Noise Cancellation': 'Hybrid 4-Mic 42dB reduction',
      'Battery Life': '60 Hours (45h with ANC enabled)',
      'Bluetooth': '5.3 with LDAC, AAC, aptX Adaptive',
      'Weight': '250 grams'
    },
    features: [
      'Adaptive Transparency mode with voice focus',
      'Plush memory foam ear cups for all-day comfort',
      'Quick charge: 10 mins gives 5 hours playtime'
    ],
    reviews: [
      {
        id: 'rev_601',
        userName: 'Alex Chen',
        rating: 5,
        comment: 'Noise cancellation easily rivals Sony and Bose at half the cost.',
        date: '2026-08-11',
        verifiedPurchase: true
      }
    ],
    sellerName: 'Bob Tech & Cosmetics',
    isApproved: true,
    createdAt: '2026-06-20T10:15:00Z'
  },
  {
    id: 'prod_7',
    title: 'Handcrafted Heritage Leather Messenger Bag',
    description: 'Full-grain vegetable-tanned Italian leather satchel featuring a padded 15.6" laptop compartment, solid brass hardware, and a lifetime stitching warranty.',
    price: 119.50,
    discountPercentage: 10,
    rating: 4.95,
    stock: 8,
    brand: 'Artisan Goods',
    category: 'furniture',
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Leather': '100% Full-Grain Waxed Cowhide',
      'Laptop Sleeve': 'Fits up to 16-inch MacBook Pro',
      'Hardware': 'Antique Solid Brass Buckles',
      'Strap': 'Adjustable Padded Shoulder Strap'
    },
    features: [
      'Develops a rich vintage patina character with age',
      'Reinforced rivet stress points and waterproof lining',
      'Rear trolley strap for attaching to rolling luggage'
    ],
    reviews: [
      {
        id: 'rev_701',
        userName: 'James Wilson',
        rating: 5,
        comment: 'The leather smells incredible and the craftsmanship is top notch.',
        date: '2026-07-29',
        verifiedPurchase: true
      }
    ],
    sellerName: 'Artisan Leatherworks',
    isApproved: true,
    createdAt: '2026-05-25T15:00:00Z'
  },
  {
    id: 'prod_8',
    title: 'Botanical Hydrating Facial Cleanser & Serum',
    description: 'Dermatologist-formulated gentle foaming cleanser with hyaluronic acid, niacinamide, and green tea extract for deep pore purification without stripping moisture.',
    price: 22.00,
    discountPercentage: 0,
    rating: 4.75,
    stock: 50,
    brand: 'ShopVerse Beauty',
    category: 'beauty',
    thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Skin Concerns': 'Dryness, Dullness, Redness',
      'Key Actives': '2% Niacinamide, Triple Molecular HA',
      'pH Balance': '5.5 Skin-identical pH',
      'Volume': '200 ml / 6.7 fl oz'
    },
    features: [
      'Sulfate-free, fragrance-free, paraben-free',
      'Soothes sensitive skin barrier with centella asiatica',
      'Eco-friendly recyclable bottle packaging'
    ],
    reviews: [
      {
        id: 'rev_801',
        userName: 'Hannah Scott',
        rating: 4.6,
        comment: 'Leaves my face silky smooth and does not sting sensitive skin.',
        date: '2026-08-01',
        verifiedPurchase: true
      }
    ],
    sellerName: 'Bob Tech & Cosmetics',
    isApproved: true,
    createdAt: '2026-06-15T09:30:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_91823',
    orderNumber: 'SV-91823-2026',
    createdAt: '2026-08-18T14:20:00Z',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1
      }
    ],
    shippingAddress: {
      id: 'addr_1',
      fullName: 'Alice Smith',
      phoneNumber: '+1 (555) 234-5678',
      streetAddress: '742 Evergreen Terrace, Apt 4B',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
      country: 'United States',
      isDefault: true
    },
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    subtotal: 98.40,
    discountAmount: 19.68,
    couponCode: 'SAVE20',
    shippingFee: 0,
    taxAmount: 14.17,
    totalAmount: 92.89,
    status: 'Shipped',
    timeline: [
      {
        title: 'Order Placed & Confirmed',
        description: 'Payment authorized successfully. Invoice generated.',
        timestamp: '2026-08-18T14:20:00Z',
        completed: true
      },
      {
        title: 'Processing at Fulfillment Hub',
        description: 'Items packed in eco-friendly protective parcel.',
        timestamp: '2026-08-19T09:15:00Z',
        completed: true
      },
      {
        title: 'Dispatched with Express Courier',
        description: 'Tracking number SV-EXP-88194 assigned to FedEx.',
        timestamp: '2026-08-20T11:40:00Z',
        completed: true
      },
      {
        title: 'Out for Final Delivery',
        description: 'Driver on route to local address.',
        timestamp: '2026-08-22T08:00:00Z',
        completed: false
      }
    ],
    trackingNumber: 'SV-EXP-88194'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Order Dispatched #SV-91823',
    message: 'Your order has been handed over to our express courier for delivery.',
    type: 'Order',
    isRead: false,
    createdAt: '2026-08-20T11:40:00Z'
  },
  {
    id: 'notif_2',
    title: 'Flash Sale Alert! ⚡',
    message: 'Use promo code FLASH50 on orders above $150 this weekend only.',
    type: 'Promotional',
    isRead: false,
    createdAt: '2026-08-21T09:00:00Z'
  },
  {
    id: 'notif_3',
    title: 'Wallet Cashback Credited',
    message: '$15.00 loyalty cash has been deposited into your ShopVerse Wallet.',
    type: 'Wallet',
    isRead: true,
    createdAt: '2026-08-15T16:20:00Z'
  }
];

export const CATEGORIES_LIST = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'beauty', name: 'Beauty & Skincare', icon: 'Heart' },
  { id: 'smartphones', name: 'Smartphones & Tech', icon: 'Smartphone' },
  { id: 'furniture', name: 'Furniture & Decor', icon: 'Armchair' },
  { id: 'fragrances', name: 'Fragrances & Scents', icon: 'Flame' },
  { id: 'groceries', name: 'Organic Groceries', icon: 'Apple' }
];
