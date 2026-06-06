import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import StorefrontLayout from './layouts/StorefrontLayout';
import { useAppStore } from './store';
import { QuickSwitcher } from './components/QuickSwitcher';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

// Auth
import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import ONDCAPIVisualizer from './pages/ONDCAPIVisualizer';

// Storefront (Buyer)
import StorefrontHome from './pages/StorefrontHome';
import StorefrontProductDetail from './pages/StorefrontProductDetail';
import StorefrontCart from './pages/StorefrontCart';
import StorefrontCheckout from './pages/StorefrontCheckout';
import StorefrontOrders from './pages/StorefrontOrders';
import StorefrontCategory from './pages/StorefrontCategory';
import StorefrontWishlist from './pages/StorefrontWishlist';
import StorefrontProfile from './pages/StorefrontProfile';

// Seller
import SellerDashboard from './pages/SellerDashboard';
import SellerProductList from './pages/SellerProductList';
import SellerProductForm from './pages/SellerProductForm';
import SellerOrderList from './pages/SellerOrderList';
import SellerTransactions from './pages/SellerTransactions';
import SellerCustomers from './pages/SellerCustomers';
import SellerReviewsView from './pages/SellerReviewsView';
import SellerProfileManage from './pages/SellerProfileManage';
import SellerBookings from './pages/SellerBookings';
import SellerCatalog from './pages/SellerCatalog';
import SellerShipments from './pages/SellerShipments';

// Admin
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminSellers from './pages/AdminSellers';
import AdminProducts from './pages/AdminProducts';
import AdminPayments from './pages/AdminPayments';
import AdminUsers from './pages/AdminUsers';

// ONDC / TSP / Pramaan / Analytics
import ONDCDashboard from './pages/ONDCDashboard';
import ONDCTestingCenter from './pages/ONDCTestingCenter';
import TSPDashboard from './pages/TSPDashboard';
import PramaanDashboard from './pages/PramaanDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import RealTimeSandbox from './pages/RealTimeSandbox';

// Warehouse & Quick Commerce
import WarehouseDashboard from './pages/WarehouseDashboard';
import WarehouseList from './pages/WarehouseList';
import WarehouseInventory from './pages/WarehouseInventory';
import StockMovement from './pages/StockMovement';
import QuickCommerceDashboard from './pages/QuickCommerceDashboard';
import QuickCommerceLive from './pages/QuickCommerceLive';
import QuickCommerceStores from './pages/QuickCommerceStores';

// Logistics
import LogisticsDashboard from './pages/LogisticsDashboard';
import LogisticsBookings from './pages/LogisticsBookings';
import LogisticsTracking from './pages/LogisticsTracking';

// B2B
import B2BDashboard from './pages/B2BDashboard';
import B2BAccounts from './pages/B2BAccounts';
import B2BRFQs from './pages/B2BRFQs';
import B2BOrders from './pages/B2BOrders';

// Phase 8 Complete Replacements
import AdminCommission from './pages/AdminCommission';
import AdminProductReviews from './pages/AdminProductReviews';
import AdminSellerReviews from './pages/AdminSellerReviews';
import AdminSettings from './pages/AdminSettings';
import SellerTeam from './pages/SellerTeam';
import ONDCApi from './pages/ONDCApi';
import ONDCMonitoring from './pages/ONDCMonitoring';
import TSPSubscribers from './pages/TSPSubscribers';
import TSPEnvironments from './pages/TSPEnvironments';
import TSPErrors from './pages/TSPErrors';
import PramaanValidation from './pages/PramaanValidation';
import PramaanReports from './pages/PramaanReports';
import AnalyticsRevenue from './pages/AnalyticsRevenue';
import AnalyticsHealth from './pages/AnalyticsHealth';

const Placeholder = ({ title }: { title: string }) => (
  <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h2>
    <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem' }}>🚧 Module under development</p>
      <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0', fontSize: '0.8125rem' }}>This module is part of the Value Marketplace Commerce OS and will be available soon.</p>
    </div>
  </div>
);

function App() {
  const initializeDatabase = useAppStore(state => state.initializeDatabase);

  useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  return (
    <ErrorBoundary>
      <Router>
        <QuickSwitcher />
        <Toaster position="top-right" />
        <Routes>
          {/* Public / Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Onboarding />} />
          <Route path="/ondc-api" element={<ONDCAPIVisualizer />} />
        </Route>

        {/* Buyer Storefront */}
        <Route element={<StorefrontLayout />}>
          <Route path="/store" element={<StorefrontHome />} />
          <Route path="/store/product/:id" element={<StorefrontProductDetail />} />
          <Route path="/store/cart" element={<StorefrontCart />} />
          <Route path="/store/category/:name" element={<StorefrontCategory />} />
          <Route path="/store/search" element={<StorefrontCategory />} />
          <Route path="/store/checkout" element={<StorefrontCheckout />} />
          <Route path="/store/orders" element={<StorefrontOrders />} />
          <Route path="/store/wishlist" element={<StorefrontWishlist />} />
          <Route path="/store/profile" element={<StorefrontProfile />} />
          <Route path="/store/*" element={<Placeholder title="Storefront Page" />} />
        </Route>

        {/* Dashboard Workspaces */}
        <Route element={<MainLayout />}>
          {/* Super Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/sellers" element={<AdminSellers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/commission" element={<AdminCommission />} />
          <Route path="/admin/product-reviews" element={<AdminProductReviews />} />
          <Route path="/admin/seller-reviews" element={<AdminSellerReviews />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Seller OS */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProductList />} />
          <Route path="/seller/products/new" element={<SellerProductForm />} />
          <Route path="/seller/orders" element={<SellerOrderList />} />
          <Route path="/seller/inventory" element={<SellerCatalog />} />
          <Route path="/seller/shipments" element={<SellerShipments />} />
          <Route path="/seller/transactions" element={<SellerTransactions />} />
          <Route path="/seller/customers" element={<SellerCustomers />} />
          <Route path="/seller/reviews" element={<SellerReviewsView type="seller" />} />
          <Route path="/seller/team" element={<SellerTeam />} />
          <Route path="/seller/profile" element={<SellerProfileManage />} />
          <Route path="/seller/bookings" element={<SellerBookings />} />
          <Route path="/seller/*" element={<Navigate to="/seller/dashboard" replace />} />

          {/* ONDC Operations */}
          <Route path="/ondc/dashboard" element={<ONDCDashboard />} />
          <Route path="/ondc/transactions" element={<ONDCTestingCenter />} />
          <Route path="/ondc/api" element={<ONDCApi />} />
          <Route path="/ondc/monitoring" element={<ONDCMonitoring />} />
          <Route path="/ondc/*" element={<Navigate to="/ondc/dashboard" replace />} />

          {/* TSP */}
          <Route path="/tsp/dashboard" element={<TSPDashboard />} />
          <Route path="/tsp/sandbox" element={<RealTimeSandbox />} />
          <Route path="/tsp/subscribers" element={<TSPSubscribers />} />
          <Route path="/tsp/environments" element={<TSPEnvironments />} />
          <Route path="/tsp/errors" element={<TSPErrors />} />
          <Route path="/tsp/*" element={<Navigate to="/tsp/dashboard" replace />} />

          {/* Pramaan */}
          <Route path="/pramaan/dashboard" element={<PramaanDashboard />} />
          <Route path="/pramaan/validation" element={<PramaanValidation />} />
          <Route path="/pramaan/reports" element={<PramaanReports />} />
          <Route path="/pramaan/*" element={<Navigate to="/pramaan/dashboard" replace />} />

          {/* Warehouse */}
          <Route path="/warehouse/dashboard" element={<WarehouseDashboard />} />
          <Route path="/warehouse/list" element={<WarehouseList />} />
          <Route path="/warehouse/inventory" element={<WarehouseInventory />} />
          <Route path="/warehouse/movement" element={<StockMovement />} />

          {/* B2B */}
          <Route path="/b2b/dashboard" element={<B2BDashboard />} />
          <Route path="/b2b/accounts" element={<B2BAccounts />} />
          <Route path="/b2b/rfq" element={<B2BRFQs />} />
          <Route path="/b2b/orders" element={<B2BOrders />} />
          <Route path="/b2b/*" element={<Placeholder title="B2B Module" />} />

          {/* Logistics */}
          <Route path="/logistics/dashboard" element={<LogisticsDashboard />} />
          <Route path="/logistics/bookings" element={<LogisticsBookings />} />
          <Route path="/logistics/tracking" element={<LogisticsTracking />} />
          <Route path="/logistics/*" element={<Placeholder title="Logistics Module" />} />

          {/* Quick Commerce */}
          <Route path="/quickcommerce/dashboard" element={<QuickCommerceDashboard />} />
          <Route path="/quickcommerce/stores" element={<QuickCommerceStores />} />
          <Route path="/quickcommerce/live" element={<QuickCommerceLive />} />
          <Route path="/quickcommerce/*" element={<Placeholder title="Quick Commerce Module" />} />

          {/* Analytics */}
          <Route path="/analytics/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/analytics/revenue" element={<AnalyticsRevenue />} />
          <Route path="/analytics/health" element={<AnalyticsHealth />} />
          <Route path="/analytics/*" element={<Navigate to="/analytics/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
