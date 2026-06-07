import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Globe, Package, Server, Activity, Store, Code, Building2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const portals = [
  { title: 'Buyer Marketplace', desc: 'Shop products from multiple sellers across the ONDC network.', icon: <ShoppingBag size={24} />, path: '/store', color: '#3b82f6' },
  { title: 'Seller OS', desc: 'Manage catalog, inventory, and fulfill network orders.', icon: <Store size={24} />, path: '/seller/dashboard', color: '#10b981' },
  { title: 'Logistics Engine', desc: 'Fleet tracking, route optimization, and delivery management.', icon: <Package size={24} />, path: '/logistics/dashboard', color: '#f59e0b' },
  { title: 'ONDC Operations', desc: 'Transaction explorer and network monitoring.', icon: <Globe size={24} />, path: '/ondc/dashboard', color: '#8b5cf6' },
  { title: 'TSP Console', desc: 'Subscriber management and sandbox testing.', icon: <Server size={24} />, path: '/tsp/dashboard', color: '#ea580c' },
  { title: 'Pramaan Readiness', desc: 'Certification compliance and API validation.', icon: <Activity size={24} />, path: '/pramaan/dashboard', color: '#06b6d4' },
  { title: 'B2B Commerce', desc: 'Corporate accounts, RFQs, and bulk purchasing.', icon: <Building2 size={24} />, path: '/b2b/dashboard', color: '#0ea5e9' },
  { title: 'Quick Commerce', desc: 'Dark stores, hyperlocal delivery, and rapid fulfillment.', icon: <Zap size={24} />, path: '/quickcommerce/dashboard', color: '#eab308' },
  { title: 'ONDC API Explorer', desc: 'Live protocol documentation and interactive state inspector.', icon: <Code size={24} />, path: '/ondc-api', color: '#14b8a6' },
];

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ padding: '1.5rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Value<span style={{ color: 'var(--primary)' }}>OS</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="button" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, backgroundColor: 'transparent', color: 'var(--text-primary)' }} onClick={() => navigate('/store')}>
            Explore Store
          </button>
          <button className="button" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, backgroundColor: 'var(--primary)', color: 'white', borderRadius: '2rem' }} onClick={() => navigate('/auth/login')}>
            Sign In <ArrowRight size={16} />
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section style={{ padding: '8rem 5% 6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
        {/* Animated Background Gradients */}
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', top: '-20%', right: '-10%', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', bottom: '-10%', left: '-5%', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }} />
        
        <div style={{ maxWidth: '900px', zIndex: 1 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
            <span style={{ padding: '0.5rem 1.25rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
              <Globe size={16} /> Welcome to the ONDC Ecosystem
            </span>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: '#0f172a', letterSpacing: '-0.03em' }}
          >
            One Network. <br/><span style={{ background: 'linear-gradient(135deg, var(--primary), #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Infinite Possibilities.</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 3rem' }}
          >
            A unified, decentralized operating system bridging Sellers, Buyers, TSPs, and Logistics partners on the open network.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
          >
            <button className="button" style={{ padding: '1rem 2rem', fontSize: '1.125rem', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '2rem', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)' }} onClick={() => navigate('/store')}>
              <ShoppingBag size={20} /> Enter Marketplace
            </button>
            <button className="button" style={{ padding: '1rem 2rem', fontSize: '1.125rem', backgroundColor: 'white', color: 'var(--text-primary)', borderRadius: '2rem', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }} onClick={() => navigate('/auth/login')}>
              Partner Login
            </button>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Portals Grid */}
      <section style={{ padding: '5rem 5%', backgroundColor: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Choose Your Portal</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>Navigate through specialized environments built for every participant in the network.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {portals.map((portal, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => navigate(portal.path)}
              style={{ 
                padding: '2rem', 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', backgroundColor: `${portal.color}15`, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: portal.color }}>
                {portal.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{portal.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, flex: 1 }}>{portal.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: portal.color, fontWeight: 600, fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Access Portal <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 5%', backgroundColor: 'var(--text-primary)', color: 'white', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <ShoppingBag size={24} color="var(--primary)" />
          <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>ValueOS</span>
        </div>
        <p style={{ opacity: 0.6, fontSize: '0.875rem' }}>© 2026 ONDC Commerce Ecosystem. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
