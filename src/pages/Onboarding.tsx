import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, FileText, CheckCircle, Upload } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="animate-fade-in" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '3rem 2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', padding: '2.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.875rem', margin: '0 0 0.5rem 0' }}>Join the ONDC Network</h2>
          <p className="text-secondary" style={{ margin: 0 }}>Register your business on Value Marketplace</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between" style={{ marginBottom: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: 'var(--border)', zIndex: 0 }}></div>
          <div style={{ position: 'absolute', top: '50%', left: 0, width: `${((step - 1) / 3) * 100}%`, height: '2px', backgroundColor: 'var(--primary)', zIndex: 0, transition: 'width 0.3s ease' }}></div>
          
          {[
            { id: 1, icon: <User size={20} />, label: 'Profile' },
            { id: 2, icon: <Store size={20} />, label: 'Business' },
            { id: 3, icon: <FileText size={20} />, label: 'Documents' },
            { id: 4, icon: <CheckCircle size={20} />, label: 'Verify' },
          ].map(s => (
            <div key={s.id} className="flex-col items-center" style={{ zIndex: 1, gap: '0.5rem' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: step >= s.id ? 'var(--primary)' : 'var(--bg-surface)',
                color: step >= s.id ? 'white' : 'var(--text-muted)',
                border: step >= s.id ? 'none' : '2px solid var(--border)',
                transition: 'all 0.3s ease'
              }}>
                {s.icon}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: step >= s.id ? 600 : 500, color: step >= s.id ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ minHeight: '300px' }}>
          {step === 1 && (
            <div className="animate-fade-in flex-col gap-4">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Admin Details</h3>
              <div className="flex-col gap-1">
                <label className="text-secondary font-medium">Full Name</label>
                <input type="text" className="input" placeholder="e.g. John Doe" />
              </div>
              <div className="flex-col gap-1">
                <label className="text-secondary font-medium">Email Address</label>
                <input type="email" className="input" placeholder="e.g. john@company.com" />
              </div>
              <div className="flex-col gap-1">
                <label className="text-secondary font-medium">Phone Number</label>
                <input type="tel" className="input" placeholder="+91 98765 43210" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in flex-col gap-4">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Business Information</h3>
              <div className="flex-col gap-1">
                <label className="text-secondary font-medium">Business Name (Legal)</label>
                <input type="text" className="input" placeholder="Acme Retail Private Limited" />
              </div>
              <div className="flex-col gap-1">
                <label className="text-secondary font-medium">Store Display Name</label>
                <input type="text" className="input" placeholder="Acme Supermart" />
              </div>
              <div className="flex gap-4">
                <div className="flex-col gap-1" style={{ flex: 1 }}>
                  <label className="text-secondary font-medium">GSTIN</label>
                  <input type="text" className="input" placeholder="29ABCDE1234F1Z5" />
                </div>
                <div className="flex-col gap-1" style={{ flex: 1 }}>
                  <label className="text-secondary font-medium">PAN</label>
                  <input type="text" className="input" placeholder="ABCDE1234F" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in flex-col gap-4">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Document Verification</h3>
              <div className="flex-col gap-4">
                {['GST Registration Certificate', 'Cancelled Cheque', 'Address Proof'].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4" style={{ border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 500 }}>{doc}</p>
                      <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>PDF, JPG up to 5MB</p>
                    </div>
                    <button className="btn btn-outline"><Upload size={16} /> Upload</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in flex-col items-center justify-center gap-4" style={{ minHeight: '300px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={40} />
              </div>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Ready for Review</h3>
              <p className="text-secondary" style={{ maxWidth: '400px' }}>
                Your business profile and documents have been uploaded successfully. Our team will review your application within 24 hours.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
          {step > 1 && step < 4 ? <button className="btn btn-outline" onClick={prevStep}>Back</button> : <div></div>}
          {step < 3 ? <button className="btn btn-primary" onClick={nextStep}>Continue</button> : null}
          {step === 3 ? <button className="btn btn-primary" onClick={nextStep}>Submit Application</button> : null}
          {step === 4 ? <button className="btn btn-primary" onClick={() => navigate('/seller/dashboard')}>Go to Dashboard</button> : null}
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
