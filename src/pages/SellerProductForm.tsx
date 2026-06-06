import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { categories } from '../data/mockData';
import { ArrowLeft, Save } from 'lucide-react';
import { Tabs } from '../components/Tabs';

export const SellerProductForm: React.FC = () => {
  const { addProduct, currentUser } = useAppStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', category: 'Electronics', subcategory: '', price: '', comparePrice: '', stock: '', sku: '',
    description: '', shortDescription: '', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&fit=crop',
    weight: '', dimensions: '', tags: '',
    seoTitle: '', seoDescription: '', ondcCategory: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      sellerId: currentUser?.id || 'u_3',
      name: form.name,
      category: form.category,
      subcategory: form.subcategory,
      price: Number(form.price),
      comparePrice: Number(form.comparePrice) || Number(form.price),
      stock: Number(form.stock),
      sku: form.sku || `SKU-${Date.now()}`,
      images: [form.imageUrl],
      description: form.description,
      shortDescription: form.shortDescription,
      variants: [],
      attributes: [],
      seoTitle: form.seoTitle || form.name,
      seoDescription: form.seoDescription || form.shortDescription,
      ondcCategory: form.ondcCategory || form.category,
      weight: Number(form.weight) || 0,
      dimensions: form.dimensions,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    navigate('/seller/products');
  };

  const selectedCategory = categories.find(c => c.name === form.category);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/seller/products')} style={{ color: 'var(--text-secondary)', padding: '0.25rem' }}><ArrowLeft size={20} /></button>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Add New Product</h2>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Create a new product listing for your catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs tabs={[{ id: 'general', label: 'General' }, { id: 'pricing', label: 'Pricing & Inventory' }, { id: 'media', label: 'Media' }, { id: 'seo', label: 'SEO & ONDC' }]}>
          {(tab) => (
            <div className="card" style={{ padding: '2rem' }}>
              {tab === 'general' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Product Name *</label>
                      <input className="input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter product name" />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>SKU</label>
                      <input className="input" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} placeholder="Auto-generated" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Category *</label>
                      <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value, subcategory: '' })}>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Subcategory</label>
                      <select className="input" value={form.subcategory} onChange={e => setForm({ ...form, subcategory: e.target.value })}>
                        <option value="">Select</option>
                        {selectedCategory?.subcategories.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Short Description</label>
                    <input className="input" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} placeholder="Brief product summary" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Full Description *</label>
                    <textarea className="input" rows={5} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Detailed product description" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Tags (comma-separated)</label>
                    <input className="input" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="e.g. wireless, premium, electronics" />
                  </div>
                </div>
              )}
              {tab === 'pricing' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Selling Price (₹) *</label>
                      <input type="number" className="input" required min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Compare/MRP Price (₹)</label>
                      <input type="number" className="input" min="0" value={form.comparePrice} onChange={e => setForm({ ...form, comparePrice: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Stock Quantity *</label>
                      <input type="number" className="input" required min="0" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Weight (kg)</label>
                      <input type="number" className="input" step="0.01" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Dimensions</label>
                    <input className="input" value={form.dimensions} onChange={e => setForm({ ...form, dimensions: e.target.value })} placeholder="e.g. 20x15x8 cm" />
                  </div>
                </div>
              )}
              {tab === 'media' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Product Image URL</label>
                    <input type="url" className="input" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                  </div>
                  {form.imageUrl && (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <img src={form.imageUrl} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '2px solid var(--border)' }} />
                    </div>
                  )}
                </div>
              )}
              {tab === 'seo' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>SEO Title</label>
                    <input className="input" value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>SEO Description</label>
                    <textarea className="input" rows={3} value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>ONDC Category Mapping</label>
                    <input className="input" value={form.ondcCategory} onChange={e => setForm({ ...form, ondcCategory: e.target.value })} placeholder="e.g. Electronics > Audio" />
                  </div>
                </div>
              )}
            </div>
          )}
        </Tabs>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/seller/products')}>Cancel</button>
          <button type="submit" className="btn btn-primary"><Save size={14} /> Create Product</button>
        </div>
      </form>
    </div>
  );
};

export default SellerProductForm;
