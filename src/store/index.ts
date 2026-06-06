import { create } from 'zustand';
import type { User, Product, Order, Customer, SellerProfile, Review, PayoutRequest, Shipment, Warehouse, TeamMember, OndcTransaction, CommissionRule, WishlistItem, Address, OrderItem, CorporateAccount, RFQ } from '../data/mockData';
import { users, initialProducts, initialOrders, customers, sellerProfiles, initialReviews, initialPayouts, initialShipments, initialWarehouses, initialTeamMembers, initialOndcTransactions, initialCommissionRules, initialCorporateAccounts, initialRFQs } from '../data/mockData';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AppState {
  // Auth
  currentUser: User | null;
  login: (email: string) => void;
  logout: () => void;
  users: User[];

  // Catalog
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'status' | 'rating' | 'reviewCount' | 'createdAt'>) => void;
  editProduct: (productId: string, product: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  updateProductStatus: (productId: string, status: Product['status']) => void;

  // Cart
  cart: { productId: string; quantity: number; variantId?: string }[];
  addToCart: (productId: string, quantity: number, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (address: Address) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;

  // Shipments
  shipments: Shipment[];
  createShipment: (orderId: string, courier: string, trackingNumber: string) => void;
  updateShipmentStatus: (shipmentId: string, status: Shipment['status']) => void;

  // Customers
  customers: Customer[];

  // Sellers
  sellerProfiles: SellerProfile[];
  updateSellerProfile: (sellerId: string, updates: Partial<SellerProfile>) => void;
  approveSeller: (sellerId: string) => void;
  suspendSeller: (sellerId: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'status' | 'timestamp'>) => void;
  updateReviewStatus: (reviewId: string, status: Review['status']) => void;

  // Payouts
  payoutRequests: PayoutRequest[];
  requestPayout: (sellerId: string, amount: number) => void;
  processPayout: (payoutId: string) => void;
  rejectPayout: (payoutId: string) => void;

  // Warehouses
  warehouses: Warehouse[];
  addWarehouse: (warehouse: Omit<Warehouse, 'id'>) => void;
  updateWarehouse: (warehouseId: string, updates: Partial<Warehouse>) => void;
  deleteWarehouse: (warehouseId: string) => void;

  // Team
  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (memberId: string, updates: Partial<TeamMember>) => void;
  removeTeamMember: (memberId: string) => void;

  // ONDC
  isOndcConnected: boolean;
  toggleOndcConnection: () => void;
  ondcTransactions: OndcTransaction[];
  ondcLogs: any[];
  addOndcLog: (log: any) => void;

  // Commission
  commissionRules: CommissionRule[];
  updateCommissionRule: (ruleId: string, rate: number) => void;
  addCommissionRule: (rule: Omit<CommissionRule, 'id'>) => void;

  // B2B
  corporateAccounts: CorporateAccount[];
  rfqs: RFQ[];

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Supabase Sync
  initializeDatabase: () => Promise<void>;
  importOndcCatalog: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // --- AUTH ---
  currentUser: null,
  users: users,
  login: (email) => {
    const user = get().users.find(u => u.email === email);
    if (user) set({ currentUser: user });
  },
  logout: () => set({ currentUser: null, cart: [], wishlist: [] }),

  // --- SUPABASE SYNC ---
  initializeDatabase: async () => {
    try {
      const { data: dbProducts } = await supabase.from('products').select('*');
      const { data: dbOrders } = await supabase.from('orders').select('*');
      const { data: dbUsers } = await supabase.from('users').select('*');
      const { data: dbSellers } = await supabase.from('seller_profiles').select('*');

      if (dbProducts) {
        set({ products: dbProducts.map(p => ({
          id: p.id, sellerId: p.seller_id, name: p.name, category: p.category, subcategory: p.subcategory, 
          price: p.price, comparePrice: p.compare_price, stock: p.stock, sku: p.sku, images: p.images, 
          description: p.description, status: p.status, rating: p.rating, createdAt: p.created_at,
          source: p.source || 'Local', ondcMetadata: p.ondc_metadata,
          attributes: [], variants: [], seoTitle: '', seoDescription: '', ondcCategory: '', weight: 0, dimensions: '', tags: [], reviewCount: 0, shortDescription: ''
        })) });
      }
      if (dbOrders) {
        set({ orders: dbOrders.map(o => ({
          id: o.id, customerId: o.customer_id, sellerId: o.seller_id, items: o.items, total: o.total, 
          status: o.status, shippingAddress: o.shipping_address, timestamp: o.created_at,
          customerName: 'Customer', customerEmail: '', grossAmount: o.total, discount: 0, tax: 0, shippingCost: 0, commission: 0, sellerEarn: o.total, paymentMethod: 'Unknown', paymentStatus: 'Paid', shipmentMethod: 'Standard', trackingNumber: '', ondcTransactionId: '', timeline: []
        })) });
      }
      // Map dbSellers -> sellerProfiles matching the casing
      if (dbSellers) {
        set({ sellerProfiles: dbSellers.map(s => ({
          sellerId: s.seller_id,
          shopName: s.shop_name,
          shopDescription: s.shop_description,
          bannerUrl: s.banner_url,
          logoUrl: s.logo_url,
          gstNumber: s.gst_number,
          panNumber: '', bankAccount: '', bankIfsc: '', returnPolicy: '', shippingPolicy: '', termsConditions: '', socialLinks: [], seoTitle: '', seoDescription: '',
          status: s.status as any,
          totalSales: s.total_sales,
          totalPayout: 0, remainingPayout: 0, totalOrders: 0, totalCustomers: 0, averageOrderSell: 0, commissionRate: 15, joinedDate: s.created_at, rating: 5, totalReviews: 0
        })) });
      }
      if (dbUsers) {
        set({ users: dbUsers.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
          role: u.role as any,
          avatar: u.avatar,
          defaultWorkspace: u.default_workspace
        })) });
      }
    } catch (e) {
      console.error('Failed to initialize Supabase', e);
    }
  },

  // --- CATALOG ---
  products: initialProducts,
  addProduct: async (newProduct) => {
    const product: Product = { ...newProduct, id: `p_${Date.now()}`, status: 'Pending', rating: 0, reviewCount: 0, createdAt: new Date().toISOString().split('T')[0] };
    
    // Save to Supabase
    try {
      const { error } = await supabase.from('products').insert({
        id: product.id, seller_id: product.sellerId, name: product.name, category: product.category, subcategory: product.subcategory, price: product.price, compare_price: product.comparePrice, stock: product.stock, sku: product.sku, images: product.images, description: product.description, status: product.status, rating: product.rating, created_at: product.createdAt
      });
      if (error) throw error;
      toast.success('Product added successfully!');
    } catch(e: any) { 
      console.error('Failed to insert product to Supabase', e); 
      toast.error('Failed to save product to database');
    }

    set((state) => ({ products: [product, ...state.products] }));
  },
  editProduct: (productId, updates) => set((state) => ({
    products: state.products.map(p => p.id === productId ? { ...p, ...updates } : p)
  })),

  importOndcCatalog: async () => {
    try {
      // 1. Simulate fetching raw Beckn JSON from an ONDC BPP Gateway
      const rawBecknPayload = [
        {
          bpp_id: "bpp.network.ondc.org",
          provider_id: "P123",
          item_id: "I456",
          descriptor: { name: "Network Imported Headset", short_desc: "ONDC shared catalog item", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&fit=crop"] },
          price: { currency: "INR", value: "2999" },
          matched_location: "L1"
        },
        {
          bpp_id: "bpp.network.ondc.org",
          provider_id: "P789",
          item_id: "I012",
          descriptor: { name: "Network Imported Watch", short_desc: "ONDC shared catalog item", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&fit=crop"] },
          price: { currency: "INR", value: "4999" },
          matched_location: "L2"
        }
      ];

      // 2. Map the raw ONDC JSON to our local Product schema
      const importedProducts: Product[] = rawBecknPayload.map(item => ({
        id: `ondc_p_${Date.now()}_${item.item_id}`,
        sellerId: get().users.find(u => u.role === 'tsp')?.id || 'u_2', // Assign to TSP
        name: item.descriptor.name,
        category: 'Electronics',
        subcategory: 'Imported',
        price: parseInt(item.price.value),
        comparePrice: parseInt(item.price.value) + 1000,
        stock: 50,
        sku: `ONDC-${item.item_id}`,
        images: item.descriptor.images,
        description: item.descriptor.short_desc,
        shortDescription: item.descriptor.short_desc,
        status: 'Pending',
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        source: 'ONDC Network',
        ondcMetadata: item, // Raw Beckn JSON preserved here
        attributes: [], variants: [], seoTitle: '', seoDescription: '', ondcCategory: '', weight: 0, dimensions: '', tags: []
      }));

      // 3. Insert into Supabase
      for (const p of importedProducts) {
        const { error } = await supabase.from('products').insert({
          id: p.id, seller_id: p.sellerId, name: p.name, category: p.category, subcategory: p.subcategory, price: p.price, compare_price: p.comparePrice, stock: p.stock, sku: p.sku, images: p.images, description: p.description, status: p.status, rating: p.rating, created_at: p.createdAt, source: p.source, ondc_metadata: p.ondcMetadata
        });
        if (error) throw error;
      }

      // 4. Update UI
      set((state) => ({ products: [...importedProducts, ...state.products] }));
      toast.success(`Successfully imported ${importedProducts.length} products from ONDC Network!`);
    } catch (e: any) {
      console.error('ONDC Import Error:', e);
      toast.error('Failed to import ONDC catalog. Check network logs.');
    }
  },
  deleteProduct: (productId) => set((state) => ({
    products: state.products.filter(p => p.id !== productId)
  })),
  updateProductStatus: (productId, status) => set((state) => ({
    products: state.products.map(p => p.id === productId ? { ...p, status } : p)
  })),

  // --- CART ---
  cart: [],
  addToCart: (productId, quantity, variantId) => set((state) => {
    const existing = state.cart.find(i => i.productId === productId && i.variantId === variantId);
    const ondcSelectLog = get().isOndcConnected ? {
      id: `ondc_${Date.now()}_select`, orderId: '', action: 'select' as const, status: 'success' as const, timestamp: new Date().toISOString(), payload: JSON.stringify({ context: { action: 'select' }, message: { order: { items: [{ id: productId, quantity: { count: quantity } }] } } }), responseTime: 120
    } : null;

    if (existing) {
      return { 
        cart: state.cart.map(i => i.productId === productId && i.variantId === variantId ? { ...i, quantity: i.quantity + quantity } : i),
        ondcTransactions: ondcSelectLog ? [ondcSelectLog, ...state.ondcTransactions] : state.ondcTransactions 
      };
    }
    return { 
      cart: [...state.cart, { productId, quantity, variantId }],
      ondcTransactions: ondcSelectLog ? [ondcSelectLog, ...state.ondcTransactions] : state.ondcTransactions
    };
  }),
  updateCartQuantity: (productId, quantity) => set((state) => ({
    cart: quantity <= 0 ? state.cart.filter(i => i.productId !== productId) : state.cart.map(i => i.productId === productId ? { ...i, quantity } : i)
  })),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(i => i.productId !== productId)
  })),
  clearCart: () => set({ cart: [] }),

  // --- WISHLIST ---
  wishlist: [],
  addToWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.some(w => w.productId === productId) ? state.wishlist : [...state.wishlist, { productId, addedAt: new Date().toISOString() }]
  })),
  removeFromWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.filter(w => w.productId !== productId)
  })),

  // --- ORDERS ---
  orders: initialOrders,
  placeOrder: (address) => set((state) => {
    if (!state.currentUser || state.cart.length === 0) return state;

    // Group cart by seller
    const sellerGroups: Record<string, typeof state.cart> = {};
    state.cart.forEach(item => {
      const product = state.products.find(p => p.id === item.productId);
      if (product) {
        if (!sellerGroups[product.sellerId]) sellerGroups[product.sellerId] = [];
        sellerGroups[product.sellerId].push(item);
      }
    });

    const newOrders: Order[] = [];
    let updatedProfiles = [...state.sellerProfiles];
    let updatedProducts = [...state.products];

    Object.entries(sellerGroups).forEach(([sellerId, items]) => {
      const orderItems: OrderItem[] = items.map(ci => {
        const p = state.products.find(prod => prod.id === ci.productId)!;
        return { productId: ci.productId, productName: p.name, quantity: ci.quantity, price: p.price, image: p.images[0] || '' };
      });

      const grossAmount = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const tax = Math.round(grossAmount * 0.09);
      const shippingCost = grossAmount >= 499 ? 0 : 49;
      const profile = updatedProfiles.find(s => s.sellerId === sellerId);
      const commRate = profile?.commissionRate || 15;
      const commission = Math.round(grossAmount * commRate / 100);
      const sellerEarn = grossAmount - commission;

      const newOrder: Order = {
        id: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        customerId: state.currentUser!.id,
        customerName: state.currentUser!.name,
        customerEmail: state.currentUser!.email,
        sellerId,
        items: orderItems,
        grossAmount, discount: 0, tax, shippingCost, commission, sellerEarn,
        total: grossAmount + tax + shippingCost,
        status: 'Pending',
        paymentMethod: 'ONDC Network',
        paymentStatus: 'Paid',
        shippingAddress: address,
        shipmentMethod: 'Standard',
        trackingNumber: '',
        ondcTransactionId: `ONDC-TXN-${Math.floor(Math.random() * 10000)}`,
        timeline: [{ status: 'Placed', timestamp: new Date().toISOString(), note: 'Order placed via ONDC Network' }],
        timestamp: new Date().toISOString()
      };

      // Save to Supabase (non-blocking)
      supabase.from('orders').insert({
        id: newOrder.id, customer_id: newOrder.customerId, seller_id: newOrder.sellerId, items: newOrder.items, total: newOrder.total, status: newOrder.status, shipping_address: newOrder.shippingAddress
      }).then(({error}) => { 
        if(error) {
          console.error('Failed to insert order', error);
          toast.error('Failed to record order in database');
        } else {
          toast.success('Order placed successfully via ONDC!');
        }
      });

      newOrders.push(newOrder);

      // Update seller stats
      updatedProfiles = updatedProfiles.map(p => {
        if (p.sellerId === sellerId) {
          return { ...p, totalSales: p.totalSales + grossAmount, remainingPayout: p.remainingPayout + sellerEarn, totalOrders: p.totalOrders + 1 };
        }
        return p;
      });

      // Deduct stock
      items.forEach(ci => {
        updatedProducts = updatedProducts.map(p => p.id === ci.productId ? { ...p, stock: Math.max(0, p.stock - ci.quantity) } : p);
      });
    });

    // Generate ONDC logs if connected
    let ondcLogs: OndcTransaction[] = [];
    if (state.isOndcConnected) {
      ondcLogs = newOrders.flatMap(o => [
        { id: `ondc_${Date.now()}_init`, orderId: o.id, action: 'init' as const, status: 'success' as const, timestamp: new Date().toISOString(), payload: JSON.stringify({ context: { action: 'init' }, message: { order: { id: o.id } } }), responseTime: 180 },
        { id: `ondc_${Date.now()}_confirm`, orderId: o.id, action: 'confirm' as const, status: 'success' as const, timestamp: new Date().toISOString(), payload: JSON.stringify({ context: { action: 'confirm' }, message: { order: { id: o.id, state: 'Accepted' } } }), responseTime: 320 },
      ]);
    }

    return {
      orders: [...newOrders, ...state.orders],
      cart: [],
      products: updatedProducts,
      sellerProfiles: updatedProfiles,
      ondcTransactions: [...ondcLogs, ...state.ondcTransactions],
    };
  }),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? {
      ...o, status,
      timeline: [...o.timeline, { status, timestamp: new Date().toISOString(), note: `Order ${status.toLowerCase()}` }]
    } : o)
  })),
  cancelOrder: (orderId) => set((state) => {
    const ondcCancelLog = state.isOndcConnected ? { id: `ondc_${Date.now()}_cancel`, orderId, action: 'cancel' as const, status: 'success' as const, timestamp: new Date().toISOString(), payload: JSON.stringify({ context: { action: 'cancel' }, message: { order_id: orderId, cancellation_reason_id: '001' } }), responseTime: 140 } : null;
    return {
      orders: state.orders.map(o => o.id === orderId ? {
        ...o, status: 'Cancelled' as const,
        timeline: [...o.timeline, { status: 'Cancelled', timestamp: new Date().toISOString(), note: 'Order cancelled by user' }]
      } : o),
      ondcTransactions: ondcCancelLog ? [ondcCancelLog, ...state.ondcTransactions] : state.ondcTransactions
    };
  }),

  // --- SHIPMENTS ---
  shipments: initialShipments,
  createShipment: (orderId, courier, trackingNumber) => set((state) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return state;
    const shipment: Shipment = {
      id: `SHP-${Date.now()}`, orderId, sellerId: order.sellerId, courier, trackingNumber,
      status: 'Created', createdAt: new Date().toISOString(), estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
    };
    const ondcStatusLog = state.isOndcConnected ? { id: `ondc_${Date.now()}_status`, orderId, action: 'status' as const, status: 'success' as const, timestamp: new Date().toISOString(), payload: JSON.stringify({ context: { action: 'status' }, message: { order: { id: orderId, fulfillment: { state: { descriptor: { code: 'Shipped' } }, tracking: { id: trackingNumber } } } } }), responseTime: 160 } : null;

    return {
      shipments: [shipment, ...state.shipments],
      orders: state.orders.map(o => o.id === orderId ? {
        ...o, status: 'Shipped' as const, trackingNumber,
        timeline: [...o.timeline, { status: 'Shipped', timestamp: new Date().toISOString(), note: `Shipped via ${courier} (${trackingNumber})` }]
      } : o),
      ondcTransactions: ondcStatusLog ? [ondcStatusLog, ...state.ondcTransactions] : state.ondcTransactions
    };
  }),
  updateShipmentStatus: (shipmentId, status) => set((state) => ({
    shipments: state.shipments.map(s => s.id === shipmentId ? { ...s, status } : s)
  })),

  // --- CUSTOMERS ---
  customers: customers,

  // --- SELLERS ---
  sellerProfiles: sellerProfiles,
  updateSellerProfile: (sellerId, updates) => set((state) => ({
    sellerProfiles: state.sellerProfiles.map(s => s.sellerId === sellerId ? { ...s, ...updates } : s)
  })),
  approveSeller: (sellerId) => set((state) => ({
    sellerProfiles: state.sellerProfiles.map(s => s.sellerId === sellerId ? { ...s, status: 'Active' as const } : s)
  })),
  suspendSeller: (sellerId) => set((state) => ({
    sellerProfiles: state.sellerProfiles.map(s => s.sellerId === sellerId ? { ...s, status: 'Suspended' as const } : s)
  })),

  // --- REVIEWS ---
  reviews: initialReviews,
  addReview: (review) => set((state) => ({
    reviews: [{ ...review, id: `r_${Date.now()}`, status: 'Pending' as const, timestamp: new Date().toISOString() }, ...state.reviews]
  })),
  updateReviewStatus: (reviewId, status) => set((state) => ({
    reviews: state.reviews.map(r => r.id === reviewId ? { ...r, status } : r)
  })),

  // --- PAYOUTS ---
  payoutRequests: initialPayouts,
  requestPayout: (sellerId, amount) => set((state) => ({
    payoutRequests: [{ id: `pay_${Date.now()}`, sellerId, amount, status: 'Pending' as const, method: 'Bank Transfer', timestamp: new Date().toISOString() }, ...state.payoutRequests]
  })),
  processPayout: (payoutId) => set((state) => {
    const req = state.payoutRequests.find(p => p.id === payoutId);
    return {
      payoutRequests: state.payoutRequests.map(p => p.id === payoutId ? { ...p, status: 'Processed' as const } : p),
      sellerProfiles: req ? state.sellerProfiles.map(s => s.sellerId === req.sellerId ? { ...s, totalPayout: s.totalPayout + req.amount, remainingPayout: s.remainingPayout - req.amount } : s) : state.sellerProfiles,
    };
  }),
  rejectPayout: (payoutId) => set((state) => ({
    payoutRequests: state.payoutRequests.map(p => p.id === payoutId ? { ...p, status: 'Rejected' as const } : p)
  })),

  // --- WAREHOUSES ---
  warehouses: initialWarehouses,
  addWarehouse: (warehouse) => set((state) => ({
    warehouses: [{ ...warehouse, id: `wh_${Date.now()}` }, ...state.warehouses]
  })),
  updateWarehouse: (warehouseId, updates) => set((state) => ({
    warehouses: state.warehouses.map(w => w.id === warehouseId ? { ...w, ...updates } : w)
  })),
  deleteWarehouse: (warehouseId) => set((state) => ({
    warehouses: state.warehouses.filter(w => w.id !== warehouseId)
  })),

  // --- TEAM ---
  teamMembers: initialTeamMembers,
  addTeamMember: (member) => set((state) => ({
    teamMembers: [{ ...member, id: `tm_${Date.now()}` }, ...state.teamMembers]
  })),
  updateTeamMember: (memberId, updates) => set((state) => ({
    teamMembers: state.teamMembers.map(m => m.id === memberId ? { ...m, ...updates } : m)
  })),
  removeTeamMember: (memberId) => set((state) => ({
    teamMembers: state.teamMembers.filter(m => m.id !== memberId)
  })),

  // --- ONDC ---
  isOndcConnected: false,
  toggleOndcConnection: () => set((state) => ({ isOndcConnected: !state.isOndcConnected })),
  ondcTransactions: initialOndcTransactions,
  ondcLogs: [],
  addOndcLog: (log) => set((state) => ({ ondcLogs: [log, ...state.ondcLogs] })),

  // --- COMMISSION ---
  commissionRules: initialCommissionRules,
  updateCommissionRule: (ruleId, rate) => set((state) => ({
    commissionRules: state.commissionRules.map(r => r.id === ruleId ? { ...r, rate } : r)
  })),
  addCommissionRule: (rule) => set((state) => ({
    commissionRules: [...state.commissionRules, { ...rule, id: `cr_${Date.now()}` }]
  })),

  // --- B2B ---
  corporateAccounts: initialCorporateAccounts,
  rfqs: initialRFQs,

  // --- SEARCH ---
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
