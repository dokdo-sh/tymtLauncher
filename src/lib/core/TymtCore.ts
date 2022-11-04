import Ethereum from "../wallets/Ethereum";
import Solar from "../wallets/Solar";
import {validateMnemonic, generateMnemonic} from 'bip39'
import Games from "../api/Games";
import { BaseDirectory, createDir, readDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api";
import { arch, type } from "@tauri-apps/api/os";
import { appDir } from "@tauri-apps/api/path";
import {encrypt, decrypt} from '@metamask/browser-passworder'
import { Wallet } from "../store/walletSlice";
export type BlockchainKey =
  | "solar"
  | "bsc"
  | "eth"
  | "solana"
  | "polygon"
  // | "doge"
  // | "btc"
;

const InitialSettings = {init: Date.now}

const TymtCore = {
  Launcher: {
    Vault: {},
    Settings: {
      init: async ()  => {
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
          });
          return raw_settings.startsWith('{"data":')
        }
        catch {
          return false
        }
      },
      load: async (password:string) => {
        try {
          let raw_settings = await readTextFile("settings.json", {
            dir: BaseDirectory.App
          });

          let settings = await decrypt(password, raw_settings)
          if (settings.settings != undefined) {
            return settings
          } else {
            return false
          }
        }
        catch {
          return false
        }
      },
      save: async (wallet:Wallet | false, password:string) => {
        await writeTextFile("settings.json", await encrypt(password, {settings: {wallet: wallet}}) , {
          dir: BaseDirectory.App
        })
      }
    },
    Library: {
      isInstalled : async (key:string) : Promise<boolean> => {
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
      install: (key:string) => {
        
      }
    },
    Downloads: {
      
    },
    Launch: async (gamekey:string, args: string[] = []) => {

      async function getBinaryLocation() {
        let [ platform, baseDir ] = await Promise.all([
            type(),
            (async () => {return `${await appDir()}games/${gamekey}`})()
        ]);
    
        switch (platform) {
            case 'Linux':
                return `${baseDir}/${gamekey}.AppImage`;
   
            case 'Darwin':
                return `${baseDir}/${gamekey}.app`;
    
            case 'Windows_NT':
                return `${baseDir}/bin/${gamekey}.exe`;
        }

    }
      await invoke('open_game', {
        loc: await getBinaryLocation(),
        contentDir: `${await appDir()}/games/${gamekey}`,
        args: args
    });
    },
  },
  Crypto: {
    validateMnemonic: (mnemonic: string) : boolean => {
      return validateMnemonic(mnemonic);
    },
    generateMnemonic: () : string => {
      return generateMnemonic()
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

export default TymtCore;
