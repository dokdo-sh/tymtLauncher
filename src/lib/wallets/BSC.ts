import { IWallet } from "./IWallet";
import {ethers} from 'ethers';
import {hdkey} from 'ethereumjs-wallet';
import {mnemonicToSeed} from 'bip39';
import { bsc_api_key, bsc_api_url, bsc_rpc_url } from "../../configs";

class BSC implements IWallet {
    address:string;
    ticker: "BNB";

    constructor() {
        this.address = "";
    }

    static async getWalletFromMnemonic(mnemonic: string) : Promise<any> {
        const seed = await mnemonicToSeed(mnemonic);
        const hdNode = hdkey.fromMasterSeed(seed);
        const node = hdNode.derivePath(`m/44'/60'/0'`);
        const change = node.deriveChild(0);
        const childNode = change.deriveChild(1);
        const childWallet = childNode.getWallet();
        const wallet = new ethers.Wallet(childWallet.getPrivateKey().toString('hex'));
        return wallet
    }

    static async getAddress(mnemonic: string) : Promise<string> {
        const wallet = await BSC.getWalletFromMnemonic(mnemonic)
        return wallet.address;
    }

    static async getBalance(addr:string) : Promise<number> {
        try{
            const result = (await (await fetch(`${bsc_api_url}?module=account&action=balance&address=${addr}&apikey=${bsc_api_key}`)).json()).result;
            return (result as number)/1000000000/1000000000
        } catch {
            return 0;
        }
        // try {
        //     const customProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
        //     return parseFloat(ethers.utils.formatEther(await customProvider.getBalance(addr)));
        // } catch {
        //     return 0;
        // }
    }

    static async getTransactions(addr: string) : Promise<any> {
        try {
            return (await (await fetch(`${bsc_api_url}?module=account&action=txlist&address=${addr}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${bsc_api_key}`)).json()).result;
        } catch {
            return undefined;
        }
    }

    static async sendTransaction(passphrase: string, tx : { recipients: any[], fee : string,  vendorField? : string}, secondPassphrase?: string) {
        if (tx.recipients.length>0) {
            try{
                let wallet = await BSC.getWalletFromMnemonic(passphrase)
                const customProvider = new ethers.providers.JsonRpcProvider(bsc_rpc_url)
                wallet = wallet.connect(customProvider)
                tx.recipients.map(async (recipient) => {
                    console.log("receipient", recipient)
                    const response = await wallet.sendTransaction({to: recipient.address, value: ethers.utils.parseEther(recipient.amount)}); // send the transaction
                    console.log("trx", response)
                    const receipt = await response.wait(1); // wait for 1 confirmation
                    console.log("receipt", receipt)
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
            } catch (e){
                return false
            }
        }
    }
}

export default BSC;