# NFT Demo for Leoluca

This repo contains a smart contract and website as a demo for NFT functionality. The website can view the user's Metamask wallet balance, mint NFTs, and view user owned NFTs.

`MyNFT` contract has already been deployed to Goerli testnet under the following address:

> 0x793AED93cfca4F39bC06f638ACd2e099500145D1

Remember to `cd myapp` to access files properly.


## Deploying Smart Contract

1. `npx hardhat compile`
2. `npx hardhat node`
3. `npx hardhat run scripts/deploy-contract.js --network NAME`

`NAME` can be `localhost`, `goerli`, or any network configured in `hardhat.config.js`. Create a `.env` to include all the necessary variables.


## Running Demo Website

1. `npm run dev`

Metamask wallet is required to interact with any smart contract functions such as minting. 

In `App.jsx`, switch between `<Home />` and `<Explore />` to switch from minting website to NFT explorer website.

Update `contractAddress` in `Home.jsx` if contract address has changed.


## Additional Notes

In localhost, you can import an account into Metamask for testnet from one of the private keys provided after running `npx hardhat node`.

Etherscan can be used to view transactions and run external functions on the smart contract. The current deployment can be found [here](https://goerli.etherscan.io/address/0x793AED93cfca4F39bC06f638ACd2e099500145D1).

Review [OpenZeppelin documentation](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721) for more information on smart contract functions.

## Architecture Diagram

https://drive.google.com/file/d/1PN_8zHqVSqVQU_oOhMvkeQtbgV8v7AgD/view?usp=sharing