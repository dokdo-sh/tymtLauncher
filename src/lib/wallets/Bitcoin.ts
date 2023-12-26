import { IWallet } from "./IWallet"
import {mnemonicToSeed} from 'bip39'
import { bip32, payments, ECPair, networks, TransactionBuilder } from 'bitcoinjs-lib'
import axios from 'axios'
import { btc_api_url, net_name } from "../../configs";


class Bitcoin implements IWallet {
    address:string;
    ticker: "BTC";

    constructor() {
        this.address = ""
    }

    static async getKeyPair(mnemonic: string) : Promise<any> {
        const seed = await mnemonicToSeed(mnemonic)
        const root = bip32.fromSeed(seed)
        let child;
        if (net_name === "testnet"){
            child = root.derivePath("m/44'/1'/0'/0/0");
            const privateKey = child.privateKey; // get the private key
            const keyPair = ECPair.fromPrivateKey(privateKey, { network: networks.testnet }); // create a key pair for testnet
            return keyPair
        } else {
            child = root.derivePath("m/84'/0'/0'/0/0");
            const privateKey = child.privateKey; // get the private key
            const keyPair = ECPair.fromPrivateKey(privateKey, { network: networks.bitcoin }); // create a key pair for mainnet
            return keyPair
        }
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        const keyPair = await Bitcoin.getKeyPair(mnemonic)
        if (net_name === "testnet"){            
            const { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.testnet }); // create a testnet address
            return address
        } else {            
            const { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network: networks.bitcoin }); // create a mainnet address
            return address
        } 
    }

    static async getBalance(addr:string) : Promise<number> {
        try {
            if (net_name === "mainnet"){
                // Define the API URL with the address parameter
                // addr = "bc1pn6wkcs9s29l2xstms96s9qg738qg2g0m6h9ntkkrfwx6lqx95dvq6ycwxr"
                const result = await axios.get(`${btc_api_url}/q/addressbalance/${addr}`);
                console.log("balance", result);
                if (result.status === 200){
                    // Get the balance from the response text
                    const balance = parseFloat(result.data);
                    // Convert the balance from satoshis to bitcoins
                    const bitcoins = balance / 1e8
                    return bitcoins;
                } else {
                    return 0;
                }                
            } else {
                // Define the API URL with the address parameter
                // addr = "mfWxJ45yp2SFn7UciZyNpvDKrzbhyfKrY8"
                const result = await axios.get(`${btc_api_url}/address/${addr}`);
                if (result.status === 200){
                    // Get the balance from the response text
                    const balance = result.data.chain_stats.funded_txo_sum; // balance in satoshis
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
            if (net_name === "mainnet"){
                // addr = "bc1pn6wkcs9s29l2xstms96s9qg738qg2g0m6h9ntkkrfwx6lqx95dvq6ycwxr"
                const txs = (await (await fetch(`${btc_api_url}/rawaddr/${addr}?limit=10`)).json()).txs
                console.log("txs", txs)
                return txs
            } else {
                const txs = (await (await fetch(`${btc_api_url}/address/${addr}/txs?limit=10`)).json())
                return txs
            }
            
        } catch {
            return [];
        }
    }

    static async sendTransaction(passphrase: string, tx : {recipients: any[], fee : string,  vendorField? : string}, secondPassphrase?: string) {
        if (tx.recipients.length) {
            try{
                const keypair = await Bitcoin.getKeyPair(passphrase)
                const myAddress = await Bitcoin.getAddress(passphrase)
                const amount = Math.round((await Bitcoin.getBalance(myAddress)) * 1e8)  // the amount in satoshis
                
                const prevTrx = (await Bitcoin.getTransactions(myAddress))[0]
                let prevTrxId : string   // the previous transaction id
                if (net_name === 'mainnet'){
                    prevTrxId = prevTrx.hash
                } else {
                    prevTrxId = prevTrx.txid
                }
                
                let txb : TransactionBuilder
                if (net_name === 'mainnet') {
                    txb = new TransactionBuilder(networks.bitcoin)
                } else {
                    txb = new TransactionBuilder(networks.testnet)
                }                    
                const vout = 1; // the output index  
                txb.addInput(prevTrxId, vout);  //, amount
                
                tx.recipients.map((recipient) => {
                    const value = Math.round((recipient.amount as number) * 1e8)
                    txb.addOutput(recipient.address, value);
                })
                // calculate the total value of the outputs
                const totalValue = tx.recipients.reduce((sum, recipient) => sum + Math.round((recipient.amount as number) * 1e8), 0)
                
                const fee = 2500; // the fee in satoshis
                const change = amount - totalValue - fee; // the change in satoshis
                console.log("change amount", change)
                txb.addOutput(myAddress, change);
                const index = 0; // the input index
                txb.sign(index, keypair); // sign the transaction
                const trx = txb.build(); // build the transaction
                const txHex = trx.toHex(); // serialize the transaction
                console.log(txHex); // display the transaction hex

                let url 
                if (net_name === 'mainnet'){
                    url = "https://blockchain.info/pushtx"; // the URL of the service
                } else {
                    url = "https://blockstream.info/testnet/txs/pushtx"
                }
                const data = `tx=${txHex}`; // the data to send
                const response = await axios.post(url, data); // send a POST request with axios
                console.log(response); // display the response
                return true
            } catch (e) {
                console.log(e)
                return false
            }
        }
    }
}

export default Bitcoin;