import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { categories } from '../data/mockData';
import { Star, ShoppingCart, Heart, TrendingUp, Zap, ArrowRight } from 'lucide-react';

export const StorefrontHome: React.FC = () => {
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist } = useAppStore();
  const approvedProducts = products.filter(p => p.status === 'Approved');

  const featured = approvedProducts.slice(0, 4);
  const trending = approvedProducts.slice(2, 8);
  const newArrivals = [...approvedProducts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0058FF 0%, #6366f1 100%)', color: 'white', padding: '4rem 2rem', borderRadius: 'var(--radius-xl)', margin: '1rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.75rem', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            <Zap size={14} /> ONDC-Powered Marketplace
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15 }}>
            Discover Products from<br />India's Best Sellers
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '2rem' }}>
            Shop electronics, groceries, fashion & more from verified sellers across the Open Network for Digital Commerce.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '0.65rem 1.5rem', fontWeight: 600 }} onClick={() => navigate('/store/category/all')}>
              Shop Now <ArrowRight size={16} />
            </button>
            <button className="btn" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.65rem 1.5rem' }} onClick={() => navigate('/auth/register')}>
              Sell on ValueMall
            </button>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
        <div style={{ position: 'absolute', right: '80px', bottom: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}></div>
      </section>

      {/* Categories */}
      <section style={{ padding: '2.5rem 2rem' }}>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem' }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
          {categories.map(cat => (
            <div key={cat.id} className="card" style={{ textAlign: 'center', cursor: 'pointer', padding: '1.25rem 0.75rem', transition: 'all 0.2s' }}
              onClick={() => navigate(`/store/category/${cat.name}`)}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
              <p style={{ margin: '0.5rem 0 0', fontWeight: 600, fontSize: '0.875rem' }}>{cat.name}</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{cat.subcategories.length} subcategories</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '0 2rem 2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: 0 }}>Featured Products</h2>
          <Link to="/store/category/all" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>View All <ArrowRight size={14} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {featured.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product.id, 1)} onWishlist={() => addToWishlist(product.id)} onClick={() => navigate(`/store/product/${product.id}`)} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section style={{ padding: '0 2rem 2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <TrendingUp size={20} style={{ color: 'var(--danger)' }} />
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: 0 }}>Trending Now</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {trending.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product.id, 1)} onWishlist={() => addToWishlist(product.id)} onClick={() => navigate(`/store/product/${product.id}`)} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ padding: '0 2rem 3rem' }}>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem' }}>New Arrivals</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product.id, 1)} onWishlist={() => addToWishlist(product.id)} onClick={() => navigate(`/store/product/${product.id}`)} />
          ))}
        </div>
      </section>
    </div>
  );
};

interface ProductCardProps {
  product: any;
  onAddToCart: () => void;
  onWishlist: () => void;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onWishlist, onClick }) => {
  const discount = product.comparePrice > product.price ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}
      onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      <div style={{ position: 'relative' }} onClick={onClick}>
        <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        {discount > 0 && (
          <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: 'var(--danger)', color: 'white', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.7rem', fontWeight: 700 }}>
            {discount}% OFF
          </span>
        )}
        <button onClick={(e) => { e.stopPropagation(); onWishlist(); }} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', border: 'none', cursor: 'pointer' }}>
          <Heart size={14} style={{ color: 'var(--text-muted)' }} />
        </button>
      </div>
      <div style={{ padding: '1rem' }} onClick={onClick}>
        <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 500, margin: '0 0 0.25rem' }}>{product.category}</p>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.5rem', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Star size={12} fill="#f59e0b" stroke="#f59e0b" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{product.rating}</span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({product.reviewCount})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{product.price.toLocaleString()}</span>
          {product.comparePrice > product.price && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.comparePrice.toLocaleString()}</span>
          )}
        </div>
      </div>
      <div style={{ padding: '0 1rem 1rem' }}>
        <button onClick={(e) => { e.stopPropagation(); onAddToCart(); }} className="btn btn-primary w-full" style={{ padding: '0.45rem', fontSize: '0.8125rem' }}>
          <ShoppingCart size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default StorefrontHome;
