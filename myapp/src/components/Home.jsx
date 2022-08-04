import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';

import placeholderImage from '../img/placeholder.jpg';
import { mintNFT } from '../utils/mintNFT.js';

const contractAddress = '0x793AED93cfca4F39bC06f638ACd2e099500145D1';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);


function Home() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  /**
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  }
  
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  }
  const batchMint = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    
    for (var i = 0; i < mintAmount; i++) {
      const result = await contract.batchMint(addr, mintAmount, {
        value: ethers.utils.parseEther((0.05 * mintAmount).toString()),
      });

      await result.wait();
      getCount();
    };
  };
  */
  

  return (
    <div>
        <h1>NFT Demo Site</h1>
        <h2>Check Wallet Balance</h2>
        <WalletBalance />

        <h2>Owned NFTs</h2>
        {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
            <div key={i} className='token'>
            <NFTImage tokenId={i} getCount={getCount}/>
            </div>
        ))}
    </div>
  );
}

/**
 * <h2>Batch Mint</h2>
        <div id='mintHandle'>
          <button onClick={handleDecrement} class='incrementer'>-</button>
          <input type="number" value={mintAmount} />
          <button onClick={handleIncrement} class='incrementer'>+</button>
          <button id='mint' onClick={batchMint}>Mint</button>
        </div>
 */

function NFTImage({ tokenId, getCount }) {
    const contentId = 'QmeV2XuXkfbHF33JbTQgHri3ubFSzyQDW6KNqYzYZ2XYyF';
    const metadataURI = `${contentId}/${tokenId}.json`;
    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  
    const [isMinted, setIsMinted] = useState(false);
    useEffect(() => {
      getMintedStatus();
    }, [isMinted]);
  
    const getMintedStatus = async () => {
      const result = await contract.isContentOwned(metadataURI);
      console.log(result)
      setIsMinted(result);
    };
  
    const mintToken = async () => {
      const connection = contract.connect(signer);
      const addr = connection.address;
      const result = await contract.payToMint(addr, metadataURI, {
        value: ethers.utils.parseEther('0.02'),
      });
  
      await result.wait();
      getMintedStatus();
      getCount();
    };
  
    async function getURI() {
      const uri = await contract.tokenURI(tokenId);
      alert(uri);
    }
    
    return (
      <div>
        <img src={isMinted ? imageURI : placeholderImage}></img>
        {!isMinted ? (
              <div className='info'>
              <h5>Not Owned</h5>
              <button onClick={mintToken} title="End user mints NFT and pays gas fees">
                Mint
              </button>
            </div>
          ) : (
            <div className='info'>
              <h5>ID #{tokenId}</h5>
              <button onClick={getURI} id='taken'>
                Show URI
              </button>
            </div>
          )}
        </div>
    );
  }

export default Home;