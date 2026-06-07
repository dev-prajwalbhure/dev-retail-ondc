import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

const allWorkspaces = ['admin', 'seller', 'ondc', 'tsp', 'pramaan', 'analytics', 'warehouse', 'b2b', 'quickcommerce'];

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const workspace = allWorkspaces.includes(path) ? path : 'seller';

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
      <Sidebar workspace={workspace} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header workspace={workspace} />
        <main className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
