pragma solidity 0.4.26;

contract main {
  address owner;
  mapping (address => uint) balances;

  modifier ownerOnly{
    require (msg.sender == owner);
    _;
  }

  constructor() public{
    owner = msg.sender;
  }

  function getBalance() public view {
    return balances[msg.sender];
  }

  function buyIn() public payable{
    balances[msg.sender] += msg.value;
  }

}
