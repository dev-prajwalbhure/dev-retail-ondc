// =============================================
// VALUE MARKETPLACE — COMPLETE DATA MODEL
// =============================================

// --- AUTH & USERS ---
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'superadmin' | 'tsp' | 'seller' | 'warehouse' | 'operations' | 'support' | 'customer';
  avatar?: string;
  defaultWorkspace: string;
}

export interface TeamMember {
  id: string;
  sellerId: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: 'Active' | 'Inactive';
}

// --- SELLER ---
export interface SellerProfile {
  sellerId: string;
  shopName: string;
  shopDescription: string;
  bannerUrl: string;
  logoUrl: string;
  gstNumber: string;
  panNumber: string;
  bankAccount: string;
  bankIfsc: string;
  returnPolicy: string;
  shippingPolicy: string;
  termsConditions: string;
  socialLinks: { platform: string; url: string }[];
  seoTitle: string;
  seoDescription: string;
  totalSales: number;
  totalPayout: number;
  remainingPayout: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderSell: number;
  commissionRate: number;
  status: 'Active' | 'Pending' | 'Suspended' | 'Rejected';
  joinedDate: string;
  rating: number;
  totalReviews: number;
}

// --- CATALOG ---
export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  attributes: ProductAttribute[];
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  comparePrice: number;
  stock: number;
  sku: string;
  images: string[];
  description: string;
  shortDescription: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  seoTitle: string;
  seoDescription: string;
  ondcCategory: string;
  weight: number;
  dimensions: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  source?: 'Local' | 'ONDC Network';
  ondcMetadata?: any;
}

// --- ORDERS ---
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderTimeline {
  status: string;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  sellerId: string;
  items: OrderItem[];
  grossAmount: number;
  discount: number;
  tax: number;
  shippingCost: number;
  commission: number;
  sellerEarn: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  shippingAddress: Address;
  shipmentMethod: string;
  trackingNumber: string;
  timeline: OrderTimeline[];
  ondcTransactionId: string;
  timestamp: string;
}

export interface Address {
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

// --- SHIPMENTS ---
export interface Shipment {
  id: string;
  orderId: string;
  sellerId: string;
  courier: string;
  trackingNumber: string;
  status: 'Created' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Exception';
  createdAt: string;
  estimatedDelivery: string;
}

// --- CUSTOMER ---
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
}

// --- REVIEWS ---
export interface Review {
  id: string;
  targetId: string;
  type: 'product' | 'seller';
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  timestamp: string;
}

// --- PAYOUTS ---
export interface PayoutRequest {
  id: string;
  sellerId: string;
  amount: number;
  status: 'Pending' | 'Processed' | 'Rejected';
  method: string;
  timestamp: string;
}

// --- WAREHOUSE ---
export interface Warehouse {
  id: string;
  sellerId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  phone: string;
  type: 'Fulfillment' | 'Dark Store' | 'Pickup Point';
  status: 'Active' | 'Inactive';
}

// --- WISHLIST ---
export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// --- ONDC ---
export interface OndcTransaction {
  id: string;
  orderId: string;
  action: 'search' | 'select' | 'init' | 'confirm' | 'status' | 'track' | 'update' | 'cancel' | 'support' | 'rating';
  status: 'success' | 'error' | 'pending';
  timestamp: string;
  payload: string;
  responseTime: number;
}

// --- B2B ---
export interface CorporateAccount {
  id: string;
  companyName: string;
  gstNumber: string;
  contactPerson: string;
  email: string;
  creditLimit: number;
  creditUsed: number;
  status: 'Active' | 'Pending' | 'Suspended';
}

export interface RFQ {
  id: string;
  corporateId: string;
  items: { productId: string; quantity: number; targetPrice: number }[];
  status: 'Open' | 'Quoted' | 'Accepted' | 'Rejected' | 'Expired';
  createdAt: string;
  expiresAt: string;
}

// --- COMMISSION RULES ---
export interface CommissionRule {
  id: string;
  type: 'global' | 'category' | 'seller';
  targetId: string;
  rate: number;
  label: string;
}

// --- CATEGORIES ---
export const categories = [
  { id: 'cat_1', name: 'Electronics', icon: '💻', subcategories: ['Smartphones', 'Laptops', 'Audio', 'Accessories'] },
  { id: 'cat_2', name: 'Fashion', icon: '👔', subcategories: ['Men', 'Women', 'Kids', 'Footwear'] },
  { id: 'cat_3', name: 'Groceries', icon: '🛒', subcategories: ['Staples', 'Snacks', 'Beverages', 'Organic'] },
  { id: 'cat_4', name: 'Home & Living', icon: '🏠', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bath'] },
  { id: 'cat_5', name: 'Health & Beauty', icon: '💄', subcategories: ['Skincare', 'Haircare', 'Wellness', 'Fitness'] },
  { id: 'cat_6', name: 'Books & Media', icon: '📚', subcategories: ['Fiction', 'Non-Fiction', 'Academic', 'Magazines'] },
];

// =============================================
// SEED DATA
// =============================================

export const users: User[] = [
  { id: 'u_1', name: 'Rajesh Kumar', email: 'admin@valuemarketplace.com', phone: '+91 98765 43210', role: 'superadmin', defaultWorkspace: '/admin/dashboard' },
  { id: 'u_2', name: 'Priya Sharma', email: 'tsp@valuemarketplace.com', phone: '+91 98765 43211', role: 'tsp', defaultWorkspace: '/tsp/dashboard' },
  { id: 'u_3', name: 'Alvin Joyner', email: 'seller@valuemarketplace.com', phone: '+91 98765 43212', role: 'seller', defaultWorkspace: '/seller/dashboard' },
  { id: 'u_8', name: 'Tana Hammond', email: 'seller2@valuemarketplace.com', phone: '+91 98765 43213', role: 'seller', defaultWorkspace: '/seller/dashboard' },
  { id: 'u_4', name: 'Arun Mehta', email: 'warehouse@valuemarketplace.com', phone: '+91 98765 43214', role: 'warehouse', defaultWorkspace: '/warehouse/dashboard' },
  { id: 'u_5', name: 'Neha Singh', email: 'operations@valuemarketplace.com', phone: '+91 98765 43215', role: 'operations', defaultWorkspace: '/ondc/dashboard' },
  { id: 'u_6', name: 'Vikram Patel', email: 'support@valuemarketplace.com', phone: '+91 98765 43216', role: 'support', defaultWorkspace: '/support/dashboard' },
  { id: 'u_7', name: 'Ananya Desai', email: 'customer@valuemarketplace.com', phone: '+91 98765 43217', role: 'customer', defaultWorkspace: '/store' },
  { id: 'u_9', name: 'Sanjay Gupta', email: 'customer2@valuemarketplace.com', phone: '+91 98765 43218', role: 'customer', defaultWorkspace: '/store' },
];

export const customers: Customer[] = [
  { id: 'u_7', name: 'Ananya Desai', email: 'customer@valuemarketplace.com', phone: '+91 98765 43217', location: 'Mumbai, Maharashtra', addresses: [{ name: 'Home', line1: '42, Marine Drive', line2: 'Apt 5B', city: 'Mumbai', state: 'Maharashtra', pincode: '400002', phone: '+91 98765 43217' }], totalOrders: 12, totalSpent: 15640, joinedDate: '2025-01-15' },
  { id: 'u_9', name: 'Sanjay Gupta', email: 'customer2@valuemarketplace.com', phone: '+91 98765 43218', location: 'Delhi, NCR', addresses: [{ name: 'Office', line1: '12, Connaught Place', line2: 'Block C', city: 'New Delhi', state: 'Delhi', pincode: '110001', phone: '+91 98765 43218' }], totalOrders: 5, totalSpent: 8250, joinedDate: '2025-03-22' },
];

export const sellerProfiles: SellerProfile[] = [
  {
    sellerId: 'u_3', shopName: 'TechStyle Hub', shopDescription: 'Premium electronics and lifestyle products curated for the modern Indian consumer.', bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop', logoUrl: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop', gstNumber: '29AAGCR4375J1ZK', panNumber: 'AAGCR4375J', bankAccount: '1234567890123', bankIfsc: 'HDFC0001234', returnPolicy: '15-day easy return. Items must be unused with original packaging.', shippingPolicy: 'Free shipping on orders above ₹499. Standard delivery 3-5 days.', termsConditions: 'All products are covered under manufacturer warranty.', socialLinks: [{ platform: 'Instagram', url: 'https://instagram.com/techstyle' }], seoTitle: 'TechStyle Hub - Premium Electronics', seoDescription: 'Shop premium electronics and lifestyle products.', totalSales: 654328, totalPayout: 432156, remainingPayout: 222172, totalOrders: 1284, totalCustomers: 967, averageOrderSell: 510, commissionRate: 15, status: 'Active', joinedDate: '2024-06-15', rating: 4.5, totalReviews: 234,
  },
  {
    sellerId: 'u_8', shopName: 'FreshBasket India', shopDescription: 'Farm-fresh groceries and organic essentials delivered to your doorstep.', bannerUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=300&fit=crop', logoUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=100&h=100&fit=crop', gstNumber: '27AAGCR4375J1ZL', panNumber: 'BBNPR8294K', bankAccount: '9876543210987', bankIfsc: 'SBIN0005678', returnPolicy: '24-hour return for perishable items. 7-day return for packaged goods.', shippingPolicy: 'Free delivery on orders above ₹299. Same-day delivery available in select areas.', termsConditions: 'All food items meet FSSAI standards.', socialLinks: [{ platform: 'Facebook', url: 'https://facebook.com/freshbasket' }], seoTitle: 'FreshBasket - Farm Fresh Groceries', seoDescription: 'Order fresh groceries online.', totalSales: 287400, totalPayout: 201180, remainingPayout: 86220, totalOrders: 3450, totalCustomers: 2100, averageOrderSell: 83, commissionRate: 12, status: 'Active', joinedDate: '2024-09-01', rating: 4.2, totalReviews: 567,
  },
];

export const initialProducts: Product[] = [
  // Electronics
  { id: 'p_1', sellerId: 'u_3', name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', subcategory: 'Audio', price: 4999, comparePrice: 7999, stock: 45, sku: 'TECH-AUD-001', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&fit=crop'], description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Features Bluetooth 5.2 and multipoint connection.', shortDescription: 'ANC headphones with 30hr battery', status: 'Approved', variants: [{ id: 'v_1', sku: 'TECH-AUD-001-BLK', attributes: [{ name: 'Color', value: 'Black' }], price: 4999, stock: 25 }, { id: 'v_2', sku: 'TECH-AUD-001-WHT', attributes: [{ name: 'Color', value: 'White' }], price: 4999, stock: 20 }], attributes: [{ name: 'Brand', value: 'SoundMax' }, { name: 'Connectivity', value: 'Bluetooth 5.2' }], seoTitle: 'Wireless Noise Cancelling Headphones', seoDescription: 'Premium ANC headphones', ondcCategory: 'Electronics > Audio', weight: 0.3, dimensions: '20x18x8 cm', tags: ['headphones', 'wireless', 'noise-cancelling'], rating: 4.5, reviewCount: 128, createdAt: '2025-01-10' },
  { id: 'p_2', sellerId: 'u_3', name: 'Smart Fitness Watch Pro', category: 'Electronics', subcategory: 'Accessories', price: 3499, comparePrice: 5999, stock: 80, sku: 'TECH-ACC-002', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&fit=crop'], description: 'Advanced fitness tracker with AMOLED display, heart rate monitoring, SpO2, GPS, and 14-day battery life.', shortDescription: 'Fitness watch with AMOLED & GPS', status: 'Approved', variants: [{ id: 'v_3', sku: 'TECH-ACC-002-BLK', attributes: [{ name: 'Color', value: 'Midnight Black' }], price: 3499, stock: 40 }, { id: 'v_4', sku: 'TECH-ACC-002-GRN', attributes: [{ name: 'Color', value: 'Forest Green' }], price: 3499, stock: 40 }], attributes: [{ name: 'Brand', value: 'FitPro' }, { name: 'Display', value: '1.4" AMOLED' }], seoTitle: 'Smart Fitness Watch Pro', seoDescription: 'Track fitness goals', ondcCategory: 'Electronics > Wearables', weight: 0.05, dimensions: '4.5x4.5x1.2 cm', tags: ['watch', 'fitness', 'smartwatch'], rating: 4.3, reviewCount: 89, createdAt: '2025-02-05' },
  { id: 'p_3', sellerId: 'u_3', name: 'Portable Bluetooth Speaker', category: 'Electronics', subcategory: 'Audio', price: 1999, comparePrice: 3499, stock: 150, sku: 'TECH-AUD-003', images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&fit=crop'], description: 'Waterproof portable speaker with 360° sound, 24-hour battery life, and built-in microphone.', shortDescription: 'Waterproof speaker, 24hr battery', status: 'Approved', variants: [], attributes: [{ name: 'Brand', value: 'BoomBox' }], seoTitle: 'Portable Bluetooth Speaker', seoDescription: 'Waterproof portable speaker', ondcCategory: 'Electronics > Audio', weight: 0.5, dimensions: '10x10x15 cm', tags: ['speaker', 'bluetooth', 'waterproof'], rating: 4.1, reviewCount: 56, createdAt: '2025-03-12' },
  // Fashion
  { id: 'p_4', sellerId: 'u_3', name: 'Premium Cotton Slim Fit Shirt', category: 'Fashion', subcategory: 'Men', price: 1299, comparePrice: 2499, stock: 200, sku: 'FASH-MEN-004', images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&fit=crop'], description: '100% premium cotton slim fit shirt perfect for formal and semi-formal occasions. Features wrinkle-resistant fabric.', shortDescription: 'Slim fit cotton shirt', status: 'Approved', variants: [{ id: 'v_5', sku: 'FASH-MEN-004-S', attributes: [{ name: 'Size', value: 'S' }, { name: 'Color', value: 'White' }], price: 1299, stock: 50 }, { id: 'v_6', sku: 'FASH-MEN-004-M', attributes: [{ name: 'Size', value: 'M' }, { name: 'Color', value: 'White' }], price: 1299, stock: 50 }, { id: 'v_7', sku: 'FASH-MEN-004-L', attributes: [{ name: 'Size', value: 'L' }, { name: 'Color', value: 'White' }], price: 1299, stock: 50 }, { id: 'v_8', sku: 'FASH-MEN-004-XL', attributes: [{ name: 'Size', value: 'XL' }, { name: 'Color', value: 'White' }], price: 1299, stock: 50 }], attributes: [{ name: 'Brand', value: 'UrbanThread' }, { name: 'Material', value: '100% Cotton' }], seoTitle: 'Premium Cotton Slim Fit Shirt', seoDescription: 'Buy premium cotton shirt', ondcCategory: 'Fashion > Men > Shirts', weight: 0.2, dimensions: '30x25x5 cm', tags: ['shirt', 'formal', 'cotton'], rating: 4.6, reviewCount: 312, createdAt: '2025-01-20' },
  { id: 'p_5', sellerId: 'u_8', name: 'Women\'s Running Shoes', category: 'Fashion', subcategory: 'Footwear', price: 2799, comparePrice: 4999, stock: 90, sku: 'FASH-FTW-005', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&fit=crop'], description: 'Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole.', shortDescription: 'Lightweight running shoes', status: 'Approved', variants: [{ id: 'v_9', sku: 'FASH-FTW-005-6', attributes: [{ name: 'Size', value: 'UK 6' }], price: 2799, stock: 30 }, { id: 'v_10', sku: 'FASH-FTW-005-7', attributes: [{ name: 'Size', value: 'UK 7' }], price: 2799, stock: 30 }, { id: 'v_11', sku: 'FASH-FTW-005-8', attributes: [{ name: 'Size', value: 'UK 8' }], price: 2799, stock: 30 }], attributes: [{ name: 'Brand', value: 'RunFlex' }], seoTitle: 'Women Running Shoes', seoDescription: 'Lightweight running shoes', ondcCategory: 'Fashion > Footwear', weight: 0.6, dimensions: '32x22x12 cm', tags: ['shoes', 'running', 'women'], rating: 4.4, reviewCount: 76, createdAt: '2025-02-15' },
  // Groceries
  { id: 'p_6', sellerId: 'u_8', name: 'Organic Raw Honey (500g)', category: 'Groceries', subcategory: 'Organic', price: 549, comparePrice: 799, stock: 300, sku: 'GROC-ORG-006', images: ['https://images.unsplash.com/photo-1587049352847-8d4e8941b958?w=600&fit=crop'], description: 'Pure, raw, unpasteurized organic honey sourced from Himalayan bee farms. Rich in antioxidants and natural enzymes.', shortDescription: 'Pure Himalayan organic honey', status: 'Approved', variants: [], attributes: [{ name: 'Brand', value: 'HoneyValley' }, { name: 'Weight', value: '500g' }], seoTitle: 'Organic Raw Honey', seoDescription: 'Pure organic honey from Himalayas', ondcCategory: 'Grocery > Honey', weight: 0.55, dimensions: '8x8x12 cm', tags: ['honey', 'organic', 'natural'], rating: 4.7, reviewCount: 445, createdAt: '2024-11-01' },
  { id: 'p_7', sellerId: 'u_8', name: 'Premium Basmati Rice (5kg)', category: 'Groceries', subcategory: 'Staples', price: 699, comparePrice: 899, stock: 500, sku: 'GROC-STP-007', images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&fit=crop'], description: 'Extra-long grain aged basmati rice. Perfect for biryani and pulao. Naturally aromatic with fluffy texture.', shortDescription: 'Extra-long grain basmati rice', status: 'Approved', variants: [], attributes: [{ name: 'Brand', value: 'RiceKing' }, { name: 'Weight', value: '5kg' }], seoTitle: 'Premium Basmati Rice', seoDescription: 'Aged basmati rice 5kg', ondcCategory: 'Grocery > Rice', weight: 5.0, dimensions: '40x25x10 cm', tags: ['rice', 'basmati', 'staples'], rating: 4.3, reviewCount: 234, createdAt: '2024-12-10' },
  { id: 'p_8', sellerId: 'u_8', name: 'Cold Pressed Extra Virgin Olive Oil (1L)', category: 'Groceries', subcategory: 'Organic', price: 899, comparePrice: 1299, stock: 120, sku: 'GROC-ORG-008', images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&fit=crop'], description: 'Premium cold-pressed extra virgin olive oil imported from Mediterranean farms. Ideal for cooking and salads.', shortDescription: 'Cold pressed olive oil 1L', status: 'Approved', variants: [], attributes: [{ name: 'Brand', value: 'OliveGold' }], seoTitle: 'Extra Virgin Olive Oil', seoDescription: 'Cold pressed olive oil', ondcCategory: 'Grocery > Oils', weight: 1.1, dimensions: '8x8x28 cm', tags: ['olive oil', 'organic', 'cooking'], rating: 4.5, reviewCount: 189, createdAt: '2025-01-05' },
  // Home & Living
  { id: 'p_9', sellerId: 'u_3', name: 'Ergonomic Desk Lamp with Wireless Charger', category: 'Home & Living', subcategory: 'Decor', price: 2499, comparePrice: 3999, stock: 60, sku: 'HOME-DEC-009', images: ['https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&fit=crop'], description: 'Modern LED desk lamp with adjustable brightness, color temperature control, and built-in Qi wireless charger.', shortDescription: 'LED lamp with wireless charger', status: 'Approved', variants: [], attributes: [{ name: 'Brand', value: 'LuxLight' }], seoTitle: 'Ergonomic Desk Lamp', seoDescription: 'Desk lamp with wireless charger', ondcCategory: 'Home & Living > Lighting', weight: 0.8, dimensions: '15x15x45 cm', tags: ['lamp', 'wireless charger', 'desk'], rating: 4.2, reviewCount: 67, createdAt: '2025-03-20' },
  { id: 'p_10', sellerId: 'u_3', name: 'Stainless Steel Water Bottle (750ml)', category: 'Home & Living', subcategory: 'Kitchen', price: 599, comparePrice: 999, stock: 250, sku: 'HOME-KIT-010', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&fit=crop'], description: 'Double-walled vacuum insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.', shortDescription: 'Insulated steel water bottle', status: 'Approved', variants: [], attributes: [{ name: 'Brand', value: 'HydroFlask' }], seoTitle: 'Stainless Steel Water Bottle', seoDescription: 'Insulated water bottle', ondcCategory: 'Home & Living > Kitchen', weight: 0.35, dimensions: '8x8x26 cm', tags: ['bottle', 'insulated', 'stainless'], rating: 4.6, reviewCount: 198, createdAt: '2025-02-28' },
  // Health & Beauty
  { id: 'p_11', sellerId: 'u_8', name: 'Natural Face Serum (Vitamin C + Hyaluronic)', category: 'Health & Beauty', subcategory: 'Skincare', price: 799, comparePrice: 1499, stock: 180, sku: 'HLTH-SKN-011', images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&fit=crop'], description: 'Brightening face serum with 20% Vitamin C and Hyaluronic Acid. Reduces dark spots and improves skin texture.', shortDescription: 'Vitamin C face serum', status: 'Approved', variants: [], attributes: [{ name: 'Brand', value: 'GlowNaturals' }], seoTitle: 'Vitamin C Face Serum', seoDescription: 'Natural face serum', ondcCategory: 'Health & Beauty > Skincare', weight: 0.05, dimensions: '4x4x12 cm', tags: ['serum', 'vitamin c', 'skincare'], rating: 4.4, reviewCount: 302, createdAt: '2025-01-25' },
  // Books
  { id: 'p_12', sellerId: 'u_3', name: 'The Art of Digital Commerce', category: 'Books & Media', subcategory: 'Non-Fiction', price: 399, comparePrice: 599, stock: 400, sku: 'BOOK-NF-012', images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&fit=crop'], description: 'A comprehensive guide to building and scaling digital commerce businesses in India. Covers ONDC, UPI, and modern marketplace dynamics.', shortDescription: 'Guide to digital commerce in India', status: 'Approved', variants: [], attributes: [{ name: 'Author', value: 'Dr. Vivek Nair' }, { name: 'Pages', value: '348' }], seoTitle: 'Art of Digital Commerce Book', seoDescription: 'Digital commerce guide', ondcCategory: 'Books > Business', weight: 0.4, dimensions: '22x14x2 cm', tags: ['book', 'business', 'commerce'], rating: 4.8, reviewCount: 156, createdAt: '2025-04-01' },
  // Pending products
  { id: 'p_13', sellerId: 'u_3', name: 'Wireless Charging Pad', category: 'Electronics', subcategory: 'Accessories', price: 999, comparePrice: 1999, stock: 100, sku: 'TECH-ACC-013', images: ['https://images.unsplash.com/photo-1586953208270-767889fa9b0a?w=600&fit=crop'], description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Supports up to 15W fast charging.', shortDescription: '15W fast wireless charger', status: 'Pending', variants: [], attributes: [{ name: 'Brand', value: 'ChargePro' }], seoTitle: 'Wireless Charging Pad', seoDescription: 'Fast wireless charger', ondcCategory: 'Electronics > Chargers', weight: 0.1, dimensions: '10x10x1 cm', tags: ['charger', 'wireless'], rating: 0, reviewCount: 0, createdAt: '2025-05-15' },
  { id: 'p_14', sellerId: 'u_8', name: 'Organic Green Tea (100 bags)', category: 'Groceries', subcategory: 'Beverages', price: 349, comparePrice: 499, stock: 200, sku: 'GROC-BEV-014', images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&fit=crop'], description: 'Premium organic green tea bags sourced from Darjeeling estates. Rich in antioxidants.', shortDescription: 'Organic green tea 100 bags', status: 'Pending', variants: [], attributes: [{ name: 'Brand', value: 'TeaLeaf' }], seoTitle: 'Organic Green Tea', seoDescription: 'Organic green tea bags', ondcCategory: 'Grocery > Beverages', weight: 0.2, dimensions: '15x10x8 cm', tags: ['tea', 'green tea', 'organic'], rating: 0, reviewCount: 0, createdAt: '2025-05-20' },
  // Multi-seller product (same product, different seller)
  { id: 'p_15', sellerId: 'u_8', name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', subcategory: 'Audio', price: 4799, comparePrice: 7999, stock: 30, sku: 'FB-AUD-015', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&fit=crop'], description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life. Same model, competitive pricing.', shortDescription: 'ANC headphones, best price', status: 'Approved', variants: [], attributes: [{ name: 'Brand', value: 'SoundMax' }], seoTitle: 'ANC Headphones Best Price', seoDescription: 'Best price ANC headphones', ondcCategory: 'Electronics > Audio', weight: 0.3, dimensions: '20x18x8 cm', tags: ['headphones', 'wireless', 'noise-cancelling'], rating: 4.2, reviewCount: 45, createdAt: '2025-04-10' },
];

const defaultAddress: Address = { name: 'Ananya Desai', line1: '42, Marine Drive', line2: 'Apt 5B', city: 'Mumbai', state: 'Maharashtra', pincode: '400002', phone: '+91 98765 43217' };

export const initialOrders: Order[] = [
  { id: 'ORD-2025-1001', customerId: 'u_7', customerName: 'Ananya Desai', customerEmail: 'customer@valuemarketplace.com', sellerId: 'u_3', items: [{ productId: 'p_1', productName: 'Wireless Noise-Cancelling Headphones', quantity: 1, price: 4999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&fit=crop' }], grossAmount: 4999, discount: 0, tax: 450, shippingCost: 0, commission: 750, sellerEarn: 4249, total: 5449, status: 'Delivered', paymentMethod: 'UPI', paymentStatus: 'Paid', shippingAddress: defaultAddress, shipmentMethod: 'Standard', trackingNumber: 'SHIP123456', ondcTransactionId: 'ONDC-TXN-A001', timeline: [{ status: 'Placed', timestamp: '2025-05-01T10:00:00Z', note: 'Order confirmed via ONDC network' }, { status: 'Processing', timestamp: '2025-05-01T12:00:00Z', note: 'Seller accepted order' }, { status: 'Shipped', timestamp: '2025-05-02T09:00:00Z', note: 'Picked up by courier' }, { status: 'Delivered', timestamp: '2025-05-04T14:00:00Z', note: 'Delivered to customer' }], timestamp: '2025-05-01T10:00:00Z' },
  { id: 'ORD-2025-1002', customerId: 'u_7', customerName: 'Ananya Desai', customerEmail: 'customer@valuemarketplace.com', sellerId: 'u_8', items: [{ productId: 'p_6', productName: 'Organic Raw Honey (500g)', quantity: 2, price: 549, image: 'https://images.unsplash.com/photo-1587049352847-8d4e8941b958?w=80&fit=crop' }, { productId: 'p_7', productName: 'Premium Basmati Rice (5kg)', quantity: 1, price: 699, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&fit=crop' }], grossAmount: 1797, discount: 100, tax: 153, shippingCost: 49, commission: 204, sellerEarn: 1593, total: 1899, status: 'Shipped', paymentMethod: 'Credit Card', paymentStatus: 'Paid', shippingAddress: defaultAddress, shipmentMethod: 'Express', trackingNumber: 'SHIP789012', ondcTransactionId: 'ONDC-TXN-A002', timeline: [{ status: 'Placed', timestamp: '2025-05-10T08:00:00Z', note: 'Order placed' }, { status: 'Processing', timestamp: '2025-05-10T10:00:00Z', note: 'Seller processing' }, { status: 'Shipped', timestamp: '2025-05-11T06:00:00Z', note: 'Shipped via Express' }], timestamp: '2025-05-10T08:00:00Z' },
  { id: 'ORD-2025-1003', customerId: 'u_9', customerName: 'Sanjay Gupta', customerEmail: 'customer2@valuemarketplace.com', sellerId: 'u_3', items: [{ productId: 'p_4', productName: 'Premium Cotton Slim Fit Shirt', quantity: 2, price: 1299, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&fit=crop' }], grossAmount: 2598, discount: 0, tax: 234, shippingCost: 0, commission: 390, sellerEarn: 2208, total: 2832, status: 'Processing', paymentMethod: 'UPI', paymentStatus: 'Paid', shippingAddress: { name: 'Sanjay Gupta', line1: '12, Connaught Place', line2: 'Block C', city: 'New Delhi', state: 'Delhi', pincode: '110001', phone: '+91 98765 43218' }, shipmentMethod: 'Standard', trackingNumber: '', ondcTransactionId: 'ONDC-TXN-A003', timeline: [{ status: 'Placed', timestamp: '2025-05-15T14:00:00Z', note: 'Order placed' }, { status: 'Processing', timestamp: '2025-05-15T16:00:00Z', note: 'Being prepared' }], timestamp: '2025-05-15T14:00:00Z' },
  { id: 'ORD-2025-1004', customerId: 'u_7', customerName: 'Ananya Desai', customerEmail: 'customer@valuemarketplace.com', sellerId: 'u_3', items: [{ productId: 'p_9', productName: 'Ergonomic Desk Lamp with Wireless Charger', quantity: 1, price: 2499, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=80&fit=crop' }], grossAmount: 2499, discount: 200, tax: 207, shippingCost: 0, commission: 345, sellerEarn: 2154, total: 2506, status: 'Pending', paymentMethod: 'COD', paymentStatus: 'Pending', shippingAddress: defaultAddress, shipmentMethod: 'Standard', trackingNumber: '', ondcTransactionId: 'ONDC-TXN-A004', timeline: [{ status: 'Placed', timestamp: '2025-05-20T09:00:00Z', note: 'Order placed, awaiting payment confirmation' }], timestamp: '2025-05-20T09:00:00Z' },
  { id: 'ORD-2025-1005', customerId: 'u_9', customerName: 'Sanjay Gupta', customerEmail: 'customer2@valuemarketplace.com', sellerId: 'u_8', items: [{ productId: 'p_11', productName: 'Natural Face Serum', quantity: 3, price: 799, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=80&fit=crop' }], grossAmount: 2397, discount: 0, tax: 216, shippingCost: 49, commission: 287, sellerEarn: 2110, total: 2662, status: 'Delivered', paymentMethod: 'Debit Card', paymentStatus: 'Paid', shippingAddress: { name: 'Sanjay Gupta', line1: '12, Connaught Place', line2: 'Block C', city: 'New Delhi', state: 'Delhi', pincode: '110001', phone: '+91 98765 43218' }, shipmentMethod: 'Standard', trackingNumber: 'SHIP345678', ondcTransactionId: 'ONDC-TXN-A005', timeline: [{ status: 'Placed', timestamp: '2025-04-20T10:00:00Z', note: 'Order placed' }, { status: 'Processing', timestamp: '2025-04-20T12:00:00Z', note: 'Seller processing' }, { status: 'Shipped', timestamp: '2025-04-21T08:00:00Z', note: 'Shipped' }, { status: 'Delivered', timestamp: '2025-04-23T16:00:00Z', note: 'Delivered' }], timestamp: '2025-04-20T10:00:00Z' },
];

export const initialShipments: Shipment[] = [
  { id: 'SHP-001', orderId: 'ORD-2025-1001', sellerId: 'u_3', courier: 'Delhivery', trackingNumber: 'SHIP123456', status: 'Delivered', createdAt: '2025-05-02T09:00:00Z', estimatedDelivery: '2025-05-05' },
  { id: 'SHP-002', orderId: 'ORD-2025-1002', sellerId: 'u_8', courier: 'BlueDart', trackingNumber: 'SHIP789012', status: 'In Transit', createdAt: '2025-05-11T06:00:00Z', estimatedDelivery: '2025-05-14' },
  { id: 'SHP-003', orderId: 'ORD-2025-1005', sellerId: 'u_8', courier: 'DTDC', trackingNumber: 'SHIP345678', status: 'Delivered', createdAt: '2025-04-21T08:00:00Z', estimatedDelivery: '2025-04-24' },
];

export const initialReviews: Review[] = [
  { id: 'r_1', targetId: 'p_1', type: 'product', customerId: 'u_7', customerName: 'Ananya Desai', rating: 5, title: 'Excellent Audio Quality!', comment: 'Amazing noise cancellation and sound quality. Battery lasts forever. Best purchase this year!', status: 'Approved', timestamp: '2025-05-05T10:00:00Z' },
  { id: 'r_2', targetId: 'p_6', type: 'product', customerId: 'u_7', customerName: 'Ananya Desai', rating: 5, title: 'Pure and Natural', comment: 'Authentic organic honey. You can taste the difference from store-bought honey. Will buy again!', status: 'Approved', timestamp: '2025-04-25T08:00:00Z' },
  { id: 'r_3', targetId: 'u_3', type: 'seller', customerId: 'u_7', customerName: 'Ananya Desai', rating: 4, title: 'Great Service', comment: 'Fast shipping and good packaging. Product quality is excellent. Minor delay in delivery though.', status: 'Approved', timestamp: '2025-05-06T14:00:00Z' },
  { id: 'r_4', targetId: 'p_4', type: 'product', customerId: 'u_9', customerName: 'Sanjay Gupta', rating: 4, title: 'Good Quality Fabric', comment: 'Nice fabric and fit. Slightly different shade from what was shown. Overall a good buy.', status: 'Pending', timestamp: '2025-05-18T11:00:00Z' },
  { id: 'r_5', targetId: 'u_8', type: 'seller', customerId: 'u_9', customerName: 'Sanjay Gupta', rating: 5, title: 'Best Grocery Seller', comment: 'Fresh products, great packaging, and super fast delivery. Highly recommended!', status: 'Approved', timestamp: '2025-04-24T09:00:00Z' },
  { id: 'r_6', targetId: 'p_11', type: 'product', customerId: 'u_9', customerName: 'Sanjay Gupta', rating: 4, title: 'Visible Results', comment: 'Started seeing results in 2 weeks. Skin feels smoother and brighter. Good value for money.', status: 'Approved', timestamp: '2025-05-01T16:00:00Z' },
];

export const initialPayouts: PayoutRequest[] = [
  { id: 'pay_1', sellerId: 'u_3', amount: 50000, status: 'Pending', method: 'Bank Transfer', timestamp: '2025-05-20T10:00:00Z' },
  { id: 'pay_2', sellerId: 'u_8', amount: 25000, status: 'Processed', method: 'Bank Transfer', timestamp: '2025-05-15T10:00:00Z' },
  { id: 'pay_3', sellerId: 'u_3', amount: 75000, status: 'Processed', method: 'Bank Transfer', timestamp: '2025-04-30T10:00:00Z' },
];

export const initialWarehouses: Warehouse[] = [
  { id: 'wh_1', sellerId: 'u_3', name: 'Mumbai Central Hub', address: '15, Bandra Kurla Complex', city: 'Mumbai', state: 'Maharashtra', pincode: '400051', contactPerson: 'Rahul Verma', phone: '+91 98765 11111', type: 'Fulfillment', status: 'Active' },
  { id: 'wh_2', sellerId: 'u_8', name: 'Delhi NCR Warehouse', address: '42, Sector 62', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301', contactPerson: 'Suresh Kumar', phone: '+91 98765 22222', type: 'Fulfillment', status: 'Active' },
  { id: 'wh_3', sellerId: 'u_8', name: 'Bangalore Dark Store', address: '8, Koramangala 4th Block', city: 'Bangalore', state: 'Karnataka', pincode: '560034', contactPerson: 'Deepa Nair', phone: '+91 98765 33333', type: 'Dark Store', status: 'Active' },
];

export const initialTeamMembers: TeamMember[] = [
  { id: 'tm_1', sellerId: 'u_3', name: 'Ravi Kumar', email: 'ravi@techstylehub.com', role: 'Inventory Manager', permissions: ['products.view', 'products.edit', 'inventory.manage'], status: 'Active' },
  { id: 'tm_2', sellerId: 'u_3', name: 'Meera Joshi', email: 'meera@techstylehub.com', role: 'Order Fulfillment', permissions: ['orders.view', 'orders.manage', 'shipments.create'], status: 'Active' },
  { id: 'tm_3', sellerId: 'u_8', name: 'Kiran Shah', email: 'kiran@freshbasket.com', role: 'Store Manager', permissions: ['products.view', 'products.edit', 'orders.view', 'orders.manage', 'inventory.manage'], status: 'Active' },
];

export const initialOndcTransactions: OndcTransaction[] = [
  { id: 'ondc_1', orderId: 'ORD-2025-1001', action: 'search', status: 'success', timestamp: '2025-05-01T09:55:00Z', payload: '{"context":{"action":"search","domain":"ONDC:RET10"},"message":{"intent":{"item":{"descriptor":{"name":"headphones"}}}}}', responseTime: 120 },
  { id: 'ondc_2', orderId: 'ORD-2025-1001', action: 'select', status: 'success', timestamp: '2025-05-01T09:57:00Z', payload: '{"context":{"action":"select"},"message":{"order":{"items":[{"id":"p_1"}]}}}', responseTime: 85 },
  { id: 'ondc_3', orderId: 'ORD-2025-1001', action: 'init', status: 'success', timestamp: '2025-05-01T09:58:00Z', payload: '{"context":{"action":"init"},"message":{"order":{"billing":{"name":"Ananya Desai"}}}}', responseTime: 200 },
  { id: 'ondc_4', orderId: 'ORD-2025-1001', action: 'confirm', status: 'success', timestamp: '2025-05-01T10:00:00Z', payload: '{"context":{"action":"confirm"},"message":{"order":{"id":"ORD-2025-1001","state":"Accepted"}}}', responseTime: 350 },
  { id: 'ondc_5', orderId: 'ORD-2025-1001', action: 'status', status: 'success', timestamp: '2025-05-02T09:00:00Z', payload: '{"context":{"action":"status"},"message":{"order":{"state":"In-progress","fulfillments":[{"state":"Order-picked-up"}]}}}', responseTime: 95 },
  { id: 'ondc_6', orderId: 'ORD-2025-1001', action: 'track', status: 'success', timestamp: '2025-05-03T14:00:00Z', payload: '{"context":{"action":"track"},"message":{"tracking":{"status":"in-transit","url":"https://track.delhivery.com/SHIP123456"}}}', responseTime: 110 },
  { id: 'ondc_7', orderId: 'ORD-2025-1002', action: 'search', status: 'success', timestamp: '2025-05-10T07:50:00Z', payload: '{"context":{"action":"search","domain":"ONDC:RET10"},"message":{"intent":{"item":{"descriptor":{"name":"honey"}}}}}', responseTime: 130 },
  { id: 'ondc_8', orderId: 'ORD-2025-1002', action: 'confirm', status: 'success', timestamp: '2025-05-10T08:00:00Z', payload: '{"context":{"action":"confirm"},"message":{"order":{"id":"ORD-2025-1002","state":"Accepted"}}}', responseTime: 280 },
  { id: 'ondc_9', orderId: 'ORD-2025-1003', action: 'confirm', status: 'success', timestamp: '2025-05-15T14:00:00Z', payload: '{"context":{"action":"confirm"},"message":{"order":{"id":"ORD-2025-1003","state":"Accepted"}}}', responseTime: 310 },
  { id: 'ondc_10', orderId: '', action: 'search', status: 'error', timestamp: '2025-05-18T11:30:00Z', payload: '{"error":{"type":"DOMAIN-ERROR","code":"40002","message":"Provider not found"}}', responseTime: 5000 },
];

export const initialCommissionRules: CommissionRule[] = [
  { id: 'cr_1', type: 'global', targetId: 'all', rate: 15, label: 'Global Default Commission' },
  { id: 'cr_2', type: 'category', targetId: 'Electronics', rate: 12, label: 'Electronics Category' },
  { id: 'cr_3', type: 'category', targetId: 'Groceries', rate: 8, label: 'Groceries Category' },
  { id: 'cr_4', type: 'seller', targetId: 'u_8', rate: 12, label: 'FreshBasket India (Special Rate)' },
];

export const initialCorporateAccounts: CorporateAccount[] = [
  { id: 'corp_1', companyName: 'Infosys Technologies', gstNumber: '29AAGCI0401H1Z7', contactPerson: 'Amit Sharma', email: 'procurement@infosys.com', creditLimit: 500000, creditUsed: 125000, status: 'Active' },
  { id: 'corp_2', companyName: 'TCS Limited', gstNumber: '27AAACT2727Q1ZX', contactPerson: 'Sunita Reddy', email: 'purchase@tcs.com', creditLimit: 750000, creditUsed: 0, status: 'Pending' },
];

export const initialRFQs: RFQ[] = [
  { id: 'rfq_1', corporateId: 'corp_1', items: [{ productId: 'p_1', quantity: 50, targetPrice: 4200 }, { productId: 'p_2', quantity: 100, targetPrice: 3000 }], status: 'Open', createdAt: '2025-05-18T10:00:00Z', expiresAt: '2025-06-01T10:00:00Z' },
];
