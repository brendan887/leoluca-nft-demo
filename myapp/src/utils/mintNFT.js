import { ethers } from 'ethers';
import RoomMaker from '../artifacts/contracts/MyNFT.sol/MyNFT.json';

const contractAddress = '0x793AED93cfca4F39bC06f638ACd2e099500145D1';
const mintPrice = '0.02';

export const mintNFT = async (metadataURI) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, RoomMaker.abi, signer);

        try {
            const result = await contract.mintToken(metadataURI, {
                value: ethers.utils.parseEther(mintPrice),
            });
            console.log("Result:", result);
        } catch (err) {
            console.log("Error:", err);
        }
    } else {
        alert("Please create a Metamask wallet at https://metamask.io/download.html");
    }

}
