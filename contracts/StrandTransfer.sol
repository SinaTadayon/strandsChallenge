// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract StrandTransfer is ReentrancyGuard {

    /**
     * @notice transfer amount of ERC20 to recipient address
     * @dev It is protected by a nonReentrant guard
     */
    function transferToken(address tokenAddress, address recipient, uint256 amount) public nonReentrant {
        SafeERC20.safeTransfer(IERC20(tokenAddress), recipient, amount); 
    }

    /**
     * @notice transfer 0.1 ETH to received address
     * @dev It doesn't need to be protected by a nonReentrant guard because the transfer method has limited gas. 
     */
    function transferEth(address payable recipient) public {
        require(address(this).balance > 0.1 ether, "Insufficient Balance");
        recipient.transfer(0.1 ether);
    }
    
    /**
     * @notice receiving ETH
     */
    // solhint-disable-next-line
    receive() external payable {}  
}
