import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { LogIn } from 'lucide-react';

const quickAccess = [
  { label: 'Customer', email: 'customer@valuemarketplace.com', color: '#0058FF' },
  { label: 'Seller', email: 'seller@valuemarketplace.com', color: '#059669' },
  { label: 'Super Admin', email: 'admin@valuemarketplace.com', color: '#dc2626' },
  { label: 'TSP Admin', email: 'tsp@valuemarketplace.com', color: '#ea580c' },
  { label: 'Operations', email: 'operations@valuemarketplace.com', color: '#7c3aed' },
  { label: 'Warehouse', email: 'warehouse@valuemarketplace.com', color: '#4f46e5' },
];

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, users } = useAppStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email === email);
    if (user) {
      login(email);
      navigate(user.defaultWorkspace);
    } else {
      setError('Invalid credentials. Use one of the quick access buttons below.');
    }
  };

  const handleQuickLogin = (loginEmail: string) => {
    login(loginEmail);
    const user = users.find(u => u.email === loginEmail);
    if (user) navigate(user.defaultWorkspace);
  };

  return (
    <div className="animate-fade-in" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, var(--primary), #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.25rem', margin: '0 auto 1rem' }}>V</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>Sign in to Value Marketplace Commerce OS</p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email Address</label>
              <input type="email" className="input" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
              <input type="password" className="input" placeholder="Enter password" defaultValue="password" />
            </div>
            {error && <p style={{ color: 'var(--danger)', fontSize: '0.8125rem', margin: 0 }}>{error}</p>}
            <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.65rem', marginTop: '0.5rem' }}>
              <LogIn size={16} /> Sign In
            </button>
          </form>

          <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Quick Access</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {quickAccess.map(qa => (
              <button
                key={qa.label}
                onClick={() => handleQuickLogin(qa.email)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-base)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: qa.color, flexShrink: 0 }}></div>
                {qa.label}
              </button>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '1.5rem' }}>
          New seller? <a href="/auth/register" style={{ color: 'var(--primary)', fontWeight: 500 }}>Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
