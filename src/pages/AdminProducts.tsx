import React, { useState } from 'react';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/StatusBadge';
import { CheckCircle, XCircle, Search, DownloadCloud, Database } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, sellerProfiles, updateProductStatus, importOndcCatalog } = useAppStore();
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    setImporting(true);
    await importOndcCatalog();
    setImporting(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Product Moderation</h2>
        <button 
          onClick={handleImport}
          disabled={importing}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: importing ? 'not-allowed' : 'pointer', opacity: importing ? 0.7 : 1 }}
        >
          <DownloadCloud size={18} />
          {importing ? 'Importing from BPPs...' : 'Import from ONDC Network'}
        </button>
      </div>
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input" placeholder="Search products..." style={{ paddingLeft: '2rem', width: '280px' }} />
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{products.length} products</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Product</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Source</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Seller</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Price</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Stock</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const seller = sellerProfiles.find(s => s.sellerId === product.sellerId);
              return (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={product.images[0] || 'https://via.placeholder.com/150'} alt="" style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div>
                        <p style={{ fontWeight: 600, margin: 0 }}>{product.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    {product.source === 'ONDC Network' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '1rem', width: 'fit-content' }}>
                        <Database size={12} /> ONDC Network
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Local</span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{seller?.shopName || 'Unknown'}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{product.category}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>₹{product.price.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>{product.stock}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={product.status} /></td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                      <button onClick={() => updateProductStatus(product.id, 'Approved')} style={{ color: 'var(--success)', padding: '0.25rem' }} title="Approve"><CheckCircle size={16} /></button>
                      <button onClick={() => updateProductStatus(product.id, 'Rejected')} style={{ color: 'var(--danger)', padding: '0.25rem' }} title="Reject"><XCircle size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
