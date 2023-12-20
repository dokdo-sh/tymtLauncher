import { IWallet } from "./IWallet"
import {mnemonicToSeed} from 'bip39'
import { bip32, payments, ECPair, networks } from 'bitcoinjs-lib';
import axios from 'axios';
import { btc_api_url, net_name } from "../../configs";


class Bitcoin implements IWallet {
    address:string;
    ticker: "BTC";

    constructor() {
        this.address = ""
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        const seed = await mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed);
        let child;
        if (net_name === "testnet"){
            child = root.derivePath("m/44'/1'/0'/0/0");
            const privateKey = child.privateKey; // get the private key
            const keyPair = ECPair.fromPrivateKey(privateKey, { network: networks.testnet }); // create a key pair for testnet
            const { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.testnet }); // create a testnet address
            return address
        } else {
            child = root.derivePath("m/84'/0'/0'/0/0");
            const privateKey = child.privateKey; // get the private key
            const keyPair = ECPair.fromPrivateKey(privateKey, { network: networks.bitcoin }); // create a key pair for testnet
            const { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.bitcoin }); // create a testnet address
            return address
        } 
    }

    static async getBalance(addr:string) : Promise<number> {
        try {
            if (net_name === 'testnet'){
                // Define the API URL with the address parameter
                const api_url = "https://testnet.smartbit.com.au/api/v1/address/balance?address=" + addr;
                const result = await axios.get(api_url);
                console.log("bit balance", result)
                if (result.status == 200){
                    // Get the balance from the response text
                    const balance = result.data.address.balance;
                    // Convert the balance from satoshis to bitcoins
                    const bitcoins = balance / 1e8
                    return bitcoins;
                } else {
                    return 0;
                }
            } else {
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
            }
        } catch {
            return 0
        }
    }

    static async getTransactions(addr: string) : Promise<any> {
        try {
            let txs = (await (await fetch(`${btc_api_url}/address/txs?address=2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc&limit=10`)).json());//.data.txs;
            console.log("transactions", txs);
            return [];
        } catch {
            return undefined;
        }
    }
}

export default Bitcoin;