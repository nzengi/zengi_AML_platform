// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ReportStorage.sol";
import "./SafeMath.sol";

contract RewardDistribution {
    using SafeMath for uint256;

    mapping(address => uint256) public rewards;
    ReportStorage public reportStorage;

    event RewardPaid(address recipient, uint256 amount);

    constructor(address _reportStorage) {
        reportStorage = ReportStorage(_reportStorage);
    }

    function distributeReward(uint256 _reportId) public {
        (, address reporter, bool verified, ) = reportStorage.getReport(_reportId);
        require(verified, "Report not verified");

        rewards[reporter] = rewards[reporter].add(100);  // Ödül miktarı sabit olarak ayarlandı
        emit RewardPaid(reporter, 100);
    }

    function withdrawReward() public {
        uint256 amount = rewards[msg.sender];
        require(amount > 0, "No rewards available");
        rewards[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
