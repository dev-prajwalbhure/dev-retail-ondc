import React from 'react';
import { useAppStore } from '../store';
import { StatCard } from '../components/StatCard';
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, Store, Activity, Globe } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { orders, products, sellerProfiles, customers, ondcTransactions } = useAppStore();
  const totalRevenue = orders.reduce((sum, o) => sum + o.grossAmount, 0);
  const totalCommission = orders.reduce((sum, o) => sum + o.commission, 0);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenues = [120000, 185000, 210000, 178000, 245000, totalRevenue];
  const maxRev = Math.max(...revenues);

  const categoryRevenue: Record<string, number> = {};
  orders.forEach(o => {
    o.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        categoryRevenue[product.category] = (categoryRevenue[product.category] || 0) + item.price * item.quantity;
      }
    });
  });
  const catEntries = Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1]);
  const maxCatRev = catEntries.length > 0 ? catEntries[0][1] : 1;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Executive Analytics</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Platform-wide business intelligence overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard icon={<DollarSign size={20} />} label="Total GMV" value={totalRevenue} prefix="₹" trend="24.5%" trendUp />
        <StatCard icon={<TrendingUp size={20} />} label="Commission Revenue" value={totalCommission} prefix="₹" trend="18.2%" trendUp />
        <StatCard icon={<ShoppingCart size={20} />} label="Total Orders" value={orders.length} trend="31.4%" trendUp />
        <StatCard icon={<Globe size={20} />} label="ONDC Transactions" value={ondcTransactions.length} trend="15.8%" trendUp />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Revenue Trend */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.5rem' }}>Revenue Trend</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', height: '200px' }}>
            {months.map((month, i) => (
              <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>₹{(revenues[i] / 1000).toFixed(0)}k</span>
                <div style={{ width: '100%', maxWidth: '60px', height: `${(revenues[i] / maxRev) * 160}px`, background: 'linear-gradient(180deg, var(--primary) 0%, #6366f1 100%)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', opacity: 0.85 }}></div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem' }}>Revenue by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {catEntries.map(([cat, rev]) => (
              <div key={cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{cat}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>₹{rev.toLocaleString()}</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-full)' }}>
                  <div style={{ width: `${(rev / maxCatRev) * 100}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Health */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard icon={<Store size={20} />} label="Active Sellers" value={sellerProfiles.filter(s => s.status === 'Active').length} />
        <StatCard icon={<Package size={20} />} label="Live Products" value={products.filter(p => p.status === 'Approved').length} />
        <StatCard icon={<Users size={20} />} label="Registered Customers" value={customers.length} />
        <StatCard icon={<Activity size={20} />} label="ONDC Success Rate" value={`${Math.round(ondcTransactions.filter(t => t.status === 'success').length / (ondcTransactions.length || 1) * 100)}%`} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
