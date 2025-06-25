// src/components/WalletDashboard.jsx
import { useContext, useState } from 'react';
import { WalletContext } from '../../walletcontext/WalletContext.jsx';
import { iconsImgs } from '../../utils/images';
import './walletdashboard.css';

const WalletDashboard = () => {
  const { walletAddress, networkName, ethBalance, connectWallet, disconnectWallet } = useContext(WalletContext);
  const [isCopied, setIsCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleConnect = async () => {
    if (!connectWallet) {
      setError("Wallet connection system not available");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await connectWallet();
    } catch (err) {
      console.error("Connection error:", err);
      if (err.code === 'ACTION_REJECTED') {
        setError("User rejected the request");
      } else if (err.code === -32002) {
        setError("Wallet connection already in progress");
      } else if (err.message.includes('Chain not supported')) {
        setError("Network not supported");
      } else {
        setError(err.message || "Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCopyAddress = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => setError("Failed to copy address"));
  };

  const handleMoreOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleDisconnectWallet = async () => {
    setIsDisconnecting(true);
    setError(null);
    try {
      await disconnectWallet(); // properly disconnect the wallet
      setShowOptions(false);    // close the dropdown
    } catch (err) {
      console.error("Disconnection error:", err);
      setError(err.message || "Failed to disconnect wallet");
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div className="subgrid-two-item grid-common grid-c8">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Wallet Dashboard</h3>
        <button className="grid-c-title-icon" onClick={handleMoreOptions}>
          <img src={iconsImgs.plus} alt="More options" />
        </button>
        {showOptions && (
          <div className="options-dropdown">
            <button onClick={handleCopyAddress} disabled={!walletAddress}>
              {isCopied ? "Copied!" : "Copy Address"}
            </button>
            <button 
              onClick={handleDisconnectWallet}
              disabled={isDisconnecting}
            >
              {isDisconnecting ? "Disconnecting..." : "Disconnect Wallet"}
            </button>
          </div>
        )}
      </div>

      <div className="grid-c8-content">
        {!walletAddress ? (
          <>
            <button 
              className="connect-btn" 
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </>
        ) : (
          <div className="wallet-info">
            <p className="text text-silver-v1"><strong>Address:</strong> {walletAddress}</p>
            <p className="text text-silver-v1"><strong>Network:</strong> {networkName || 'Not connected'}</p>
            <p className="text text-silver-v1"><strong>ETH Balance:</strong> {ethBalance !== null ? `${ethBalance} ETH` : 'Loading...'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;
