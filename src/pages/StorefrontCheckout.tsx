import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { CreditCard, CheckCircle, MapPin, Package, AlertCircle } from 'lucide-react';

export const StorefrontCheckout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, products, placeOrder } = useAppStore();
  
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: 'Home',
    line1: '123 Commerce St',
    line2: 'Apt 4B',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '+91 98765 43210'
  });

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined) as { productId: string, quantity: number, product: any }[];

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'center' }}>
        <Package size={64} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/store')}>Continue Shopping</button>
      </div>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.09);
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    placeOrder(address);
    setStep(3); // Success step
  };

  return (
    <div className="animate-fade-in container" style={{ padding: '2rem 4rem' }}>
      
      {/* Checkout Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
        {[
          { num: 1, label: 'Shipping', icon: <MapPin size={20} /> },
          { num: 2, label: 'Payment', icon: <CreditCard size={20} /> },
          { num: 3, label: 'Confirmation', icon: <CheckCircle size={20} /> }
        ].map((s, i) => (
          <React.Fragment key={s.num}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: step >= s.num ? 'var(--primary)' : 'var(--text-muted)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= s.num ? 'var(--primary-light)' : 'var(--bg-surface)', border: `2px solid ${step >= s.num ? 'var(--primary)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.icon}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{s.label}</span>
            </div>
            {i < 2 && <div style={{ height: '2px', width: '100px', backgroundColor: step > s.num ? 'var(--primary)' : 'var(--border)' }} />}
          </React.Fragment>
        ))}
      </div>

      {step === 3 ? (
        <div className="card animate-fade-in" style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--success)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle size={40} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Placed Successfully!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Your transaction has been securely routed through the ONDC Network.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/store/orders')}>View Orders</button>
            <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => navigate('/store')}>Continue Shopping</button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
          
          {/* Left Column: Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {step === 1 && (
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={20} /> Shipping Address</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Street Address</label>
                    <input className="input" value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>City</label>
                      <input className="input" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>State</label>
                      <input className="input" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>PIN Code</label>
                      <input className="input" value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Phone</label>
                      <input className="input" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-primary" onClick={() => setStep(2)}>Continue to Payment</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card animate-fade-in" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CreditCard size={20} /> Payment Method</h3>
                
                <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <AlertCircle size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem', color: 'var(--primary)' }}>ONDC Secure Gateway</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Your payment will be securely routed and settled automatically to the respective sellers via the ONDC network RSP (Reconciliation Service Provider).</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', cursor: 'pointer' }}>
                    <input type="radio" name="payment" defaultChecked />
                    <span style={{ fontWeight: 600 }}>UPI (Unified Payments Interface)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', cursor: 'pointer' }}>
                    <input type="radio" name="payment" />
                    <span style={{ fontWeight: 600 }}>Credit / Debit Card</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }} onClick={handlePlaceOrder}>
                    Pay ₹{total.toLocaleString()} & Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
              {cartItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                  <img src={item.product.images[0] || 'https://via.placeholder.com/60'} alt={item.product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.875rem', margin: '0 0 0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.product.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                    <p style={{ margin: '0.25rem 0 0', fontWeight: 600, fontSize: '0.875rem' }}>₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span>Tax (9%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>Free</span> : `₹${shipping}`}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default StorefrontCheckout;
