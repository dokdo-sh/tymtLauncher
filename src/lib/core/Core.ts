import Ethereum from "../wallets/Ethereum";
import Solar from "../wallets/Solar";

export type BlockchainKey =
  | "solar"
  | "bsc"
  | "eth"
  | "solana"
  | "polygon"
  // | "doge"
  // | "btc"
;



const Core = {
  Launcher: {
    Vault: {},
    Settings: {},
    Library: {},
    Downloads: {
      
    }
  },
  Blockchains: {
    solar: {
      name: "Solar",
      ticker: "SXP",
      wallet: Solar,
    },
    bsc: {
      name: "Binance Smart Chain",
      ticker: "BNB",
      wallet: Ethereum,
    },
    eth: {
      name: "Ethereum",
      ticker: "ETH",
      wallet: Ethereum,
    },
    // btc: {
    //   name: "Bitcoin",
    //   ticker: "BTC",
    //   wallet: Ethereum,
    // },
    // doge: {
    //   name: "Dogecoin",
    //   ticker: "DOGE",
    //   wallet: Ethereum,
    // },
    solana: {
      name: "Solana",
      ticker: "SOL",
      wallet: Ethereum,
    },
    polygon: {
      name: "Polygon",
      ticker: "MATIC",
      wallet: Ethereum,
    },
    // polka: {
    //   name: "Polkadot",
    //   ticker: "DOT",
    //   wallet: Ethereum,
    // }
  },
};

export default Core;
