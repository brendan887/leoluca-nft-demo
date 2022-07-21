import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import MyNFT from '../artifacts/contracts/MyNFT.sol/MyNFT.json';

import placeholderImage from '../img/placeholder.jpg';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

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

  return (
    <div>
        <h1>NFT Demo Site</h1>
        <WalletBalance />

        <h2>NFT Collection</h2>
        {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
            <div key={i} className='token'>
            <NFTImage tokenId={i} getCount={getCount} />
            </div>
        ))}
    </div>
  );
}

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
        value: ethers.utils.parseEther('0.0'),
      });
  
      await result.wait();
      getMintedStatus();
      getCount();
    };

    const giftToken = async () => {
      const connection = contract.connect(signer);
      const addr = connection.address;
      const result = await contract.giftMint(addr, metadataURI, {
        value: ethers.utils.parseEther('0'),
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
          <div className='info'>
            <h5>ID #{tokenId}</h5>
            {!isMinted ? (
              <div>
                <button onClick={mintToken} title="End user mints NFT and pays gas fees" id='mint'>
                  Mint
                </button>
                <button onClick={giftToken} title="Contract deployer mints NFT and transfers to user free of charge" id='gift'>
                  Gift To Me
                </button>
              </div>
            ) : (
              <button onClick={getURI} id='taken'>
                Show URI
              </button>
            )}
          </div>
      </div>
    );
  }

export default Home;