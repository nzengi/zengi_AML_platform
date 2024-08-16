// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ReportStorage.sol";
import "./JurorSelection.sol";
import "./AccessControl.sol";

contract Verification is AccessControl {
    ReportStorage public reportStorage;
    JurorSelection public jurorSelection;

    event ReportVerified(uint256 reportId, address verifier);

    constructor(address _reportStorage, address _jurorSelection) {
        reportStorage = ReportStorage(_reportStorage);
        jurorSelection = JurorSelection(_jurorSelection);
    }

    modifier onlyJuror(uint256 _reportId) {
        require(jurorSelection.isJuror(msg.sender, _reportId), "Not a juror for this report");
        _;
    }

    function verifyReport(uint256 _reportId) public onlyJuror(_reportId) {
        (, , bool verified, ) = reportStorage.getReport(_reportId);
        require(!verified, "Report already verified");

        reportStorage.updateVerificationStatus(_reportId, true);
        emit ReportVerified(_reportId, msg.sender);
    }
}
