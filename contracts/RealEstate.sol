pragma solidity ^0.5.0;

contract RealEstate {
    uint public count = 0;

    struct realEstate {
        uint id;
        string content;
        bool saled;
    }

    mapping(uint => realEstate) public estates;

    event post (
        uint id,
        string content,
        bool saled
    );

    event saled(
        uint id,
        bool saled
    );

    constructor() public {
        createEstate("좋은 집");
    }

    function createEstate(string memory _content) public {
        count ++;
        estates[count] = realEstate(count, _content, false);
        emit post(count, _content, false);
    }
}