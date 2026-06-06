import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Store, Package, ShoppingCart, TrendingUp, LayoutDashboard,
  Globe, Shield, Activity, Users, FileText, Database, Server, ServerCrash,
  BarChart2, Play, Terminal, DollarSign, Star,
  User, Repeat, Truck, Settings, ChevronDown, ChevronRight,
  Warehouse, Building2, Zap, MapPin, ClipboardList, UserPlus,
  FileCheck, Boxes, Receipt, ArrowRight
} from 'lucide-react';

interface SidebarProps {
  workspace: string;
}

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  subItems?: { name: string; path: string }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ workspace }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const getMenuItems = (): MenuItem[] => {
    switch (workspace) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
          { name: 'Marketplace', path: '/admin/marketplace', icon: <Store size={18} />,
            subItems: [
              { name: 'Sellers', path: '/admin/sellers' },
              { name: 'Products', path: '/admin/products' },
              { name: 'Orders', path: '/admin/orders' },
              { name: 'Payment Requests', path: '/admin/payments' },
              { name: 'Product Reviews', path: '/admin/product-reviews' },
              { name: 'Seller Reviews', path: '/admin/seller-reviews' },
            ]
          },
          { name: 'User Management', path: '/admin/users', icon: <UserPlus size={18} /> },
          { name: 'Commission', path: '/admin/commission', icon: <DollarSign size={18} /> },
          { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
        ];
      case 'seller':
        return [
          { name: 'Dashboard', path: '/seller/dashboard', icon: <LayoutDashboard size={18} /> },
          { name: 'Products', path: '/seller/products', icon: <Package size={18} />,
            subItems: [
              { name: 'All Products', path: '/seller/products' },
              { name: 'Add Product', path: '/seller/products/new' },
            ]
          },
          { name: 'Inventory', path: '/seller/inventory', icon: <Boxes size={18} /> },
          { name: 'Orders', path: '/seller/orders', icon: <ShoppingCart size={18} /> },
          { name: 'Shipments', path: '/seller/shipments', icon: <Truck size={18} /> },
          { name: 'Transactions', path: '/seller/transactions', icon: <Repeat size={18} /> },
          { name: 'Customers', path: '/seller/customers', icon: <Users size={18} /> },
          { name: 'Reviews', path: '/seller/reviews', icon: <Star size={18} /> },
          { name: 'Team', path: '/seller/team', icon: <UserPlus size={18} /> },
          { name: 'Profile', path: '/seller/profile', icon: <User size={18} /> },
        ];
      case 'ondc':
        return [
          { name: 'Network Health', path: '/ondc/dashboard', icon: <Activity size={18} /> },
          { name: 'Transaction Explorer', path: '/ondc/transactions', icon: <Globe size={18} /> },
          { name: 'API Explorer', path: '/ondc/api', icon: <Terminal size={18} /> },
          { name: 'Network Monitoring', path: '/ondc/monitoring', icon: <BarChart2 size={18} /> },
        ];
      case 'tsp':
        return [
          { name: 'Control Center', path: '/tsp/dashboard', icon: <Server size={18} /> },
          { name: 'Sandbox', path: '/tsp/sandbox', icon: <Play size={18} /> },
          { name: 'Subscribers', path: '/tsp/subscribers', icon: <Users size={18} /> },
          { name: 'Environments', path: '/tsp/environments', icon: <Database size={18} /> },
          { name: 'Error Monitor', path: '/tsp/errors', icon: <ServerCrash size={18} /> },
        ];
      case 'pramaan':
        return [
          { name: 'Readiness Hub', path: '/pramaan/dashboard', icon: <Shield size={18} /> },
          { name: 'API Validation', path: '/pramaan/validation', icon: <FileCheck size={18} /> },
          { name: 'Audit Reports', path: '/pramaan/reports', icon: <FileText size={18} /> },
        ];
      case 'warehouse':
        return [
          { name: 'Dashboard', path: '/warehouse/dashboard', icon: <LayoutDashboard size={18} /> },
          { name: 'Warehouses', path: '/warehouse/list', icon: <Warehouse size={18} /> },
          { name: 'Inventory', path: '/warehouse/inventory', icon: <Boxes size={18} /> },
          { name: 'Logistics Tracker', path: '/warehouse/movement', icon: <ArrowRight size={18} /> },
        ];
      case 'b2b':
        return [
          { name: 'Dashboard', path: '/b2b/dashboard', icon: <Building2 size={18} /> },
          { name: 'Corporate Accounts', path: '/b2b/accounts', icon: <Users size={18} /> },
          { name: 'RFQ Management', path: '/b2b/rfq', icon: <ClipboardList size={18} /> },
          { name: 'Purchase Orders', path: '/b2b/orders', icon: <Receipt size={18} /> },
        ];
      case 'quickcommerce':
        return [
          { name: 'Dashboard', path: '/quickcommerce/dashboard', icon: <Zap size={18} /> },
          { name: 'Dark Stores', path: '/quickcommerce/stores', icon: <MapPin size={18} /> },
          { name: 'Live Orders', path: '/quickcommerce/live', icon: <Activity size={18} /> },
        ];
      case 'analytics':
        return [
          { name: 'Executive Overview', path: '/analytics/dashboard', icon: <BarChart2 size={18} /> },
          { name: 'Revenue', path: '/analytics/revenue', icon: <TrendingUp size={18} /> },
          { name: 'Platform Health', path: '/analytics/health', icon: <Activity size={18} /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getMenuItems();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 40,
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        borderBottom: '1px solid var(--border)',
        gap: '0.75rem',
        flexShrink: 0,
      }}>
        <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, var(--primary), #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.875rem' }}>V</div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', lineHeight: 1.2 }}>Value Marketplace</h2>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ONDC Commerce OS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
        {navItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isMenuActive = isActive(item.path) || item.subItems?.some(s => isActive(s.path));
          const isExpanded = expandedMenus.includes(item.name) || isMenuActive;

          return (
            <div key={item.name}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  color: isMenuActive ? 'var(--primary)' : 'var(--text-secondary)',
                  backgroundColor: isMenuActive && !hasSubItems ? 'var(--primary-light)' : 'transparent',
                  fontWeight: isMenuActive ? 600 : 400,
                  cursor: 'pointer',
                  border: 'none',
                  textAlign: 'left',
                  width: '100%',
                  fontSize: '0.875rem',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                }}
                onClick={() => {
                  if (hasSubItems) {
                    toggleMenu(item.name);
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                {item.icon}
                <span style={{ flex: 1 }}>{item.name}</span>
                {hasSubItems && (
                  isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                )}
              </button>

              {hasSubItems && isExpanded && (
                <div style={{ marginLeft: '1rem', marginTop: '0.125rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                  {item.subItems!.map(sub => (
                    <button
                      key={sub.name}
                      style={{
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.8125rem',
                        color: isActive(sub.path) ? 'var(--primary)' : 'var(--text-muted)',
                        fontWeight: isActive(sub.path) ? 600 : 400,
                        backgroundColor: isActive(sub.path) ? 'var(--primary-light)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        borderRadius: 'var(--radius-sm)',
                        width: '100%',
                        transition: 'all 0.15s',
                        fontFamily: 'inherit',
                      }}
                      onClick={() => navigate(sub.path)}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <p style={{ fontSize: '0.7rem', textAlign: 'center', color: 'var(--text-muted)', margin: 0 }}>
          Value Marketplace v2.0 · ONDC Certified
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
