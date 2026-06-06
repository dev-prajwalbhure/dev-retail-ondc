import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { ShoppingCart, User as UserIcon, LogOut, Home } from 'lucide-react';

export const StorefrontLayout: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, cart, logout } = useAppStore();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      {/* Buyer App Top Nav */}
      <header style={{ height: '80px', backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4rem', position: 'sticky', top: 0, zIndex: 50 }}>
        
        <div className="flex items-center gap-8">
          <h1 className="text-primary" style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>ValueMall</h1>
          
          <nav className="flex gap-6">
            <Link to="/store" className="text-secondary hover:text-primary font-medium flex items-center gap-1">
              <Home size={18} /> Home
            </Link>
            <a href="#" className="text-secondary hover:text-primary font-medium">Categories</a>
            <a href="#" className="text-secondary hover:text-primary font-medium">Deals</a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="input"
              style={{ width: '300px', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem' }}
              onChange={(e) => {
                useAppStore.getState().setSearchQuery(e.target.value);
                if (window.location.pathname !== '/store/search') navigate('/store/search');
              }}
            />
          </div>

          <Link to="/store/cart" className="text-secondary hover:text-primary relative p-2">
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'var(--danger)', color: 'white', fontSize: '0.75rem', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {cartItemsCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-4 border-l pl-4" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserIcon size={16} className="text-primary" />
                </div>
                <span className="font-medium text-sm">{currentUser.name}</span>
              </div>
              <button onClick={handleLogout} className="text-muted hover:text-danger" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/auth/login" className="btn btn-primary">Sign In</Link>
          )}
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '4rem', marginTop: 'auto' }}>
        <div className="container flex justify-between">
          <div>
            <h2 className="text-primary" style={{ fontSize: '1.25rem', fontWeight: 700 }}>ValueMall</h2>
            <p className="text-muted mt-2">Powered by Value Marketplace & ONDC.</p>
          </div>
          <div className="flex gap-16">
            <div className="flex-col gap-2">
              <h4 className="font-bold mb-2">Shop</h4>
              <a href="#" className="text-secondary text-sm">Electronics</a>
              <a href="#" className="text-secondary text-sm">Groceries</a>
              <a href="#" className="text-secondary text-sm">Fashion</a>
            </div>
            <div className="flex-col gap-2">
              <h4 className="font-bold mb-2">Account</h4>
              <Link to="/store/orders" className="text-secondary text-sm">My Orders</Link>
              <a href="#" className="text-secondary text-sm">Profile</a>
              <a href="#" className="text-secondary text-sm">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StorefrontLayout;
