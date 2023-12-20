export const net_name = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? "mainnet" : "testnet"
export const api_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_API_URL : process.env.REACT_APP_TESTNET_API_URL

export const btc_api_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_BTC_URL : process.env.REACT_APP_TESTNET_BTC_URL

export const bsc_api_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_BSC_URL : process.env.REACT_APP_TESTNET_BSC_URL
export const bsc_api_key = process.env.REACT_APP_BSC_API_KEY

export const eth_api_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_ETH_URL : process.env.REACT_APP_TESTNET_ETH_URL
export const eth_api_key = process.env.REACT_APP_ETH_API_KEY

export const matic_api_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_MATIC_URL : process.env.REACT_APP_TESTNET_MATIC_URL
export const matic_api_key = process.env.REACT_APP_MATIC_API_KEY

export const op_api_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_OP_URL : process.env.REACT_APP_TESTNET_OP_URL
export const op_api_key = process.env.REACT_APP_OP_API_KEY

export const arb_api_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_ARB_URL : process.env.REACT_APP_TESTNET_ARB_URL
export const arb_api_key = process.env.REACT_APP_ARB_API_KEY

export const avax_provider_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_AVAX_URL : process.env.REACT_APP_TESTNET_AVAX_URL
export const avax_api_key = process.env.REACT_APP_AVAX_API_KEY
