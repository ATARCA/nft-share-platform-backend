import { ethers } from 'ethers';
import { CHAINS, DESIRED_CHAIN_ID } from './chains';

const getProviderChainName = () => {
    const chainName = CHAINS[DESIRED_CHAIN_ID].name;

    if (!chainName) throw new Error('web3 json rpc chainName not defined');

    console.log('connecting to chain ', chainName);
    return chainName;
};

if (!process.env.INFURA_DEV_KEY) throw new Error('INFURA_DEV_KEY variable not defined');

export let web3provider = new ethers.providers.InfuraProvider(getProviderChainName(), process.env.INFURA_DEV_KEY);

export const initWeb3Provider = () => {
    web3provider = new ethers.providers.InfuraProvider(getProviderChainName(), process.env.INFURA_DEV_KEY);
};