// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JurorSelection {
    mapping(uint256 => address[]) public jurors;

    function selectJurors(uint256 _reportId, address[] memory _jurors) public {
        jurors[_reportId] = _jurors;
    }

    function isJuror(address _juror, uint256 _reportId) public view returns (bool) {
        address[] memory selectedJurors = jurors[_reportId];
        for (uint256 i = 0; i < selectedJurors.length; i++) {
            if (selectedJurors[i] == _juror) {
                return true;
            }
        }
        return false;
    }
}
