import {Identities, Managers} from '@solar-network/crypto'  
import { IWallet } from './IWallet';

class Solar implements IWallet {

    address:string;

    constructor(mnemonic:string) {
        Managers.configManager.setFromPreset("mainnet")
        this.address = Identities.Address.fromPassphrase(mnemonic)
    }

    static async getAddress(mnemonic:string) : Promise<string> {
        Managers.configManager.setFromPreset("mainnet")
        return Identities.Address.fromPassphrase(mnemonic);
    }
    
    static async getBalance(addr:string) : Promise<number> {       

        try {
            return ((await (await fetch(`https://sxp.mainnet.sh/api/wallets/${addr}`)).json()).data.balance as number) / 100000000;
       } catch {
           return 0;
       }
    }

}
export default Solar;