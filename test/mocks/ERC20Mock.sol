// SPDX-License-Identifier: Unlicense
pragma solidity =0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {StrandTransfer} from "../../contracts/StrandTransfer.sol";

contract ERC20Mock is ERC20 {
    uint constant public TOKEN_UNIT = 10 ** 18; 
    address public reentrantAttack;

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {    
        _mint(msg.sender, 1_000_000 * TOKEN_UNIT);    
    }

    function setReentrantAddress(address reentrant_) public {
        reentrantAttack = reentrant_;
    }

    function _afterTokenTransfer(address from, address to, uint256 amount) internal override {
        if(from == reentrantAttack && balanceOf(from) > 1 * TOKEN_UNIT) {
            StrandTransfer(payable(from)).transferToken(address(this), to, amount);
        }
    }

    /**
     * @notice receiving ETH, and simulate reentrant attack
     */
    receive() external payable {
        if(msg.sender == reentrantAttack && address(StrandTransfer(payable(msg.sender))).balance > 0.1 ether ) {
            StrandTransfer(payable(msg.sender)).transferEth(payable(this));
        }
    }
}
