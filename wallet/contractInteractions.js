// contractInteractions.js - Akıllı Sözleşme Etkileşim Modülü

import { ethers } from 'ethers';
import { connectWallet } from './walletProvider';

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  // Akıllı sözleşme fonksiyonlarının ABI'sı buraya eklenecek
  "function submitReport(string ipfsHash) public returns (uint256)",
  "function getReport(uint256 reportId) public view returns (string memory, address, bool, uint256)"
];

// İhbar Gönderme Fonksiyonu
export async function submitReport(ipfsHash) {
  try {
    const { provider, signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // İhbar verisini blockchain'e gönder
    const transaction = await contract.submitReport(ipfsHash);
    await transaction.wait();
    
    return transaction.hash;  // İşlem hash'i döner
  } catch (error) {
    throw new Error("Submit report failed: " + error.message);
  }
}

// İhbar Verisini Okuma Fonksiyonu
export async function getReport(reportId) {
  try {
    const { provider } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Report verisini blockchain'den oku
    const report = await contract.getReport(reportId);
    return report;
  } catch (error) {
    throw new Error("Get report failed: " + error.message);
  }
}
