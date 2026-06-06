import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, CreditCard, AlertTriangle, ArrowRight } from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const { orders, products, sellerProfiles, currentUser } = useAppStore();
  const navigate = useNavigate();
  const profile = sellerProfiles.find(s => s.sellerId === currentUser?.id) || sellerProfiles[0];
  const sellerOrders = orders.filter(o => o.sellerId === profile.sellerId);
  const sellerProducts = products.filter(p => p.sellerId === profile.sellerId);

  const lowStockProducts = sellerProducts.filter(p => p.stock < 20);
  const pendingOrders = sellerOrders.filter(o => o.status === 'Pending' || o.status === 'Processing');
  const recentOrders = sellerOrders.slice(0, 5);

  // Revenue by month (simple CSS chart)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenues = [45000, 62000, 58000, 73000, 81000, 69000];
  const maxRev = Math.max(...revenues);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 0.25rem', fontSize: '0.8125rem' }}>Welcome back,</p>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{currentUser?.name || 'Seller'} 👋</h2>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard icon={<DollarSign size={20} />} label="Total Sales" value={profile.totalSales} prefix="₹" trend="12.5%" trendUp />
        <StatCard icon={<CreditCard size={20} />} label="Total Payout" value={profile.totalPayout} prefix="₹" trend="8.2%" trendUp />
        <StatCard icon={<ShoppingCart size={20} />} label="Total Orders" value={profile.totalOrders} trend="15.3%" trendUp />
        <StatCard icon={<Users size={20} />} label="Customers" value={profile.totalCustomers} trend="5.1%" trendUp />
      </div>

      {/* Secondary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard icon={<Package size={20} />} label="Active Products" value={sellerProducts.filter(p => p.status === 'Approved').length} />
        <StatCard icon={<TrendingUp size={20} />} label="Avg Order Value" value={profile.averageOrderSell} prefix="₹" />
        <StatCard icon={<DollarSign size={20} />} label="Remaining Payout" value={profile.remainingPayout} prefix="₹" trend="Pending" trendUp={false} />
        <StatCard icon={<AlertTriangle size={20} />} label="Pending Orders" value={pendingOrders.length} />
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Revenue Chart */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Revenue Overview</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '180px' }}>
            {months.map((month, i) => (
              <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>₹{(revenues[i] / 1000).toFixed(0)}k</span>
                <div style={{
                  width: '100%', maxWidth: '48px',
                  height: `${(revenues[i] / maxRev) * 140}px`,
                  background: `linear-gradient(180deg, var(--primary) 0%, #6366f1 100%)`,
                  borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                  transition: 'height 0.5s ease',
                  opacity: 0.85,
                }}></div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>⚠️ Low Stock Alerts</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 600 }}>{lowStockProducts.length} items</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflowY: 'auto' }}>
            {lowStockProducts.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', textAlign: 'center', padding: '2rem 0' }}>All products are well-stocked!</p>
            ) : lowStockProducts.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', backgroundColor: 'var(--danger-bg)', borderRadius: 'var(--radius-md)' }}>
                <img src={p.images[0]} alt="" style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 500, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: 600, margin: 0 }}>{p.stock} units left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>Recent Orders</h3>
          <button onClick={() => navigate('/seller/orders')} style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            View All <ArrowRight size={14} />
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontWeight: 600 }}>Order ID</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left', fontWeight: 600 }}>Items</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>Total</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center', fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: 'var(--primary)' }}>{order.id}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{order.customerName}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{order.items.length} item(s)</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>₹{order.total.toLocaleString()}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={order.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerDashboard;
