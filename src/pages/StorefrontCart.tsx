import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

export const StorefrontCart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, products, removeFromCart, updateCartQuantity, currentUser } = useAppStore();

  const cartItems = cart.map(ci => {
    const product = products.find(p => p.id === ci.productId);
    return { ...ci, product };
  }).filter(ci => ci.product);

  const subtotal = cartItems.reduce((sum, ci) => sum + (ci.product!.price * ci.quantity), 0);
  const tax = Math.round(subtotal * 0.09);
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
        <ShoppingBag size={64} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} />
        <h2 style={{ marginBottom: '0.75rem' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Looks like you haven't added any items to your cart yet.</p>
        <button className="btn btn-primary" onClick={() => navigate('/store')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <button onClick={() => navigate('/store')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.875rem' }}>
        <ArrowLeft size={16} /> Continue Shopping
      </button>
      <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem' }}>Shopping Cart ({cartItems.length} items)</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map(ci => (
            <div key={ci.productId} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
              <img src={ci.product!.images[0]} alt="" style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Link to={`/store/product/${ci.productId}`} style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)', textDecoration: 'none' }}>{ci.product!.name}</Link>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>{ci.product!.category}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={() => updateCartQuantity(ci.productId, ci.quantity - 1)} style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: 'var(--bg-base)' }}><Minus size={12} /></button>
                    <span style={{ fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>{ci.quantity}</span>
                    <button onClick={() => updateCartQuantity(ci.productId, ci.quantity + 1)} style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: 'var(--bg-base)' }}><Plus size={12} /></button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>₹{(ci.product!.price * ci.quantity).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(ci.productId)} style={{ color: 'var(--danger)', padding: '0.25rem', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.125rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontWeight: 500 }}>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tax (GST 9%)</span>
              <span style={{ fontWeight: 500 }}>₹{tax.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
              <span style={{ fontWeight: 500, color: shipping === 0 ? 'var(--success)' : '' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.125rem', fontWeight: 700 }}>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <button className="btn btn-primary w-full" style={{ padding: '0.75rem', fontSize: '1rem', marginTop: '0.5rem' }} onClick={() => {
            if (!currentUser) { navigate('/auth/login'); return; }
            navigate('/store/checkout');
          }}>
            Proceed to Checkout
          </button>
          {shipping > 0 && (
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>Add ₹{(499 - subtotal).toLocaleString()} more for free shipping</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorefrontCart;
