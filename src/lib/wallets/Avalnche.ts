import { IWallet } from "./IWallet"
import {ethers} from 'ethers'
import {hdkey} from 'ethereumjs-wallet'
import {mnemonicToSeed} from 'bip39'
import axios from "axios"
import { avax_provider_url } from "../../configs"

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
            const customProvider = new ethers.providers.JsonRpcProvider(avax_provider_url);
            return parseFloat(ethers.utils.formatEther(await customProvider.getBalance(addr)))    
        } catch {
            return 0
        }
    }

    static async getTransactions(address: string) : Promise<any> {
        try {
            const customProvider = new ethers.providers.JsonRpcProvider(avax_provider_url)
                        const response = await axios.get(
                avax_provider_url,
                {
                    params: {
                    format: 'json',
                    action: 'avm.getTransactions',
                    address,
                    },
                }
            );
        
            const transactions = response.data.result.transactions;
            console.log('Recent Transactions:', transactions);
            return transactions;
          } catch (error) {
            console.error('Error fetching transactions:', error);
            return []
          }
    }
}

export default Avalanche;