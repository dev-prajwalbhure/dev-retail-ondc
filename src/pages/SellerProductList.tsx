import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { Plus, Search, Edit2, Trash2, Download } from 'lucide-react';

export const SellerProductList: React.FC = () => {
  const { products, currentUser, deleteProduct, editProduct } = useAppStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editModal, setEditModal] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', stock: '', category: '', description: '' });

  const sellerProducts = products.filter(p => p.sellerId === currentUser?.id);
  const filtered = sellerProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openEdit = (productId: string) => {
    const p = products.find(pr => pr.id === productId);
    if (p) {
      setEditForm({ name: p.name, price: p.price.toString(), stock: p.stock.toString(), category: p.category, description: p.description });
      setEditModal(productId);
    }
  };

  const handleEditSave = () => {
    if (editModal) {
      editProduct(editModal, {
        name: editForm.name,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
        category: editForm.category,
        description: editForm.description,
      });
      setEditModal(null);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Products</h2>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>{sellerProducts.length} products in your catalog</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline"><Download size={14} /> Export</button>
          <button className="btn btn-primary" onClick={() => navigate('/seller/products/new')}><Plus size={14} /> Add Product</button>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" className="input" placeholder="Search products..." style={{ paddingLeft: '2rem', width: '260px' }} value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="input" style={{ width: '140px' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Product</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>SKU</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Stock</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={product.images[0]} alt="" style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div>
                        <p style={{ fontWeight: 600, margin: 0, fontSize: '0.875rem' }}>{product.name}</p>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.7rem' }}>{product.variants.length} variant(s)</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><code style={{ fontSize: '0.7rem', backgroundColor: 'var(--bg-base)', padding: '0.15rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>{product.sku}</code></td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{product.category}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>₹{product.price.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: product.stock < 20 ? 'var(--danger)' : 'var(--text-primary)', fontWeight: product.stock < 20 ? 600 : 400 }}>{product.stock}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}><StatusBadge status={product.status} /></td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button onClick={() => openEdit(product.id)} style={{ color: 'var(--primary)', padding: '0.25rem' }} title="Edit"><Edit2 size={14} /></button>
                      <button onClick={() => { if (confirm('Delete this product?')) deleteProduct(product.id); }} style={{ color: 'var(--danger)', padding: '0.25rem' }} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={!!editModal} onClose={() => setEditModal(null)} title="Edit Product" size="lg"
        footer={<><button className="btn btn-outline" onClick={() => setEditModal(null)}>Cancel</button><button className="btn btn-primary" onClick={handleEditSave}>Save Changes</button></>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Product Name</label>
              <input className="input" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Category</label>
              <input className="input" value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Price (₹)</label>
              <input type="number" className="input" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Stock</label>
              <input type="number" className="input" value={editForm.stock} onChange={e => setEditForm({ ...editForm, stock: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Description</label>
            <textarea className="input" rows={3} value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SellerProductList;
