import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Save, Store, Image as ImageIcon, FileText } from 'lucide-react';

export const SellerProfileManage: React.FC = () => {
  const { sellerProfiles, currentUser } = useAppStore();
  const profile = sellerProfiles.find(s => s.sellerId === currentUser?.id) || sellerProfiles[0];

  const [formData, setFormData] = useState({
    shopName: profile?.shopName || '',
    description: 'Welcome to our store. We provide high-quality items with fast shipping.',
    returnPolicy: '30-day money-back guarantee.',
    shippingPolicy: 'Free shipping on orders over $50.',
  });

  const handleSave = () => {
    if (currentUser) {
      console.log('Update profile:', formData);
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex', maxWidth: '800px' }}>
      <div className="flex justify-between items-center">
        <div>
          <h2 style={{ margin: 0, fontSize: '1.875rem' }}>Manage Profile</h2>
          <p className="text-muted" style={{ margin: 0 }}>Update your public storefront and policies.</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary flex gap-2 items-center"><Save size={16} /> Save Changes</button>
      </div>

      <div className="card flex-col gap-6" style={{ padding: '2rem' }}>
        
        {/* Branding */}
        <div>
          <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.25rem' }}><ImageIcon size={20} className="text-primary" /> Store Branding</h3>
          <div className="flex gap-6 items-center mb-4">
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)' }}>
              <Store size={32} className="text-muted" />
            </div>
            <div>
              <button className="btn btn-outline mb-2">Upload Logo</button>
              <p className="text-muted text-xs m-0">Recommended size: 500x500px</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.25rem' }}><FileText size={20} className="text-primary" /> General Information</h3>
          <div className="flex-col gap-4">
            <div className="flex-col gap-1">
              <label className="font-medium text-secondary">Shop Name</label>
              <input type="text" className="input" value={formData.shopName} onChange={e => setFormData({...formData, shopName: e.target.value})} />
            </div>
            <div className="flex-col gap-1">
              <label className="font-medium text-secondary">Store Description</label>
              <textarea className="input" rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.25rem' }}><Store size={20} className="text-primary" /> Store Policies</h3>
          <div className="flex-col gap-4">
            <div className="flex-col gap-1">
              <label className="font-medium text-secondary">Return & Refund Policy</label>
              <textarea className="input" rows={3} value={formData.returnPolicy} onChange={e => setFormData({...formData, returnPolicy: e.target.value})}></textarea>
            </div>
            <div className="flex-col gap-1">
              <label className="font-medium text-secondary">Shipping Policy</label>
              <textarea className="input" rows={3} value={formData.shippingPolicy} onChange={e => setFormData({...formData, shippingPolicy: e.target.value})}></textarea>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellerProfileManage;
