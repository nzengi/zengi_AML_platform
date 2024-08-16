// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

contract ReportStorage is AccessControl {
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

    // Sadece yetkilendirilmiş sözleşmelerin güncelleyebilmesi için modifier ekledik
    modifier onlyAuthorized() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not authorized");
        _;
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

    // İhbar doğrulama durumu güncelleme sadece yetkilendirilmiş sözleşmeler tarafından yapılabilir
    function updateVerificationStatus(uint256 _reportId, bool _status) external onlyAuthorized {
        reports[_reportId].verified = _status;
    }
}
