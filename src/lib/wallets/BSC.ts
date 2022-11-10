import { IWallet } from "./IWallet"
import {ethers} from 'ethers'
import {hdkey} from 'ethereumjs-wallet'
import {mnemonicToSeed} from 'bip39'

class BSC implements IWallet {
    address:string;
    
    constructor(mnemonic:string) {

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
            const customProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
            return parseFloat(ethers.utils.formatEther(await customProvider.getBalance(addr)))
    
        } catch {
            return 0
        }
    }
}

export default BSC;