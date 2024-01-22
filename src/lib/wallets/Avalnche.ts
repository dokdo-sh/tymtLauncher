import { IWallet } from "./IWallet"
import {ethers} from 'ethers'
import {hdkey} from 'ethereumjs-wallet'
import {mnemonicToSeed} from 'bip39'
import { avax_api_url, avax_rpc_url } from "../../configs"

class Avalanche implements IWallet {
    address:string;
    ticker: "AVAX";
    
    constructor() {
        this.address = ""
    }

    static async getWalletFromMnemonic(mnemonic: string) : Promise<any> {
        const seed = await mnemonicToSeed(mnemonic);
        const hdNode = hdkey.fromMasterSeed(seed);
        const node = hdNode.derivePath(`m/44'/60'/0'`)
        const change = node.deriveChild(0);
        const childNode = change.deriveChild(1);
        const childWallet = childNode.getWallet();
        const wallet = new ethers.Wallet(childWallet.getPrivateKey().toString('hex'));
        return wallet
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        const wallet = await Avalanche.getWalletFromMnemonic(mnemonic)
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

    static async sendTransaction(passphrase: string, tx : { recipients: any[], fee : string,  vendorField? : string}, secondPassphrase?: string) {
        if (tx.recipients.length>0) {
            try{
                let wallet = await Avalanche.getWalletFromMnemonic(passphrase)
                const customProvider = new ethers.providers.JsonRpcProvider(avax_rpc_url)
                wallet = wallet.connect(customProvider)
                tx.recipients.map(async (recipient) => {
                    const response = await wallet.sendTransaction({to: recipient.address, value: ethers.utils.parseEther(recipient.amount)}); // send the transaction
                    const receipt = await response.wait(1); // wait for 1 confirmation
                    // get the transaction hash
                    const hash = receipt.transactionHash;
                    // get the block number
                    const block = receipt.blockNumber;
                    // get the status
                    const status = receipt.status ? "Success" : "Failure";
                    // get the gas used
                    const gas = receipt.gasUsed.toString();
                    // display the information
                    console.log(`Transaction: [${hash}](^5^${hash})`);
                    console.log(`Block: ${block}`);
                    console.log(`Status: ${status}`);
                    console.log(`Gas Used: ${gas}`);
                    console.log("----------");
                })
                return true
            } catch {
                return false
            }
        }
    }
}

export default Avalanche;