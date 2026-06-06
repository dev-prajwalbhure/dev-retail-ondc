import React from 'react';
import { useAppStore } from '../store';
import { User, MapPin } from 'lucide-react';

export const StorefrontProfile: React.FC = () => {
  const { currentUser } = useAppStore();

  if (!currentUser) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="animate-fade-in container" style={{ padding: '2rem 4rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      
      {/* Sidebar Profile Card */}
      <div className="card" style={{ padding: '2rem', width: '300px', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', fontWeight: 800 }}>
          {currentUser.name.charAt(0)}
        </div>
        <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem' }}>{currentUser.name}</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem', fontSize: '0.875rem' }}>{currentUser.email}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="btn btn-primary w-full">Edit Profile</button>
          <button className="btn w-full" style={{ border: '1px solid var(--danger)', color: 'var(--danger)' }}>Delete Account</button>
        </div>
      </div>

      {/* Main Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={20} /> Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
              <input type="text" className="input" defaultValue={currentUser.name} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
              <input type="email" className="input" defaultValue={currentUser.email} disabled />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Phone Number</label>
              <input type="tel" className="input" defaultValue="+91 9876543210" />
            </div>
          </div>
          <button className="btn" style={{ marginTop: '1.5rem', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Save Changes</button>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={20} /> Saved Addresses</h3>
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ backgroundColor: 'var(--bg-base)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Home</span>
              <p style={{ margin: '0.5rem 0 0', fontWeight: 500 }}>{currentUser.name}</p>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>123 Commerce St, New Delhi, Delhi, 110001</p>
            </div>
            <button className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--border)' }}>Edit</button>
          </div>
          <button className="btn" style={{ marginTop: '1rem', border: '1px dashed var(--border)', width: '100%' }}>+ Add New Address</button>
        </div>

      </div>
    </div>
  );
};

export default StorefrontProfile;
