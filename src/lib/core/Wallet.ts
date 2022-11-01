import { IWallet } from "../wallets/IWallet"
import Core, { BlockchainKey } from "./Core"

export const Wallet = {
    on: (key:BlockchainKey, privatekey: string) : IWallet => {
      return new Core.Blockchains[key].wallet(privatekey)
    }
  }
  