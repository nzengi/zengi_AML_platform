// contractDeployment.js - Akıllı Sözleşme Dağıtım Modülü

import { ethers } from 'ethers';
import { connectWallet } from './walletProvider';

export async function deployContract(bytecode, abi) {
  try {
    const { provider, signer } = await connectWallet();

    // Akıllı sözleşme dağıtımı
    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    const contract = await factory.deploy();

    console.log("Contract deployed at:", contract.address);
    await contract.deployed();

    return contract.address;
  } catch (error) {
    throw new Error("Contract deployment failed: " + error.message);
  }
}
