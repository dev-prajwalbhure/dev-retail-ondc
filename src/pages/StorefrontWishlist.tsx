import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

export const StorefrontWishlist: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, products, removeFromWishlist, addToCart } = useAppStore();

  const items = wishlist.map(w => ({
    ...w,
    product: products.find(p => p.id === w.productId)!
  })).filter(w => w.product !== undefined);

  return (
    <div className="animate-fade-in container" style={{ padding: '2rem 4rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>My Wishlist</h1>

      {items.length === 0 ? (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <Heart size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem' }}>Your wishlist is empty</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Save items you like and buy them later.</p>
          <button className="btn btn-primary" onClick={() => navigate('/store')}>Explore Products</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {items.map(item => (
            <div key={item.productId} className="card hover-scale" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ height: '200px', backgroundColor: 'var(--bg-base)', position: 'relative', cursor: 'pointer' }} onClick={() => navigate(`/store/product/${item.productId}`)}>
                <img src={item.product.images[0] || 'https://via.placeholder.com/280x200'} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.productId); }}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'white', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1rem', margin: '0 0 1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.product.name}</h3>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{item.product.price.toLocaleString()}</span>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    onClick={() => addToCart(item.productId, 1, item.product.variants?.[0]?.id)}
                  >
                    <ShoppingCart size={16} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorefrontWishlist;
