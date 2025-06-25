import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WalletProvider } from './walletcontext/WalletContext.jsx';
import { SidebarProvider } from './context/sidebarContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SidebarProvider>
      <WalletProvider>
        <App />
        {/* Move WalletDashboard inside App or remove if App already includes it */}
      </WalletProvider>
    </SidebarProvider>
  </React.StrictMode>
);