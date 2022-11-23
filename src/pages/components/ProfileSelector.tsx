import { Identities, Managers } from '@solar-network/crypto';
import { redirect, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { change } from '../../lib/store/gameSlice';
import {changeWallet, selectWallet} from '../../lib/store/walletSlice'
export const ProfileSelector = () => {
    const walletState = useAppSelector(selectWallet)
    const dispatch = useAppDispatch();

    const navigate = useNavigate()

        function getAddress() {
            Managers.configManager.setFromPreset("mainnet")
        return  Identities.Address.fromPassphrase(walletState.mnemonic)
        }

        return (
            <div className="flex flex-row px-2">
                            <div className="px-3 text-sm font-mono flex flex-row items-center text-center text-primary/70 hover:text-primary font-bold hover:border hover:border-primary cursor-pointer ease-in duration-200 border border-primary/30 py-1 rounded mx-1 divide-x divide-primary space-x-2 " onClick={() =>{dispatch(change(undefined));navigate("/wallet")}}>
                                <div> <img src="/blockchains/solar.png" className='h-4 inline-block' alt="" /> {getAddress()}</div>
                            </div>
                                        {/* <div className="px-3 text-sm font-mono flex flex-row items-center text-center text-primary/70 hover:text-primary font-bold hover:border hover:border-primary cursor-pointer ease-in duration-200 border border-primary/30 py-1 divide-x divide-primary space-x-2 opacity-50 hover:opacity-100">
                                <div className='flex flex-row'>
                                    <img src="/solar.png"  className="w-4 " alt="" />
                                <div className="pl-3">1519 SXP</div>
                                </div>
                            </div> */}
            </div>
        );

}
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}

