import React, { useState } from 'react';
import { useAppStore } from '../store';
import { UserPlus, Save, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminUsers: React.FC = () => {
  const { users } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'seller'
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate
    if (!formData.name || !formData.email) {
      toast.error('Name and Email are required');
      setLoading(false);
      return;
    }

    // In a real app, this would call Supabase auth.signUp AND insert into public.users
    // Since we don't have auth configured in this prototype, we simulate the public.users insert.
    try {
      const id = `u_${Date.now()}`;
      const defaultWorkspace = formData.role === 'customer' ? '/store' : `/${formData.role}/dashboard`;
      
      const { supabase } = await import('../lib/supabase');
      const { error } = await supabase.from('users').insert({
        id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        default_workspace: defaultWorkspace
      });

      if (error) throw error;
      
      toast.success(`${formData.role.toUpperCase()} user created successfully!`);
      setFormData({ name: '', email: '', phone: '', role: 'seller' });
      
      // Force store reload
      const { useAppStore } = await import('../store');
      useAppStore.getState().initializeDatabase();
      
    } catch (e: any) {
      toast.error(e.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, fontSize: '1.5rem' }}>User Management & Data Entry</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Creation Form */}
        <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <UserPlus size={20} color="var(--primary)" />
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Create New User</h3>
          </div>
          
          <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Full Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input" placeholder="e.g. Rahul Sharma" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input" placeholder="e.g. rahul@example.com" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Phone Number (Optional)</label>
              <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>System Role</label>
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="input" style={{ width: '100%', cursor: 'pointer' }}>
                <option value="seller">Seller / Merchant</option>
                <option value="customer">Buyer / Customer</option>
                <option value="tsp">Technology Service Provider (TSP)</option>
                <option value="warehouse">Warehouse Manager</option>
                <option value="b2b">Corporate Buyer (B2B)</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            
            <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
              <Save size={18} />
              {loading ? 'Creating...' : 'Create User in Database'}
            </button>
          </form>
        </div>

        {/* Existing Users Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Shield size={20} color="var(--primary)" />
            <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Live Database Roster ({users.length})</h3>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>User</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Role</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Workspace</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '1rem', fontSize: '0.75rem', textTransform: 'capitalize' }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'monospace' }}>{u.defaultWorkspace}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No users found. Database might be empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
