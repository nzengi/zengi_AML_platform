// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ReportStorage.sol";

contract Verification {
    ReportStorage public reportStorage;

    event ReportVerified(uint256 reportId, address verifier);

    constructor(address _reportStorage) {
        reportStorage = ReportStorage(_reportStorage);
    }

    function verifyReport(uint256 _reportId) public {
        (, , bool verified, ) = reportStorage.getReport(_reportId);
        require(!verified, "Report already verified");

        reportStorage.updateVerificationStatus(_reportId, true);
        emit ReportVerified(_reportId, msg.sender);
    }
}
