
export interface BasicChainInformation {
    urls: (string | undefined)[]
    name: string
  }

export const CHAINS: { [chainId: number]: BasicChainInformation } = {
    1: {
        urls: [
            process.env.INFURA_DEV_KEY ? `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined,
            process.env.alchemyKey ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined,
            'https://cloudflare-eth.com',
        ],
        name: 'Mainnet',
    },
    3: {
        urls: [process.env.INFURA_DEV_KEY ? `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined],
        name: 'Ropsten',
    },
    4: {
        urls: [process.env.INFURA_DEV_KEY ? `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined],
        name: 'Rinkeby',
    },
    5: {
        urls: [process.env.INFURA_DEV_KEY ? `wss://goerli.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined],
        name: 'goerli',
    },
    42: {
        urls: [process.env.INFURA_DEV_KEY ? `wss://kovan.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined],
        name: 'Kovan',
    },
    // Optimism
    10: {
        urls: [
            process.env.INFURA_DEV_KEY ? `wss://optimism-mainnet.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined,
            'https://mainnet.optimism.io',
        ],
        name: 'Optimistic Ethereum',
    },
    69: {
        urls: [
            process.env.INFURA_DEV_KEY ? `wss://optimism-kovan.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined,
            'https://kovan.optimism.io',
        ],
        name: 'Optimistic Kovan',
    },
    // Arbitrum
    42161: {
        urls: [
            process.env.INFURA_DEV_KEY ? `wss://arbitrum-mainnet.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined,
            'https://arb1.arbitrum.io/rpc',
        ],
        name: 'Arbitrum One',
    },
    421611: {
        urls: [
            process.env.INFURA_DEV_KEY ? `wss://arbitrum-rinkeby.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined,
            'https://rinkeby.arbitrum.io/rpc',
        ],
        name: 'Arbitrum Testnet',
    },
    // Polygon
    137: {
        urls: [
            process.env.INFURA_DEV_KEY ? `https://polygon-mainnet.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined,
            'https://polygon-rpc.com',
        ],
        name: 'matic',
    },
    80001: {
        urls: [process.env.INFURA_DEV_KEY ? `https://polygon-mumbai.infura.io/ws/v3/${process.env.INFURA_DEV_KEY}` : undefined],
        name: 'maticmum',
    },
    100: {
        urls: ['https://rpc.gnosischain.com'],
        name: 'Gnosis Chain (formerly xDai)',
    },
};

export const XDAI_CHAIN_ID = 100;

export const DESIRED_CHAIN_ID = Number(process.env.DESIRED_CHAIN_ID || XDAI_CHAIN_ID);

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce((accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls.filter((url) => url) as string[];

    if (validURLs.length) {
        accumulator[Number(chainId)] = validURLs;
    }

    return accumulator;
}, {} as { [chainId: number]: string[] });