import Ethereum from "../wallets/Ethereum";
import Solar from "../wallets/Solar";
import { validateMnemonic, generateMnemonic } from 'bip39'
import Games from "../api/Games";
import { BaseDirectory, createDir, readDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api";
import { type } from "@tauri-apps/api/os";
import { appDir } from "@tauri-apps/api/path";
import { encrypt, decrypt } from '@metamask/browser-passworder'
import { Wallet } from "../store/walletSlice";
import BSC from "../wallets/BSC";
import Solana from "../wallets/Solana";
import Polygon from "../wallets/Polygon";
import Avalanche from "../wallets/Avalnche";
import Arbitrum from "../wallets/Arbitrum";
import Bitcoin from "../wallets/Bitcoin";
import Optimism from "../wallets/Optimism";

export type BlockchainKey =
  | "solar"
  | "bsc"
  | "eth"
  | "solana"
  | "polygon"
  | "avalanche"
  | "arbitrum"
  | "btc"
  | "op"
  // | "cardano"
  // | "doge"
  ;

const TymtCore = {
  Launcher: {
    Vault: {},
    Settings: {
      init: async () => {
        try {
          await readDir('', { dir: BaseDirectory.App });
        }
        catch {
          await createDir('', {
            dir: BaseDirectory.App,
            recursive: true
          });
          try {
            await readTextFile("settings.json", {
              dir: BaseDirectory.App
            });
          } catch {

          }
        }
      },
      hasMnemonic: async () => {
        try {
          let raw_settings = await readTextFile("settings.json", {
            dir: BaseDirectory.App
          })
          return raw_settings.startsWith('{"data":')
        }
        catch {
          return false
        }
      },
      load: async (password: string) => {
        try {
          let raw_settings = await readTextFile("settings.json", {
            dir: BaseDirectory.App
          });

          let settings = await decrypt<any>(password, raw_settings)
          if (settings.settings !== undefined) {
            return settings
          } else {
            return false
          }
        }
        catch {
          return false
        }
      },
      save: async (wallet: Wallet | false, password: string) => {
        await writeTextFile("settings.json", await encrypt(password, { settings: { wallet: wallet } }), {
          dir: BaseDirectory.App
        })
      }
    },
    Library: {
      isInstalled: async (key: string): Promise<boolean> => {
        try {
          let entries = await readDir(`games/${key}`, {
            dir: BaseDirectory.App,
            recursive: false
          });
          return entries.length > 0;
        } catch {
          return false;
        }
      },
      install: (key: string) => {

      }
    },
    Downloads: {

    },
    Launch: async (gamekey: string, args: string[] = []) => {
      async function getBinaryLocation() {
        let [platform, baseDir] = await Promise.all([
          type(),
          (async () => { return `/games/${gamekey}` })()
        ]);

        switch (platform) {
          case 'Linux':
            return `${gamekey}.AppImage`;

          case 'Darwin':
            return `${gamekey}.app`;

          case 'Windows_NT':
            return `${Games[gamekey].executables.windows.file ? Games[gamekey].executables.windows.file : gamekey}.exe`;
        }
      }
      const platform = await type();
      let os_type = 1   // Linux, MacOS
      if (platform === 'Windows_NT')
      {
        os_type = 2     // windows
      } 
      
      await invoke('open_game', {
        loc: await getBinaryLocation(),
        contentDir: `/games/${gamekey}`,
        args: args,
        platform: os_type
      });

    },
  },
  Crypto: {
    validateMnemonic: (mnemonic: string): boolean => {
      if (mnemonic.split(" ").length == 24) {
        return validateMnemonic(mnemonic.split(" ").slice(0, 12).join(" ")) && validateMnemonic(mnemonic.split(" ").slice(12, 24).join(" "))
      } else {
        return validateMnemonic(mnemonic);
      }
    },
    generateMnemonic: (): string => {
      return `${generateMnemonic()} ${generateMnemonic()}`
    }
  },
  Blockchains: {
    solar: {
      name: "Solar",
      ticker: "SXP",
      wallet: Solar,
      explorer: "https://solarscan.com/wallet/",
      txexplorer: "https://solarscan.com/transaction/",
    },
    bsc: {
      name: "Binance Smart Chain",
      ticker: "BNB",
      wallet: BSC,
      explorer: "https://bscscan.com/address/",
      txexplorer: "https://bscscan.com/tx/",
    },
    eth: {
      name: "Ethereum",
      ticker: "ETH",
      wallet: Ethereum,
      explorer: "https://etherscan.io/address/",
      txexplorer: "https://etherscan.io/tx/",
    },
    btc: {
      name: "Bitcoin",
      ticker: "BTC",
      wallet: Bitcoin,
      explorer: "https://www.blockchain.com/explorer/addresses/btc/",
      txexplorer: "https://www.blockchain.com/explorer/transactions/btc/",
    },
    // doge: {
    //   name: "Dogecoin",
    //   ticker: "DOGE",
    //   wallet: Dogecoin,
    // },
    solana: {
      name: "Solana",
      ticker: "SOL",
      wallet: Solana,
      explorer: "https://solscan.io/account/",
      txexplorer: "https://solscan.io/tx/",
    },
    polygon: {
      name: "Polygon",
      ticker: "MATIC",
      wallet: Polygon,
      explorer: "https://polygonscan.com/address/",
      txexplorer: "https://polygonscan.com/tx/",
    },
    avalanche: {
      name: "Avalanche",
      ticker: "AVAX",
      wallet: Avalanche,
      explorer: "https://avascan.info/blockchain/c/address/",
      txexplorer: "https://avascan.info/blockchain/c/tx/",
    },
    arbitrum: {
      name: "Arbitrum One",
      ticker: "ETH",
      wallet: Arbitrum,
      explorer: "https://arbiscan.io/address/",
      txexplorer: "https://arbiscan.io/tx/",
    },
    op: {
      name: "Optimism",
      ticker: "ETH",
      wallet: Optimism,
      explorer: "https://optimistic.etherscan.io/address/",
      txexplorer: "https://optimistic.etherscan.io/tx/",
    },
    // cardano: {
    //   name: "Cardano",
    //   ticker: "ADA",
    //   wallet: Cardano,
    // }
  },
};

export default TymtCore;
