// ipfsManager.js - IPFS Entegrasyon Modülü

import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0');

// IPFS'e veri yükleme fonksiyonu
export async function uploadToIPFS(data) {
  try {
    const added = await client.add(data);
    return added.path;  // IPFS hash döner
  } catch (error) {
    throw new Error("IPFS upload failed: " + error.message);
  }
}
