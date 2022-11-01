import { useAppSelector } from '../../app/hooks';
import {changeWallet, selectWallet} from '../../lib/store/walletSlice'
export const ProfileSelector = () => {
    const walletState = useAppSelector(selectWallet)
    if (walletState != undefined) {
        return (
            <div className="flex flex-row px-2">
                            <div className="px-3 text-sm font-mono flex flex-row items-center text-center text-primary/70 hover:text-primary font-bold hover:border hover:border-primary cursor-pointer ease-in duration-200 border border-primary/30 py-1 mx-1 divide-x divide-primary space-x-2 " onClick={() => {window.location.href = "/wallet"}}>
                                <div>Wallet</div>
                            </div>
                                        {/* <div className="px-3 text-sm font-mono flex flex-row items-center text-center text-primary/70 hover:text-primary font-bold hover:border hover:border-primary cursor-pointer ease-in duration-200 border border-primary/30 py-1 divide-x divide-primary space-x-2 opacity-50 hover:opacity-100">
                                <div className='flex flex-row'>
                                    <img src="/solar.png"  className="w-4 " alt="" />
                                <div className="pl-3">1519 SXP</div>
                                </div>
                            </div> */}
            </div>
        );
    } else {
        return ( <div></div> )
    }
}
