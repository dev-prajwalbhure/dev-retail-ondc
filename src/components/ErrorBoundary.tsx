import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', backgroundColor: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
            <AlertTriangle size={48} color="var(--error)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ marginBottom: '1rem' }}>Something went wrong.</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              We encountered an unexpected issue while loading this page. This might be due to a data sync error.
            </p>
            <code style={{ display: 'block', padding: '0.5rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.75rem', overflowX: 'auto', textAlign: 'left', color: 'var(--error)' }}>
              {this.state.errorMsg}
            </code>
            <button 
              onClick={() => window.location.reload()}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto', padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500 }}
            >
              <RefreshCw size={18} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
