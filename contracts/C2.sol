pragma solidity ^0.5.10;

contract C2 {
    string cmd;

    function set(string memory newCmd) public {
        cmd = newCmd;
    }

    function get() public view returns (string memory) {
        return cmd;
    }
}