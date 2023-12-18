import { Identities, Managers } from '@solar-network/crypto';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { change } from '../../lib/store/gameSlice';
import { selectWallet } from '../../lib/store/walletSlice';
import { net_name } from '../../configs';


export const ProfileSelector = () => {

    const walletState = useAppSelector(selectWallet);
    const [chainKey, setChainKey] = useState('solar')
    const [address, setAddress] = useState('')
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function getAddress() {
        Managers.configManager.setFromPreset(net_name);
        return  Identities.Address.fromPassphrase(walletState.mnemonic);
    }

    useEffect(()=> {
        if(walletState.addresses && walletState.addresses.key){
            setChainKey(walletState.addresses.key)
            setAddress(walletState.addresses.address)
        } else {
            setAddress(getAddress())
        }
    }, [walletState])

    return (
        <div className="flex flex-row px-2">
            <div className="px-3 text-sm font-mono flex flex-row items-center text-center text-primary/70 hover:text-primary font-bold hover:border hover:border-primary cursor-pointer ease-in duration-200 border border-primary/30 py-1 rounded mx-1 divide-x divide-primary space-x-2 " 
                onClick={() =>{dispatch(change(undefined));navigate("/wallet")}}
            >
                <div> <img src={`/blockchains/${chainKey}.png`} className='h-4 inline-block' alt="" /> {address}</div>
            </div>
        </div>
    );

}
