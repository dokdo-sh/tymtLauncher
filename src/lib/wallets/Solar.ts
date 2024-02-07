//@ts-ignore
import {Managers, Identities, Transactions} from "@solar-network/crypto"; 
import { generateMnemonic } from "bip39";
import { IWallet } from "./IWallet";
import Big from "big.js";
import SolarAPI from "../api/SolarAPI";
import { net_name, api_url } from "../../configs";


export class Solar implements IWallet {

    address:string;
    name:string;
    publicKey:string;
    balance: number;
    passphrase: string;
    secondPassphrase:string;
    ticker: "SXP";
    
    constructor(mnemonic:string) {
        Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");

        this.passphrase = mnemonic;
        this.address = Identities.Address.fromPassphrase(mnemonic);
        fetch(`${api_url}/wallets/${this.address}`).then((response) => {
            response.json().then((data) =>  {
                this.publicKey = data.publicKey;
            });
        })
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
        return Identities.Address.fromPassphrase(mnemonic);
    }

    async getCurrentBalance() : Promise<number> {       
        try {
            return (await (await fetch(`${api_url}/wallets/${this.address}`)).json()).data.balance as number;
        } catch {
            return 0;
        }
    }

    static async getBalance(addr:string) : Promise<number> {
        try {
            return ((await (await fetch(`${api_url}/wallets/${addr}`)).json()).data.balance as number) / 100000000;
        } catch {
            return 0;
        }
    }

    static validateAddress(address:string) : boolean {
        Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
        return Identities.Address.validate(address);        
     }
     static isValidPassphrase(passphrase:string) : boolean {
        if (passphrase.split(" ").length >= 8) {
            if (Identities.Address.fromPassphrase(passphrase).length === 34) {
                return true;
            }
        }
        return false;
     }
     static async generateMnemonic() : Promise<string> {
        const passphrase = generateMnemonic();
        return passphrase;
     }
     static async isSecondSignatureFromAddress(address:string) {
        let walletAttributes = (await (await fetch(`${api_url}/wallets/${address}`)).json()).data.attributes
        if (walletAttributes) {
            if (walletAttributes.secondPublicKey) {
                return true;
            } else {
                return false;
            }
        }  else {
            return false;
        }
     }
     async isSecondSignature() {
        let walletAttributes = (await (await fetch(`${api_url}/wallets/${this.address}`)).json()).data.attributes
        if (walletAttributes) {
            if (walletAttributes.secondPublicKey) {
                return true;
            } else {
                return false;
            }
        }  else {
            return false;
        }
     }
     static async isSecondSignatureFromPassphrase(passphrase:string) : Promise<boolean> {
        return await this.isSecondSignatureFromAddress(this.addressFromPassphrase(passphrase))
     }
     static async isValidSecondSignature(passphrase:string, secondpassphrase:string) : Promise<boolean> {
        Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
        let testTx = Transactions.BuilderFactory.vote()
            .nonce("1")
            .votesAsset({})
            .fee("42")
            .sign(passphrase)
            .secondSign(secondpassphrase)
            .getStruct()
        let walletPublicKey = (await (await fetch(`${api_url}/wallets/${this.addressFromPassphrase(passphrase)}`)).json()).data.attributes.secondPublicKey
        if (walletPublicKey) {
            return Transactions.Verifier.verifySecondSignature(testTx,walletPublicKey)
        } else {
            return false
        }
        
     }
     static addressFromPassphrase(passphrase:string) : string {
        Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
        return Identities.Address.fromPassphrase(passphrase)
     }

     validateAddress(address:string) : boolean {
        Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
        return Identities.Address.validate(address);
     }

    async getVote() : Promise<any> {
        try {
         return (await (await fetch(`${api_url}/wallets/${this.address}`)).json()).data.votingFor;
        } catch {
            return "";
        }
     } 

    static async getTransactions(addr: string) : Promise<any> {
        try {
            return (await (await fetch(`${api_url}/wallets/${addr}/transactions?page=1`)).json()).data;
        } catch {
            return undefined;
        }
    }

    async getTransaction(txId:string) : Promise<any> {
        try {
         return (await (await fetch(`${api_url}/transactions/${txId}`)).json()).data;
        } catch {
            return undefined;
        }
     } 

    static async sendTransaction(passphrase: string, tx : {recipients: any[], fee : string,  vendorField? : string}, secondPassphrase?: string) {
        const addr = await Solar.getAddress(passphrase)
        let nonce : number = await Solar.getCurrentNonce(addr)
        if (tx.recipients.length>0) {
            if (tx.recipients.length>1) {
                Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
                let transaction = Transactions.BuilderFactory.transfer()
                tx.recipients.map((recipient) => {
                    transaction.addTransfer(recipient.address,Big(recipient.amount).times(10 ** 8).toFixed(0))
                })
              let itransaction = transaction.fee(Big(tx.fee).times(10 ** 8).toFixed(0))
                    .nonce((nonce + 1).toString());
                if (tx.vendorField && tx.vendorField.length>0) {
                    itransaction = itransaction.memo(tx.vendorField)
                }
                let txJson = itransaction.sign(passphrase)
                if (secondPassphrase.length) {
                    txJson = itransaction.secondSign(secondPassphrase)
                }
                let iTxJson = txJson.build().toJson();
                let res = await SolarAPI.addTxToQueue(JSON.stringify({transactions: [iTxJson]}), api_url)
                return res.status === 200
            } else {                
                Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
                let transaction = Transactions.BuilderFactory.transfer()
                    .recipientId(tx.recipients[0].address)
                    .version(3)
                    .amount(Big(tx.recipients[0].amount).times(10 ** 8).toFixed(0))
                let itransaction = transaction.fee(
                    Big(tx.fee)
                        .times(10 ** 8)
                        .toFixed(0)
                    )
                    .nonce((nonce + 1).toString());
                if (tx.vendorField && tx.vendorField.length>0) {
                    itransaction = itransaction.memo(tx.vendorField)
                }

                let txJson = itransaction.sign(passphrase)

                if (secondPassphrase && secondPassphrase.length > 0) {
                    txJson = itransaction.secondSign(secondPassphrase)
                }
                
                let res = await SolarAPI.addTxToQueue(JSON.stringify({ transactions: [txJson.build().toJson()] }), api_url)
                return res.status === 200
            }
        }
    }

    static getCurrentNonce(address: string) {
        return new Promise<number>((resolve, reject) => {
          (async () => {
            try {
              let walletInfo: any = await (await fetch(`${api_url}/wallets/${address}`
              )).json();
              resolve(parseInt(walletInfo.data.nonce));
            } catch (e) {
              reject(e);
            }
          })();
        });
    }

    async vote(votesAsset: any, fee:string) {
        Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet")
        let nonce = await Solar.getCurrentNonce(this.address)        
        // let passphrase = await Armor.Vault.getPassphrase(this.passphrase,password)
        let tx = Transactions.BuilderFactory.vote()
            .nonce((nonce + 1).toString())
            .votesAsset(votesAsset)
            .fee(Big(fee).times(10 ** 8).toFixed(0))
            .sign(this.passphrase)

        if (this.secondPassphrase && this.secondPassphrase.length > 0) {
            tx = tx.secondSign(this.secondPassphrase)
        }
        let txJson = tx.build().toJson();
        
        // Armor.addTxToQueue(JSON.stringify({transactions: [txJson]}),api_url)
        let res = SolarAPI.addTxToQueue(JSON.stringify({ transactions: [txJson] }), api_url)
        return res
    }
}
export default Solar;