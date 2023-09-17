// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.8.0 <0.9.0;

import "@routerprotocol/evm-gateway-contracts/contracts/IDapp.sol";
import "@routerprotocol/evm-gateway-contracts/contracts/IGateway.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract XERC721 is ERC721,ERC721URIStorage,IDapp {


  using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
  // address of the owner
  address public owner;

 // name of the chain
  string public ChainName;

  // address of the gateway contract
  IGateway public gatewayContract;

  // chain id corresponding to chain name
  mapping(string=>string) public name;

  // set contract on source and destination chain
  mapping(string => string) public ourContractOnChains;

  // gateway address corresponding to chain name
  mapping(string=>address) public gateway;

  mapping(uint256=>string) public uri;

  uint256 public currentId;
  // transfer params struct where we specify which NFT should be transferred to
  // the destination chain and to which address
  struct TransferParams {
    uint256 nftId;
    bytes recipient;
    string uri;
  }

  struct TransferTemp{
    uint256 nftId;
    string uri;
  }

uint256 public id;


  constructor(
    string memory chainName
  ) ERC721("LearnX", "LearnX") {
    name["mumbai"]="80001";
    name["fuji"]="43113";
    name["arbitrum"]="421613";
    name["bsc"]="97";
     gateway["bsc"]=0x7B3B890f7B428B724e4b821C193c456496f7C7b7;
     gateway["arbitrum"]=0xfbE6D1e711CC2BC241dfa682CBbFF6D68bf62e67;
    gateway["mumbai"]=0x7B3B890f7B428B724e4b821C193c456496f7C7b7;
    gateway["fuji"]=0xF2C95b33c7d1D7b0fcE873Db6318F33D766131F7;
    currentId=0;
    ChainName=chainName;
    address  gatewayAddress=gateway[chainName];
    gatewayContract = IGateway(gatewayAddress);
    owner = msg.sender;
    id=0;
    // setting metadata for dapp
    gatewayContract.setDappMetadata("0x70e3906F5397ce7978e869031B7362d4B3ecE516");
  
    
  }

  /// @notice function to set the fee payer address on Router Chain.
  /// @param feePayerAddress address of the fee payer on Router Chain.
  function setDappMetadata(string memory feePayerAddress) external {
    require(msg.sender == owner, "only owner");
    gatewayContract.setDappMetadata(feePayerAddress);
  }

  /// @notice function to set the Router Gateway Contract.
  /// @param gateway address of the gateway contract.
  function setGateway(address gateway) external {
    require(msg.sender == owner, "only owner");
    gatewayContract = IGateway(gateway);
  }

 


  function setContractOnChain(
    string calldata chainId,
    string calldata contractAddress
  ) external {
    require(msg.sender == owner, "only owner");
    
    ourContractOnChains[chainId] = contractAddress;
  }
 function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
  
  // This function sends the NFT from the source chain to the destination chain 
  function transferCrossChain(
    string calldata chainName,
   TransferTemp calldata transferTemp
   
  ) public payable {
    require(
      keccak256(bytes(ourContractOnChains[name[chainName]])) !=
        keccak256(bytes("")),
      "contract on dest not set"
    );

    require(
      _ownerOf(transferTemp.nftId) == msg.sender,
      "caller is not the owner"
    );

    TransferParams memory transferParams;
    transferParams.nftId=transferTemp.nftId;
    transferParams.recipient=toBytes(msg.sender);
    transferParams.uri=transferTemp.uri;
    // burning the NFT from the address of the user calling _burn function
    _burn(transferParams.nftId);
    string memory destChainId=name[chainName];
    // sending the transfer params struct to the destination chain as payload.
    bytes memory packet = abi.encode(transferParams);
    bytes memory requestPacket = abi.encode(
      ourContractOnChains[destChainId],
      packet
    );

    gatewayContract.iSend{ value: msg.value }(
      1,
      0,
      string(""),
      destChainId,
     hex"000000000007a12000000006fc23ac0000000000000000000000000000000000000000000000000000000000000000000000",
      requestPacket
    );
  }


  function getRequestMetadata(
    uint64 destGasLimit,
    uint64 destGasPrice,
    uint64 ackGasLimit,
    uint64 ackGasPrice,
    uint128 relayerFees,
    uint8 ackType,
    bool isReadCall,
    string calldata asmAddress
  ) public pure returns (bytes memory) {
    bytes memory requestMetadata = abi.encodePacked(
      destGasLimit,
      destGasPrice,
      ackGasLimit,
      ackGasPrice,
      relayerFees,
      ackType,
      isReadCall,
      asmAddress
    );
    return requestMetadata;
  }

  function toBytes(address a) public pure returns (bytes memory b){
    assembly {
        let m := mload(0x40)
        a := and(a, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF)
        mstore(add(m, 20), xor(0x140000000000000000000000000000000000000000, a))
        mstore(0x40, add(m, 52))
        b := m
   }
}

  function iReceive(
    string memory requestSender,
    bytes memory packet,
    string memory srcChainId
  ) external override returns (bytes memory) {
    require(msg.sender == address(gatewayContract), "only gateway");
    require(
      keccak256(bytes(ourContractOnChains[srcChainId])) ==
        keccak256(bytes(requestSender))
    );

    // decoding our payload
    TransferParams memory transferParams = abi.decode(packet, (TransferParams));
    string memory uri = transferParams.uri;

      _safeMint(toAddress(transferParams.recipient),transferParams.nftId );
       
        _setTokenURI(transferParams.nftId,uri);


    return "";
  }

  function iAck(
    uint256 requestIdentifier,
    bool execFlag,
    bytes memory execData
  ) external override {}

 function safeMint(string memory uri) public  {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        id=id+1;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override  {
        revert("NFT is non-transferable");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override {
        revert("NFT is non-transferable");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        revert("NFT is non-transferable");
    }

    // The following functions are overrides required by Solidity.

   

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     override(ERC721, ERC721URIStorage)
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }
  function toAddress(bytes memory _bytes) internal pure returns (address addr) {
    bytes20 srcTokenAddress;
    assembly {
      srcTokenAddress := mload(add(_bytes, 0x20))
    }
    addr = address(srcTokenAddress);
  }
}
