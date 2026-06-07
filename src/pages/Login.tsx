import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { useAppStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('rahul@example.com');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const { login } = useAppStore();
  const navigate = useNavigate();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    }, 1000);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      // In real auth, check Supabase. We do mock logic here.
      login(email);
      const user = useAppStore.getState().currentUser;
      if (user) {
        toast.success('Successfully logged in!');
        navigate(user.defaultWorkspace || '/store');
      } else {
        toast.error('Account not found. Please register first.');
      }
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
      
      {/* Decorative Background Elements - Hidden on Mobile */}
      <div className="hide-on-mobile" style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(60px)', zIndex: 0 }} />
      <div className="hide-on-mobile" style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', opacity: 0.1, filter: 'blur(60px)', zIndex: 0 }} />

      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', padding: '2rem', zIndex: 1, minHeight: '100vh' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        >
          <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Value</span>
        </motion.div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="card" 
            style={{ 
              width: '100%', 
              maxWidth: '420px', 
              padding: '2.5rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--bg-secondary)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--primary)' }}>
                {otpSent ? <ShieldCheck size={24} /> : <Mail size={24} />}
              </div>
              <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>
                {otpSent ? 'Verify your identity' : 'Welcome back'}
              </h1>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.875rem' }}>
                {otpSent ? `We sent a code to ${email}` : 'Enter your email to sign in securely'}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!otpSent ? (
                <motion.form 
                  key="email-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOTP} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email address</label>
                    <input 
                      type="email" 
                      className="input" 
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ padding: '0.875rem' }}
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="button" 
                    style={{ padding: '0.875rem', width: '100%', justifyContent: 'center', backgroundColor: 'var(--text-primary)', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
                    disabled={loading}
                  >
                    {loading ? 'Sending Code...' : 'Continue with Email'}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="otp-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerifyOTP} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && index > 0) {
                            const prevInput = document.getElementById(`otp-${index - 1}`);
                            if (prevInput) prevInput.focus();
                          }
                        }}
                        style={{
                          width: '45px',
                          height: '56px',
                          textAlign: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 600,
                          borderRadius: '0.5rem',
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--bg-primary)',
                          outline: 'none',
                          transition: 'all 0.2s'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--primary)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    ))}
                  </div>

                  <button 
                    type="submit" 
                    className="button" 
                    style={{ padding: '0.875rem', width: '100%', justifyContent: 'center', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify & Sign In'}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0, cursor: 'pointer' }} onClick={() => setOtpSent(false)}>
                    Use a different email
                  </p>
                </motion.form>
              )}
            </AnimatePresence>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Don't have an account? <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/auth/register')}>Register</span>
            </div>
          </motion.div>
        </div>
        </div>
        
        <div className="hide-on-mobile" style={{ flex: '1 1 400px', backgroundColor: 'var(--primary)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', minHeight: '50vh' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>The Commerce OS for Everyone.</h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '400px' }}>Join the open network and manage your entire business lifecycle from a single, unified dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
