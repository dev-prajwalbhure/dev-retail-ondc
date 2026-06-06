import React from 'react';
import { useAppStore } from '../store';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { DollarSign, ShoppingCart, Package, Users, Store, TrendingUp, AlertTriangle, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { orders, products, sellerProfiles, customers, payoutRequests } = useAppStore();
  const navigate = useNavigate();
  const totalRevenue = orders.reduce((sum, o) => sum + o.grossAmount, 0);
  const totalCommission = orders.reduce((sum, o) => sum + o.commission, 0);
  const activeSellers = sellerProfiles.filter(s => s.status === 'Active').length;
  const approvedProducts = products.filter(p => p.status === 'Approved').length;
  const pendingProducts = products.filter(p => p.status === 'Pending').length;
  const pendingPayouts = payoutRequests.filter(p => p.status === 'Pending');
  const recentOrders = orders.slice(0, 6);

  // Revenue by seller
  const sellerRevenue = sellerProfiles.map(sp => ({
    name: sp.shopName,
    revenue: orders.filter(o => o.sellerId === sp.sellerId).reduce((sum, o) => sum + o.grossAmount, 0),
    orders: orders.filter(o => o.sellerId === sp.sellerId).length,
  }));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Marketplace Overview</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Platform-wide metrics and operations</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard icon={<DollarSign size={20} />} label="Marketplace GMV" value={totalRevenue} prefix="₹" trend="18.5%" trendUp />
        <StatCard icon={<TrendingUp size={20} />} label="Commission Earned" value={totalCommission} prefix="₹" trend="12.3%" trendUp />
        <StatCard icon={<ShoppingCart size={20} />} label="Total Orders" value={orders.length} trend="22.1%" trendUp />
        <StatCard icon={<Users size={20} />} label="Total Customers" value={customers.length} trend="9.7%" trendUp />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard icon={<Store size={20} />} label="Active Sellers" value={activeSellers} />
        <StatCard icon={<Package size={20} />} label="Live Products" value={approvedProducts} />
        <StatCard icon={<AlertTriangle size={20} />} label="Pending Approval" value={pendingProducts} />
        <StatCard icon={<Activity size={20} />} label="Pending Payouts" value={pendingPayouts.length} />
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Seller Performance */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem' }}>Seller Performance</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'left' }}>Seller</th>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>Revenue</th>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>Orders</th>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sellerProfiles.map(sp => {
                const rev = sellerRevenue.find(r => r.name === sp.shopName);
                return (
                  <tr key={sp.sellerId} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.6rem 0.5rem', fontWeight: 500 }}>{sp.shopName}</td>
                    <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>₹{(rev?.revenue || 0).toLocaleString()}</td>
                    <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>{rev?.orders || 0}</td>
                    <td style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}><StatusBadge status={sp.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pending Payouts */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Pending Payouts</h3>
            <button onClick={() => navigate('/admin/payments')} style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          {pendingPayouts.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>No pending payouts</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {pendingPayouts.map(p => {
                const seller = sellerProfiles.find(s => s.sellerId === p.sellerId);
                return (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <p style={{ fontWeight: 500, margin: 0, fontSize: '0.875rem' }}>{seller?.shopName}</p>
                      <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.75rem' }}>{p.method}</p>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>₹{p.amount.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>Recent Marketplace Orders</h3>
          <button onClick={() => navigate('/admin/orders')} style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View All <ArrowRight size={14} />
          </button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'left' }}>Seller</th>
              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'right' }}>Commission</th>
              <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => {
              const seller = sellerProfiles.find(s => s.sellerId === order.sellerId);
              return (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: 'var(--primary)' }}>{order.id}</td>
                  <td style={{ padding: '0.6rem 0.5rem' }}>{order.customerName}</td>
                  <td style={{ padding: '0.6rem 0.5rem' }}>{seller?.shopName}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>₹{order.total.toLocaleString()}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right', color: 'var(--success)' }}>₹{order.commission.toLocaleString()}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}><StatusBadge status={order.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
