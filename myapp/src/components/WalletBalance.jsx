import { useState } from 'react';
import { ethers } from 'ethers';

function WalletBalance() {
    const [balance, setBalance] = useState();

    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    };

    return (
        <div className = "card">
            <div>
                <h5>Available ETH: {balance}</h5>
                <button onClick={() => getBalance()} id='balance'>Check Balance</button>
            </div>
        </div>
    );
};

export default WalletBalance;