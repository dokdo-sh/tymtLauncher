import { IWallet } from "./IWallet"
import {ethers} from 'ethers'
import {hdkey} from 'ethereumjs-wallet'
import {mnemonicToSeed} from 'bip39'
import axios from "axios"
import { avax_api_url, avax_rpc_url } from "../../configs"

class Avalanche implements IWallet {
    address:string;
    ticker: "AVAX";
    
    constructor() {
        this.address = ""
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        const seed = await mnemonicToSeed(mnemonic);
        const hdNode = hdkey.fromMasterSeed(seed);
        const node = hdNode.derivePath(`m/44'/60'/0'`)
        const change = node.deriveChild(0);
        const childNode = change.deriveChild(1);
        const childWallet = childNode.getWallet();
        const wallet = new ethers.Wallet(childWallet.getPrivateKey().toString('hex'));
        return wallet.address
    }

    static async getBalance(addr:string) : Promise<number> {
        try {
            // addr = "0x5152Cafa4321CFA6f02f5aB7676e4F3920764Fcb"
            const customProvider = new ethers.providers.JsonRpcProvider(avax_rpc_url);
            return parseFloat(ethers.utils.formatEther(await customProvider.getBalance(addr)))    
        } catch {
            return 0
        }
    }

    static async getTransactions(addr: string) : Promise<any> {
        try {
            // addr = "0x5152Cafa4321CFA6f02f5aB7676e4F3920764Fcb"
            return (await (await fetch(`${avax_api_url}/address/${addr}/transactions?sort=desc&limit=10`)).json()).items
          } catch (error) {
            console.error('Error fetching transactions:', error);
            return []
          }
    }
}

export default Avalanche;