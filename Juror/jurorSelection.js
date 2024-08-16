// jurorSelection.js - Jüri Seçimi ve Doğrulama Modülü

import { ethers } from 'ethers';
import { connectWallet } from './walletProvider';

const contractAddress = "YOUR_JUROR_CONTRACT_ADDRESS";
const abi = [
  // Jüri seçimi ve doğrulama ile ilgili sözleşme fonksiyonlarının ABI'sı buraya eklenecek
  "function selectJurors(uint256 reportId, address[] memory jurors) public",
  "function voteOnReport(uint256 reportId, bool decision) public"
];

// Jüri Üyelerini Seçme Fonksiyonu
export async function selectJurors(reportId, jurors) {
  try {
    const { provider, signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await contract.selectJurors(reportId, jurors);
    await transaction.wait();
    
    return transaction.hash;  // İşlem hash'i döner
  } catch (error) {
    throw new Error("Juror selection failed: " + error.message);
  }
}

// Jüri Oylama Fonksiyonu
export async function voteOnReport(reportId, decision) {
  try {
    const { provider, signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await contract.voteOnReport(reportId, decision);
    await transaction.wait();
    
    return transaction.hash;  // İşlem hash'i döner
  } catch (error) {
    throw new Error("Vote failed: " + error.message);
  }
}
