// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v1/OFT.sol";

/**
 * @title LayerSync
 * @author Mihailo Maksa
 * @notice A demo ERC20 token utilizing LayerZero's Omnichain Fungible Token (OFT) standard to connect multiple EVM chains
 */
contract LayerSync is OFT {
  /// @notice The boolean flag that indicates whether this is the main chain or not
  bool public isMain;

  /**
   * @notice The constructor for the LayerSync contract
   * @param _name string memory - Name of the token
   * @param _symbol string memory - Symbol of the token
   * @param _lzEndpoint address - The address of the LayerZero endpoint on the chain of deployment
   * @param _mainChainId uint16 - The chain ID of the main chain (usually Ethereum mainnet, or Goerli testnet)
   * @param _initialSupplyOnMainChain uint256 - The initial supply of the token on the main chain
   * @dev The LayerZero endpoint cannot be the zero address
   * @dev The main chain ID cannot be zero
   * @dev The max supply must be greater than zero
  */
  constructor (
    string memory _name,
    string memory _symbol,
    address _lzEndpoint,
    uint16 _mainChainId,
    uint256 _initialSupplyOnMainChain
  ) 
  OFT(_name, _symbol, _lzEndpoint) 
  {
   require(_lzEndpoint != address(0), "LayerSync: _lzEndpoint cannot be 0");
   require(_mainChainId != 0, "LayerSync: _mainChainId cannot be 0");
   require(_initialSupplyOnMainChain > 0, "LayerSync: _initialSupplyOnMainChain must be greater than 0");

   if (ILayerZeroEndpoint(_lzEndpoint).getChainId() == _mainChainId) {
    isMain = true;
    _mint(msg.sender, _initialSupplyOnMainChain);
   }
  }

  /**
   * @notice The function that mints tokens (faucet)
   * @param _account address - The address of the account to mint tokens to
   * @param _amount uint256 - The amount of tokens to mint
   * @dev The account cannot be the zero address
   * @dev The amount must be greater than zero
  */
  function mint(address _account, uint256 _amount) external {
    require(_account != address(0), "LayerSync: _account cannot be 0");
    require(_amount > 0, "LayerSync: _amount must be greater than 0");

    _mint(_account, _amount);
  }
}
