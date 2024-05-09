// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Moutai {
    struct LogisticsRecord {
        string status;
        uint256 timestamp;
    }

    struct Bottle {
        uint id;
        string description;
        LogisticsRecord[] logistics;  // 物流状态的数组
    }

    mapping(uint => Bottle) public bottles;
    uint public nextId = 1;

    function createBottle(string memory description) public {
        Bottle storage bottle = bottles[nextId];
        bottle.id = nextId;
        bottle.description = description;
        nextId++;
    }

    function updateLogistics(uint id, string memory status) public {
        require(id < nextId, "Bottle does not exist.");
        Bottle storage bottle = bottles[id];
        bottle.logistics.push(LogisticsRecord({
            status: status,
            timestamp: block.timestamp // 添加当前区块时间戳
        }));
    }

    function getBottle(uint id) public view returns (uint, string memory, LogisticsRecord[] memory) {
        Bottle storage bottle = bottles[id];
        return (bottle.id, bottle.description, bottle.logistics);
    }
}