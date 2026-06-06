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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <Sidebar workspace={workspace} />
      <div style={{ flex: 1, marginLeft: 'var(--sidebar-width)', display: 'flex', flexDirection: 'column' }}>
        <Header workspace={workspace} />
        <main style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
