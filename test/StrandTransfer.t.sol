// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {ERC20Mock} from "./mocks/ERC20Mock.sol";
import {StrandTransfer} from "../contracts/StrandTransfer.sol";
import {Utils} from "./utils/Utils.sol";

contract StrandTransferTest is Test {

  uint constant public TOKEN_UNIT = 10 ** 18; 

  ERC20Mock internal _mockERC20Token;
  StrandTransfer internal _strandTransfer;
  address payable internal _user;
  Utils internal _utils;

  function setUp() public {
    _utils = new Utils();
    _mockERC20Token = new ERC20Mock("MToken", "MTK");
    _strandTransfer = new StrandTransfer(); 
    _user = _utils.createUsers(1)[0];
  }

  // solhint-disable-next-line
  function test_TransferToken() public {
    // given
    _mockERC20Token.transfer(address(_strandTransfer), 100 * TOKEN_UNIT);  

    // when
    _strandTransfer.transferToken(address(_mockERC20Token), _user, 1 * TOKEN_UNIT);

    // then
    assertEq(_mockERC20Token.balanceOf(_user), 1 * TOKEN_UNIT);
    assertEq(_mockERC20Token.balanceOf(address(_strandTransfer)), 99 * TOKEN_UNIT);
  }

  // solhint-disable-next-line
  function test_TransferTokenFail() public {
    // given
    _mockERC20Token.transfer(address(_strandTransfer), 10 * TOKEN_UNIT);  
    vm.expectRevert(abi.encodePacked("ERC20: transfer amount exceeds balance"));

    // when    
    _strandTransfer.transferToken(address(_mockERC20Token), _user, 11 * TOKEN_UNIT);

    // then
    assertEq(_mockERC20Token.balanceOf(_user), 0);
    assertEq(_mockERC20Token.balanceOf(address(_strandTransfer)), 10 * TOKEN_UNIT);
  }

   // solhint-disable-next-line
  function test_TransferToken_ReentrantFail() public {
    // given
    _mockERC20Token.transfer(address(_strandTransfer), 10 * TOKEN_UNIT);
    _mockERC20Token.setReentrantAddress(address(_strandTransfer));
    vm.expectRevert(abi.encodePacked("ReentrancyGuard: reentrant call"));

    // when    
    _strandTransfer.transferToken(address(_mockERC20Token), _user, 1 * TOKEN_UNIT);

    // then
    assertEq(_mockERC20Token.balanceOf(_user), 0);
    assertEq(_mockERC20Token.balanceOf(address(_strandTransfer)), 10 * TOKEN_UNIT);
  }

  // solhint-disable-next-line
  function test_TransferEth() public {
    // given
    vm.deal(address(_strandTransfer), 10 ether);      

    // when
    _strandTransfer.transferEth(_user);

    // then
    assertEq(_user.balance, 100.1 ether);
    assertEq(address(_strandTransfer).balance, 9.9 ether);
  }

  // solhint-disable-next-line
  function test_TransferEthFail() public {
    // given  
    vm.expectRevert(abi.encodePacked("Insufficient Balance"));

    // when
    _strandTransfer.transferEth(_user);

    // then
    assertEq(_user.balance, 100 ether);
    assertEq(address(_strandTransfer).balance, 0);
  }

  // solhint-disable-next-line
  function test_TransferEth_ReentrantFail() public {
    // given
    vm.deal(address(_strandTransfer), 1 ether); 
    _mockERC20Token.setReentrantAddress(address(_strandTransfer));
    vm.expectRevert();

    // when    
    _strandTransfer.transferEth(payable(_mockERC20Token));

    // then
    assertEq(address(payable(_mockERC20Token)).balance, 0 ether);
    assertEq(address(_strandTransfer).balance, 1 ether);
  }
}