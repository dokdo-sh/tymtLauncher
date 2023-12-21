import { IWallet } from "./IWallet"
import {mnemonicToSeed} from 'bip39'
import * as ed25519 from 'ed25519-hd-key';
import { Keypair, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { net_name } from "../../configs";

class Solana implements IWallet {
    address:string;
    ticker: "SOL";

    constructor() {
        this.address = "";
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        const seed = await mnemonicToSeed(mnemonic);
        // Derive the solana address seed from the master seed
        const derivationPath = "m/44'/501'/0'/0'";
        const derivedSeed = ed25519.derivePath(derivationPath, seed.toString('hex')).key;
        // Create the keypair from the derived seed
        const keypair = Keypair.fromSeed(derivedSeed);
        // Get the public key (address) and the private key from the keypair
        const publicKey = keypair.publicKey.toString();
        // const privateKey = keypair.secretKey.toString();
        return publicKey
    }

    static async getBalance(addr:string) : Promise<number> {
        try {       
            let network = undefined
            if (net_name === "mainnet"){
                network = clusterApiUrl("mainnet-beta"); // You can change this to 'mainnet-beta' or 'testnet'
            } else {
                network = clusterApiUrl("devnet"); 
            }  
            const connection = new Connection(network);
            // Get the balance of your solana address in lamports
            const pbKey = new PublicKey(addr);
            const balance = await connection.getBalance(pbKey);
            // Convert the balance from lamports to sols
            const sols = balance / 1e9;
            return sols;
        } catch {
            return 0;
        }
    }

    static async getTransactions(addr: string) : Promise<any> {
        try {
            let network = undefined
            if (net_name === "mainnet"){
                network = clusterApiUrl("mainnet-beta"); // You can change this to 'mainnet-beta' or 'testnet'
            } else {
                network = clusterApiUrl("devnet"); 
            }            
            const connection = new Connection(network);
            // addr = "2AQdpHJ2JpcEgPiATUXjQxA8QmafFegfQwSLWSprPicm"
            // Get the balance of your solana address in lamports
            const pbKey = new PublicKey(addr);
            const signatures = await connection.getSignaturesForAddress(pbKey, {limit:10})            
            return signatures;
        } catch {
            return undefined;
        }
    }
}

export default Solana;