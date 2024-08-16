// walletProvider.js - Cüzdan Bağlantısı ve Sağlayıcı Modülü

import { ethers } from 'ethers';

export async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Kullanıcıdan MetaMask hesaplarına erişim iste
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      // Ethers.js sağlayıcısını oluştur
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      return { provider, signer, account };
    } catch (error) {
      throw new Error("Wallet connection failed: " + error.message);
    }
  } else {
    throw new Error("MetaMask is not installed");
  }
}
