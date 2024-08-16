// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReportStorage {
    struct Report {
        uint256 id;
        string ipfsHash;
        address reporter;
        bool verified;
        uint256 timestamp;
    }

    uint256 public reportCounter;
    mapping(uint256 => Report) public reports;

    event ReportSubmitted(uint256 id, address reporter, string ipfsHash, uint256 timestamp);

    constructor() {
        reportCounter = 0;
    }

    function submitReport(string memory _ipfsHash) public returns (uint256) {
        reportCounter++;
        reports[reportCounter] = Report({
            id: reportCounter,
            ipfsHash: _ipfsHash,
            reporter: msg.sender,
            verified: false,
            timestamp: block.timestamp
        });
        emit ReportSubmitted(reportCounter, msg.sender, _ipfsHash, block.timestamp);
        return reportCounter;
    }

    function getReport(uint256 _reportId) public view returns (string memory, address, bool, uint256) {
        require(_reportId > 0 && _reportId <= reportCounter, "Invalid report ID");
        Report storage report = reports[_reportId];
        return (report.ipfsHash, report.reporter, report.verified, report.timestamp);
    }

    function updateVerificationStatus(uint256 _reportId, bool _status) external {
        reports[_reportId].verified = _status;
    }
}
