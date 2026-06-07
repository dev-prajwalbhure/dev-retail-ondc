import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, CheckCircle, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, amount }) => {
  const [method, setMethod] = useState<'card' | 'upi'>('card');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMethod('card');
      setLoading(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success('Payment successful!');
      
      // Close modal and trigger onSuccess after success animation
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={!loading && !success ? onClose : undefined}
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }} 
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '400px', 
          backgroundColor: 'var(--bg-primary)', 
          borderRadius: '1rem', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div key="payment-form" exit={{ opacity: 0, scale: 0.95 }}>
              {/* Header */}
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={20} color="var(--primary)" />
                  <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Secure Checkout</h3>
                </div>
                {!loading && (
                  <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                    <X size={20} color="var(--text-muted)" />
                  </button>
                )}
              </div>

              {/* Amount */}
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--primary)', color: 'white' }}>
                <p style={{ margin: '0 0 0.5rem 0', opacity: 0.8, fontSize: '0.875rem' }}>Amount to Pay</p>
                <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700 }}>₹{amount.toLocaleString()}</h2>
              </div>

              {/* Form */}
              <form onSubmit={handlePay} style={{ padding: '1.5rem' }}>
                
                {/* Method Toggle */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: '0.5rem' }}>
                  <button type="button" onClick={() => setMethod('card')} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '0.375rem', backgroundColor: method === 'card' ? 'white' : 'transparent', boxShadow: method === 'card' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                    <CreditCard size={16} /> Card
                  </button>
                  <button type="button" onClick={() => setMethod('upi')} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '0.375rem', backgroundColor: method === 'upi' ? 'white' : 'transparent', boxShadow: method === 'upi' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                    <Smartphone size={16} /> UPI
                  </button>
                </div>

                <div style={{ minHeight: '200px' }}>
                  {method === 'card' ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Card Number</label>
                        <input required className="input" placeholder="0000 0000 0000 0000" style={{ width: '100%' }} maxLength={19} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Expiry</label>
                          <input required className="input" placeholder="MM/YY" style={{ width: '100%' }} maxLength={5} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>CVV</label>
                          <input required type="password" className="input" placeholder="123" style={{ width: '100%' }} maxLength={4} />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Cardholder Name</label>
                        <input required className="input" placeholder="Rahul Sharma" style={{ width: '100%' }} />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <Smartphone size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Enter UPI ID</label>
                        <input required className="input" placeholder="username@upi" style={{ width: '100%', textAlign: 'center' }} />
                      </div>
                    </motion.div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    marginTop: '1.5rem', 
                    backgroundColor: 'var(--success)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '0.5rem', 
                    fontWeight: 600, 
                    fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.8 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
                  ) : (
                    `Pay ₹${amount.toLocaleString()}`
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success-screen" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
            >
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
              >
                <CheckCircle size={80} color="var(--success)" />
              </motion.div>
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: 'var(--success)' }}>Payment Successful!</h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Your order is being processed.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
