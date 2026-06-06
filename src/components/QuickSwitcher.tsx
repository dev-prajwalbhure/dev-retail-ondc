import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { ArrowRightLeft } from 'lucide-react';
import { Modal } from './Modal';

const quickAccess = [
  { label: 'Customer', email: 'customer@valuemarketplace.com', color: '#0058FF' },
  { label: 'Seller', email: 'seller@valuemarketplace.com', color: '#059669' },
  { label: 'Super Admin', email: 'admin@valuemarketplace.com', color: '#dc2626' },
  { label: 'TSP Admin', email: 'tsp@valuemarketplace.com', color: '#ea580c' },
  { label: 'Operations', email: 'operations@valuemarketplace.com', color: '#7c3aed' },
  { label: 'Warehouse', email: 'warehouse@valuemarketplace.com', color: '#4f46e5' },
];

export const QuickSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const { login, users } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickLogin = (loginEmail: string) => {
    login(loginEmail);
    const user = users.find(u => u.email === loginEmail);
    if (user) {
      navigate(user.defaultWorkspace);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0, 88, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          cursor: 'pointer',
          border: 'none',
          transition: 'transform 0.2s'
        }}
        title="Quick Switch Workspace"
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      >
        <ArrowRightLeft size={24} />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Quick Switch Environment">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', padding: '1rem 0' }}>
          {quickAccess.map(qa => (
            <button
              key={qa.label}
              onClick={() => handleQuickLogin(qa.email)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-base)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = qa.color;
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.backgroundColor = 'var(--bg-base)';
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: qa.color, flexShrink: 0 }}></div>
              {qa.label}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};
