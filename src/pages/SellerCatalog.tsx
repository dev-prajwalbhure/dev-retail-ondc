import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import type { Product } from '../data/mockData';

export const SellerCatalog: React.FC = () => {
  const { products, addProduct, editProduct, deleteProduct, currentUser } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const initialFormState = {
    name: '',
    category: 'Groceries',
    price: '',
    stock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80'
  };
  const [formData, setFormData] = useState(initialFormState);

  const sellerProducts = products.filter(p => p.sellerId === currentUser?.id);
  const filteredProducts = sellerProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      sellerId: currentUser?.id || 'u_3',
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: [formData.image],
      description: formData.description,
      subcategory: '', comparePrice: Number(formData.price), sku: `SKU-${Date.now()}`, shortDescription: '', variants: [], attributes: [], seoTitle: formData.name, seoDescription: '', ondcCategory: '', weight: 0, dimensions: '', tags: []
    });
    setIsAddModalOpen(false);
    setFormData(initialFormState);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      editProduct(editingProduct.id, {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: [formData.image],
        description: formData.description
      });
      setIsEditModalOpen(false);
      setEditingProduct(null);
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: product.images[0]
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h2 style={{ margin: 0, fontSize: '1.875rem' }}>Product Catalog</h2>
          <p className="text-muted" style={{ margin: 0 }}>Manage your inventory and product listings.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setFormData(initialFormState); setIsAddModalOpen(true); }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="card flex-col gap-4" style={{ padding: '1.5rem' }}>
        <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="input" 
              style={{ width: '300px', paddingRight: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} className="text-muted" style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Product Name</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Stock</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div>
                        <div className="font-bold">{product.name}</div>
                        <div className="text-secondary text-xs">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>{product.category}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>${product.price.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>{product.stock} Units</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: '0.75rem', 
                      fontWeight: 600, 
                      backgroundColor: product.status === 'Approved' ? 'var(--success-bg)' : product.status === 'Pending' ? 'var(--warning-bg)' : 'var(--danger-bg)', 
                      color: product.status === 'Approved' ? 'var(--success)' : product.status === 'Pending' ? 'var(--warning)' : 'var(--danger)' 
                    }}>
                      {product.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(product)} className="text-primary hover:text-primary-hover p-1" title="Edit"><Edit2 size={16} /></button>
                      <button onClick={() => {
                        if (confirm('Are you sure you want to delete this product?')) {
                          deleteProduct(product.id);
                        }
                      }} className="text-danger hover:brightness-90 p-1" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>Add New Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-primary"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Product Name</label>
                    <input type="text" className="input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Category</label>
                    <select className="input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option>Groceries</option>
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home & Garden</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Price ($)</label>
                    <input type="number" min="0" step="0.01" className="input" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div className="flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Stock</label>
                    <input type="number" min="0" className="input" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                  </div>
                </div>
                <div className="flex-col gap-1">
                  <label className="text-sm font-medium">Description</label>
                  <textarea className="input" rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
                <div className="flex-col gap-1">
                  <label className="text-sm font-medium">Image URL</label>
                  <div className="flex gap-2">
                    <input type="url" className="input" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>Edit Product</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-muted hover:text-primary"><X size={20}/></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Product Name</label>
                    <input type="text" className="input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Category</label>
                    <select className="input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option>Groceries</option>
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home & Garden</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Price ($)</label>
                    <input type="number" min="0" step="0.01" className="input" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div className="flex-col gap-1 w-full">
                    <label className="text-sm font-medium">Stock</label>
                    <input type="number" min="0" className="input" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                  </div>
                </div>
                <div className="flex-col gap-1">
                  <label className="text-sm font-medium">Description</label>
                  <textarea className="input" rows={3} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
                <div className="flex-col gap-1">
                  <label className="text-sm font-medium">Image URL</label>
                  <div className="flex gap-2">
                    <input type="url" className="input" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SellerCatalog;
