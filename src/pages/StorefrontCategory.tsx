import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Filter, Star, ShoppingCart } from 'lucide-react';

export const StorefrontCategory: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { products, addToCart, searchQuery } = useAppStore();
  const [priceFilter, setPriceFilter] = useState<number>(100000);
  const [sortBy, setSortBy] = useState('recommended');

  const categoryName = name ? decodeURIComponent(name).replace(/-/g, ' ') : 'All Products';
  
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.status === 'Approved' && p.price <= priceFilter);
    if (categoryName !== 'All Products') {
      filtered = filtered.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
    }
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    switch (sortBy) {
      case 'price-low': return filtered.sort((a, b) => a.price - b.price);
      case 'price-high': return filtered.sort((a, b) => b.price - a.price);
      case 'rating': return filtered.sort((a, b) => b.rating - a.rating);
      default: return filtered;
    }
  }, [products, categoryName, priceFilter, sortBy]);

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', padding: '2rem 4rem', minHeight: 'calc(100vh - 160px)' }}>
      
      {/* Sidebar Filters */}
      <div className="card" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Filter size={18} /> Filters</h3>
        
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>Categories</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Electronics', 'Fashion', 'Home', 'Groceries'].map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={categoryName.toLowerCase() === cat.toLowerCase()} onChange={() => navigate(`/store/category/${cat.toLowerCase()}`)} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>Max Price: ₹{priceFilter.toLocaleString()}</h4>
          <input 
            type="range" 
            min="100" max="100000" step="100" 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>
      </div>

      {/* Main Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem', textTransform: 'capitalize' }}>{categoryName}</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Showing {filteredProducts.length} products</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Sort by:</span>
            <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No products found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your filters or browsing another category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredProducts.map(product => (
              <div key={product.id} className="card hover-scale" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/store/product/${product.id}`)}>
                <div style={{ height: '200px', backgroundColor: 'var(--bg-base)', position: 'relative' }}>
                  <img src={product.images[0] || 'https://via.placeholder.com/280x200'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'white', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <Star size={12} style={{ color: '#fbbf24', fill: '#fbbf24' }} /> {product.rating}
                  </div>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1rem', margin: '0 0 1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</h3>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{product.price.toLocaleString()}</span>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '0.5rem', borderRadius: '50%' }}
                      onClick={(e) => { e.stopPropagation(); addToCart(product.id, 1, product.variants?.[0]?.id); }}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorefrontCategory;
