import React, { useState } from 'react';
import { uploadToIPFS } from './ipfsManager';
import { submitReport } from './contractInteractions';

function App() {
  const [ipfsHash, setIpfsHash] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  async function handleSubmitReport() {
    try {
      // IPFS'e veri yükle
      const ipfsHash = await uploadToIPFS(reportContent);
      setIpfsHash(ipfsHash);

      // Blockchain'e ihbarı gönder
      const txHash = await submitReport(ipfsHash);
      setTransactionHash(txHash);
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  }

  return (
    <div>
      <h1>Submit a Report</h1>
      <textarea
        placeholder="Enter your report"
        value={reportContent}
        onChange={(e) => setReportContent(e.target.value)}
      />
      <button onClick={handleSubmitReport}>Submit Report</button>

      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
}

export default App;
