
import { useState } from 'react';
import NftCard from '../components/nftcard';
import {fetchNFTs} from '../utils/fetchNFTs';

const Explore = () => {

    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")
    

    return (
        <div>
            <header>
                <div>
                    <h1>Owned NFT Verification</h1>
                    <div>
                        <input class="searchInput" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Wallet Address'></input>
                        <input class="searchInput" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='NFT Contract Address (Optional)'></input>
                        <button id="searchButton" onClick={() => {fetchNFTs(owner, contractAddress, setNFTs    )}}>Search</button>
                    </div>
                </div>
            </header>

            <section>
                {
                    NFTs ? NFTs.map(NFT => {
                       
                        return (
                           <NftCard image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} address={NFT.contract.address} description={NFT.description} attributes={NFT.metadata.attributes} ></NftCard>
                        )
                    }) : <div>No NFTs Found</div>
                }
            </section>
        </div>
    )
}


export default Explore