import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const StorefrontProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist, reviews, sellerProfiles } = useAppStore();

  const product = products.find(p => p.id === id);
  if (!product) return <div style={{ padding: '3rem', textAlign: 'center' }}><p>Product not found.</p><button className="btn btn-primary" onClick={() => navigate('/store')}>Back to Store</button></div>;

  const seller = sellerProfiles.find(s => s.sellerId === product.sellerId);
  const productReviews = reviews.filter(r => r.targetId === product.id && r.type === 'product' && r.status === 'Approved');
  
  // Find same product from different sellers
  const otherSellers = products.filter(p => p.name === product.name && p.id !== product.id && p.status === 'Approved');

  const discount = product.comparePrice > product.price ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.875rem' }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Image */}
        <div>
          <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.8125rem', margin: '0 0 0.5rem' }}>{product.category} › {product.subcategory}</p>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem', lineHeight: 1.3 }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.round(product.rating) ? '#f59e0b' : 'none'} stroke={s <= Math.round(product.rating) ? '#f59e0b' : '#d1d5db'} />)}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{product.rating}</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800 }}>₹{product.price.toLocaleString()}</span>
            {product.comparePrice > product.price && (
              <>
                <span style={{ fontSize: '1.125rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.comparePrice.toLocaleString()}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--success)', fontWeight: 600 }}>{discount}% off</span>
              </>
            )}
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{product.description}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>Available Options</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.variants.map(v => (
                  <span key={v.id} style={{ padding: '0.4rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', cursor: 'pointer' }}>
                    {v.attributes.map(a => a.value).join(' / ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button className="btn btn-primary" style={{ flex: 1, padding: '0.75rem' }} onClick={() => addToCart(product.id, 1)}>
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button className="btn btn-outline" style={{ padding: '0.75rem' }} onClick={() => addToWishlist(product.id)}>
              <Heart size={16} />
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ textAlign: 'center' }}>
              <Truck size={18} style={{ color: 'var(--primary)', marginBottom: '0.25rem' }} />
              <p style={{ fontSize: '0.7rem', margin: 0, fontWeight: 500 }}>Free Shipping</p>
              <p style={{ fontSize: '0.6rem', margin: 0, color: 'var(--text-muted)' }}>Orders above ₹499</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Shield size={18} style={{ color: 'var(--success)', marginBottom: '0.25rem' }} />
              <p style={{ fontSize: '0.7rem', margin: 0, fontWeight: 500 }}>ONDC Verified</p>
              <p style={{ fontSize: '0.6rem', margin: 0, color: 'var(--text-muted)' }}>Network certified</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <RotateCcw size={18} style={{ color: 'var(--warning)', marginBottom: '0.25rem' }} />
              <p style={{ fontSize: '0.7rem', margin: 0, fontWeight: 500 }}>Easy Returns</p>
              <p style={{ fontSize: '0.6rem', margin: 0, color: 'var(--text-muted)' }}>15-day policy</p>
            </div>
          </div>

          {/* Seller */}
          {seller && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <img src={seller.logoUrl} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, margin: 0, fontSize: '0.875rem' }}>{seller.shopName}</p>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.75rem' }}>⭐ {seller.rating} rating · {seller.totalReviews} reviews</p>
              </div>
              <StatusBadge status={seller.status} />
            </div>
          )}
        </div>
      </div>

      {/* Multi-Seller Comparison */}
      {otherSellers.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '3rem auto 0' }}>
          <h3 style={{ marginBottom: '1rem' }}>🔄 Compare Sellers for this Product</h3>
          <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Seller</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Price</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Rating</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Stock</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--primary-light)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{seller?.shopName} <span style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>(Current)</span></td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>₹{product.price.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>⭐ {product.rating}</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}><button className="btn btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }} onClick={() => addToCart(product.id, 1)}>Add</button></td>
                </tr>
                {otherSellers.map(op => {
                  const otherSeller = sellerProfiles.find(s => s.sellerId === op.sellerId);
                  return (
                    <tr key={op.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.75rem 1rem' }}>{otherSeller?.shopName}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>₹{op.price.toLocaleString()}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>⭐ {op.rating}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>{op.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}><button className="btn btn-outline" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }} onClick={() => addToCart(op.id, 1)}>Add</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0' }}>
        <h3 style={{ marginBottom: '1rem' }}>Customer Reviews ({productReviews.length})</h3>
        {productReviews.length === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}><p style={{ color: 'var(--text-muted)' }}>No reviews yet for this product.</p></div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {productReviews.map(r => (
              <div key={r.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>{r.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= r.rating ? '#f59e0b' : 'none'} stroke={s <= r.rating ? '#f59e0b' : '#d1d5db'} />)}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{r.customerName} · {new Date(r.timestamp).toLocaleDateString()}</p>
                </div>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorefrontProductDetail;
