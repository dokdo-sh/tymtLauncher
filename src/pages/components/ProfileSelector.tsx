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

    useEffect(()=> {
        // console.log("walletState :", walletState)
        if(walletState.addresses && walletState.addresses.key){
            setChainKey(walletState.addresses.key)
            setAddress(walletState.addresses.address)
            console.log(walletState.addresses.address)
        } else {
            Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
            setAddress(Identities.Address.fromPassphrase(walletState.mnemonic))
            setChainKey('solar')
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
