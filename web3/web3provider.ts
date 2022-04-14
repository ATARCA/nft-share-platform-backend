import { ethers } from 'ethers';
import { CHAINS, DESIRED_CHAIN_ID } from './chains';

const getProviderUrl = () => {
    const url = CHAINS[DESIRED_CHAIN_ID].urls[0] || '';
    const chainName = CHAINS[DESIRED_CHAIN_ID].name;

    if (!url) throw new Error('web3 json rpc url not defined');

    console.log('connecting to chain ', chainName);
    console.log('chain url ', url);

    return url;
};

export let web3provider = new ethers.providers.WebSocketProvider(getProviderUrl());

export const initWeb3Provider = () => {
    web3provider = new ethers.providers.WebSocketProvider(getProviderUrl());
};