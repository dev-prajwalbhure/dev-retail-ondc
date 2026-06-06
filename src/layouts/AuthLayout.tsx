import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-base)' }}>
      {/* Simple Header for Auth/Landing pages */}
      <header style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', padding: '0 2rem', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-surface)' }}>
        <h2 className="text-primary" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Value Marketplace</h2>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <a href="/auth/login" className="text-secondary hover:text-primary font-medium">Log in</a>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
