import { IWallet } from "./IWallet"
import {mnemonicToSeed} from 'bip39'
import { bip32, payments } from 'bitcoinjs-lib';
import axios from 'axios';

class Bitcoin implements IWallet {
    address:string;
    ticker: "BTC";

    constructor(mnemonic:string) {
        this.address = ""
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        const seed = await mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed);
        const child = root.derivePath("m/84'/0'/0'/0/0");
        const publicKey = child.publicKey;
        const address = payments.p2wpkh({ pubkey: publicKey }).address;
        // const privateKey = keypair.privateKey.toString('hex');
        return address
    }

    static async getBalance(addr:string) : Promise<number> {
        try {
            // Define the API URL with the address parameter
            const api_url = "https://blockchain.info/q/addressbalance/" + addr;
            const result = await axios.get(api_url);
            if (result.status == 200){
                // Get the balance from the response text
                const balance = parseFloat(result.data);
                // Convert the balance from satoshis to bitcoins
                const bitcoins = balance / 1e8
                return bitcoins;
            } else {
                return 0;
            }
        } catch {
            return 0
        }
    }
}

export default Bitcoin;