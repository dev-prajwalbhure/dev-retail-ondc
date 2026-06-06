import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Server, Shield, Activity, Globe, ShoppingBag, Warehouse, Building2, Zap, ArrowRight, Code } from 'lucide-react';

const portals = [
  { title: 'Buyer Marketplace', desc: 'Shop products from multiple sellers across the ONDC network.', icon: <ShoppingBag size={24} />, path: '/store', color: '#0058FF', credential: 'customer@valuemarketplace.com' },
  { title: 'Seller Dashboard', desc: 'Manage products, orders, inventory, and fulfillment.', icon: <Store size={24} />, path: '/seller/dashboard', color: '#059669', credential: 'seller@valuemarketplace.com' },
  { title: 'Super Admin', desc: 'Platform-wide moderation, commissions, and settings.', icon: <Shield size={24} />, path: '/admin/dashboard', color: '#dc2626', credential: 'admin@valuemarketplace.com' },
  { title: 'ONDC Operations', desc: 'Transaction explorer and network monitoring.', icon: <Globe size={24} />, path: '/ondc/dashboard', color: '#7c3aed', credential: 'operations@valuemarketplace.com' },
  { title: 'TSP Console', desc: 'Subscriber management and sandbox testing.', icon: <Server size={24} />, path: '/tsp/dashboard', color: '#ea580c', credential: 'tsp@valuemarketplace.com' },
  { title: 'Pramaan Readiness', desc: 'Certification compliance and API validation.', icon: <Activity size={24} />, path: '/pramaan/dashboard', color: '#0891b2', credential: 'admin@valuemarketplace.com' },
  { title: 'Warehouse Portal', desc: 'Multi-warehouse inventory and stock management.', icon: <Warehouse size={24} />, path: '/warehouse/dashboard', color: '#4f46e5', credential: 'warehouse@valuemarketplace.com' },
  { title: 'B2B Commerce', desc: 'Corporate accounts, RFQs, and bulk purchasing.', icon: <Building2 size={24} />, path: '/b2b/dashboard', color: '#0d9488', credential: 'admin@valuemarketplace.com' },
  { title: 'Quick Commerce', desc: 'Dark stores, hyperlocal delivery, and rapid fulfillment.', icon: <Zap size={24} />, path: '/quickcommerce/dashboard', color: '#f59e0b', credential: 'admin@valuemarketplace.com' },
  { title: 'ONDC API Explorer', desc: 'Live protocol documentation and interactive state inspector.', icon: <Code size={24} />, path: '/ondc-api', color: '#10b981', credential: 'Public Sandbox' },
];

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', color: 'white', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontWeight: 600, fontSize: '0.875rem', marginBottom: '2rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <Globe size={16} /> ONDC-Native Commerce Platform
          </div>
          <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            The Complete Commerce<br />
            <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Operating System</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Multi-vendor marketplace, ONDC compliance, B2B commerce, quick commerce, and TSP capabilities — all in one platform.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }} onClick={() => navigate('/store')}>
              <ShoppingBag size={18} /> Explore Marketplace
            </button>
            <button className="btn" style={{ padding: '0.75rem 2rem', fontSize: '1rem', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }} onClick={() => navigate('/auth/login')}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
          {[
            { value: '15+', label: 'Product SKUs' },
            { value: '9', label: 'User Roles' },
            { value: '5', label: 'Commerce Modes' },
            { value: '100%', label: 'ONDC Compliant' },
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>{s.value}</p>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portal Grid */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--bg-base)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Platform Portals</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>Access any workspace with role-based authentication. Sample credentials provided for testing.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {portals.map((portal, i) => (
              <div key={i} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                onClick={() => navigate(portal.path)}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-lg)', backgroundColor: `${portal.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: portal.color }}>
                  {portal.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{portal.title}</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.8125rem', flex: 1 }}>{portal.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                  <code style={{ fontSize: '0.7rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-base)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>{portal.credential}</code>
                  <ArrowRight size={16} style={{ color: portal.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.8125rem' }}>
          Value Marketplace v2.0 · ONDC Certified · Built for the Open Network for Digital Commerce
        </p>
      </footer>
    </div>
  );
};

export default Landing;
