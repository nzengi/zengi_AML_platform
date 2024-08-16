// rewardDistribution.js - Ödül Dağıtımı Yönetimi Modülü

import { ethers } from 'ethers';
import { connectWallet } from './walletProvider';

const contractAddress = "YOUR_REWARD_CONTRACT_ADDRESS";
const abi = [
  // Ödül dağıtımı ile ilgili sözleşme fonksiyonlarının ABI'sı buraya eklenecek
  "function distributeReward(uint256 reportId) public",
  "function withdrawReward() public"
];

// Ödül Dağıtma Fonksiyonu
export async function distributeReward(reportId) {
  try {
    const { provider, signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await contract.distributeReward(reportId);
    await transaction.wait();
    
    return transaction.hash;  // İşlem hash'i döner
  } catch (error) {
    throw new Error("Reward distribution failed: " + error.message);
  }
}

// Ödül Çekme Fonksiyonu
export async function withdrawReward() {
  try {
    const { provider, signer } = await connectWallet();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await contract.withdrawReward();
    await transaction.wait();
    
    return transaction.hash;  // İşlem hash'i döner
  } catch (error) {
    throw new Error("Withdraw reward failed: " + error.message);
  }
}
