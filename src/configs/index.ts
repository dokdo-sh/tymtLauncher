export const net_name = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? "mainnet" : "testnet"
export const api_url = process.env.REACT_APP_NETWORK_NAME === "mainnet" ? process.env.REACT_APP_MAINNET_API_URL : process.env.REACT_APP_TESTNET_API_URL

