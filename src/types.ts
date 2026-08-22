export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase?: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  specs?: Record<string, string>;
  features?: string[];
  reviews: Review[];
  sellerName?: string;
  isApproved?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';

export interface TimelineStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: 'Card' | 'Wallet' | 'COD' | 'UPI';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  status: OrderStatus;
  timeline: TimelineStep[];
  trackingNumber: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Seller' | 'Admin';
  isVerified: boolean;
  avatar?: string;
  walletBalance: number;
  rewardPoints: number;
  addresses: Address[];
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
  minSpend: number;
  validUntil: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'Order' | 'Promotional' | 'Security' | 'Wallet';
  isRead: boolean;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
