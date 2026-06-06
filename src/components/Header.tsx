import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Moon, Sun, ChevronDown, LogOut, Home } from 'lucide-react';
import { useAppStore } from '../store';

interface HeaderProps {
  workspace: string;
}

const workspaceNames: Record<string, string> = {
  admin: 'Super Admin',
  seller: 'Seller OS',
  ondc: 'ONDC Operations',
  tsp: 'TSP Control Center',
  pramaan: 'Pramaan Readiness',
  analytics: 'Executive Analytics',
  warehouse: 'Warehouse Portal',
  b2b: 'B2B Commerce',
  quickcommerce: 'Quick Commerce',
};

export const Header: React.FC<HeaderProps> = ({ workspace }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAppStore();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'var(--bg-surface)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <div className="flex items-center gap-4">
        {/* Workspace name */}
        <div>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
            {workspaceNames[workspace] || 'Value Marketplace'}
          </h1>
        </div>

        {/* Workspace Switcher */}
        <div style={{ position: 'relative' }}>
          <select
            className="input"
            style={{ padding: '0.3rem 2rem 0.3rem 0.75rem', appearance: 'none', cursor: 'pointer', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)', fontSize: '0.8rem', borderRadius: 'var(--radius-md)' }}
            value={workspace}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'store') navigate('/store');
              else navigate(`/${val}/dashboard`);
            }}
          >
            <option value="store">🛒 Buyer App</option>
            <option value="seller">📦 Seller OS</option>
            <option value="admin">🔑 Super Admin</option>
            <option value="ondc">🌐 ONDC Operations</option>
            <option value="tsp">🖥️ TSP Console</option>
            <option value="pramaan">🛡️ Pramaan</option>
            <option value="warehouse">🏭 Warehouse</option>
            <option value="b2b">🏢 B2B Commerce</option>
            <option value="quickcommerce">⚡ Quick Commerce</option>
            <option value="analytics">📊 Analytics</option>
          </select>
          <ChevronDown size={14} className="text-muted" style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={16} className="text-muted" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search..."
            className="input"
            style={{ paddingLeft: '2.25rem', width: '240px', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem' }}
          />
        </div>

        {/* Home */}
        <button onClick={() => navigate('/store')} style={{ color: 'var(--text-secondary)', padding: '0.4rem' }} title="Buyer App">
          <Home size={18} />
        </button>

        {/* Theme */}
        <button onClick={toggleTheme} style={{ color: 'var(--text-secondary)', padding: '0.4rem' }}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <button style={{ color: 'var(--text-secondary)', padding: '0.4rem', position: 'relative' }}>
          <Bell size={18} />
          <span style={{ position: 'absolute', top: '2px', right: '2px', width: '7px', height: '7px', backgroundColor: 'var(--danger)', borderRadius: '50%' }}></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2" style={{ borderLeft: '1px solid var(--border)', paddingLeft: '1rem', marginLeft: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
            {currentUser?.name?.charAt(0) || 'G'}
          </div>
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>{currentUser?.name || 'Guest'}</p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: 0, textTransform: 'capitalize' }}>{currentUser?.role || 'Visitor'}</p>
          </div>
          {currentUser && (
            <button
              onClick={() => { logout(); navigate('/'); }}
              style={{ color: 'var(--text-muted)', padding: '0.25rem', marginLeft: '0.25rem' }}
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
