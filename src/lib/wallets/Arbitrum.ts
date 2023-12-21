import { IWallet } from "./IWallet"
import {ethers} from 'ethers'
import {hdkey} from 'ethereumjs-wallet'
import {mnemonicToSeed} from 'bip39'
import { arb_api_key, arb_api_url } from "../../configs"


class Arbitrum implements IWallet {
    address:string;
    ticker: "ETH";
            
    constructor() {
        this.address = "";
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        const seed = await mnemonicToSeed(mnemonic);
        const hdNode = hdkey.fromMasterSeed(seed);
        const node = hdNode.derivePath(`m/44'/60'/0'`);
        const change = node.deriveChild(0);
        const childNode = change.deriveChild(1);
        const childWallet = childNode.getWallet();
        const wallet = new ethers.Wallet(childWallet.getPrivateKey().toString('hex'));
        return wallet.address;
    }

    static async getBalance(addr:string) : Promise<number> {
        try{
            const result = (await (await fetch(`${arb_api_url}?module=account&action=balance&address=${addr}&tag=latest&apikey=${arb_api_key}`)).json()).result;
            return (result as number)/1000000000/1000000000
        } catch {
            return 0;
        }
        // try {
        //     const customProvider = new ethers.providers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");
        //     return parseFloat(ethers.utils.formatEther(await customProvider.getBalance(addr)))    ;
        // } catch {
        //     return 0;
        // }
    }

    static async getTransactions(addr: string) : Promise<any> {
        try {
            return (await (await fetch(`${arb_api_url}?module=account&action=txlist&address=${addr}&startblock=0&endblock=latest&page=1&offset=10&sort=desc&apikey=${arb_api_key}`)).json()).result;
        } catch {
            return undefined;
        }
    }
}

export default Arbitrum;