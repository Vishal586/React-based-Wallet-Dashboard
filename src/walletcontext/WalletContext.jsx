// src/walletcontext/WalletContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import MetaMaskOnboarding from '@metamask/onboarding';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [networkName, setNetworkName] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [onboarding, setOnboarding] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    setOnboarding(new MetaMaskOnboarding());
    setIsMetaMaskInstalled(Boolean(window.ethereum && window.ethereum.isMetaMask));
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed');
      onboarding?.startOnboarding();
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(address);

      setWalletAddress(address);
      setNetworkName(network.name);
      setEthBalance(parseFloat(formatEther(balance)).toFixed(4));
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setNetworkName(null);
    setEthBalance(null);
    setError(null);
    setIsConnecting(false);
  };

  const checkConnectedWallet = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        await connectWallet();
      }
    } catch (error) {
      console.error("Error checking connected wallet:", error);
    }
  };

  useEffect(() => {
    checkConnectedWallet();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      };

      const handleChainChanged = () => {
        connectWallet();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      walletAddress,
      networkName,
      ethBalance,
      isConnecting,
      error,
      isMetaMaskInstalled,
      connectWallet,
      disconnectWallet, // ✅ Added here
      onboarding
    }}>
      {children}
    </WalletContext.Provider>
  );
};
