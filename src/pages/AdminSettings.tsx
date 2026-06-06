import React, { useState } from 'react';
import { Save, Shield, Globe, Bell } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Marketplace Settings</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Global configurations for the Value Marketplace OS.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className={`btn ${activeTab === 'general' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('general')} style={{ justifyContent: 'flex-start' }}><Globe size={18}/> General</button>
          <button className={`btn ${activeTab === 'security' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('security')} style={{ justifyContent: 'flex-start' }}><Shield size={18}/> Security</button>
          <button className={`btn ${activeTab === 'notifications' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('notifications')} style={{ justifyContent: 'flex-start' }}><Bell size={18}/> Notifications</button>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textTransform: 'capitalize' }}>{activeTab} Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Marketplace Name</label>
              <input className="input" defaultValue="Value Marketplace" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Support Email</label>
              <input className="input" defaultValue="support@valuemarketplace.com" />
            </div>
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}><Save size={18}/> Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSettings;
