import { useState, useEffect } from 'react';
import {Socket} from 'socket.io-client'
import { BsPlusCircle } from "react-icons/bs";
import { Identities, Managers } from '@solar-network/crypto';
import { useAppSelector } from '../../app/hooks';
import { selectWallet } from '../../lib/store/walletSlice';
import { AddressInput } from '../components/wallet/AddressInput';
import { net_name } from '../../configs';


export const UserList = (props:{partnerName: string, socket: Socket, myId: string, onSelectUser: (user:string) => void}) => {

    const walletState = useAppSelector(selectWallet)
    const [myAddress, setMyAddress] = useState('') 
    // const [Id , setId] = useState(props.myId)
        // const [contacts, setContacts] = useState(['0xfD2820fF09f7c627528a13649ebb4A6F48982D4b', 'DM81JgVzyjHHHzi2aWfgH9yJ9HZujuSgRT'])
    const [contacts, setContacts] = useState([])
    const [selected, setSelected] = useState(props.partnerName)
    const [searchtxt, setSearchtxt] = useState('')
    const [bAdd, setBAdd] = useState(false)
    const [addAddress, setAddAddress] = useState('')

    const onSelect = (user: string) => {
        props.onSelectUser(user)
        setSelected(user)
    }

    useEffect(()=> {
        if (walletState) {
            console.log("wallet:", walletState)
            Managers.configManager.setFromPreset(net_name === "mainnet" ? "mainnet" : "testnet");
            setMyAddress(Identities.Address.fromPassphrase(walletState.mnemonic))
        }
    }, [walletState])
    
    useEffect(()=> {
        props.socket.emit('getUsers');
        props.socket.on('sendUsersList', ({users}) => {
            setContacts(users);
        })
        return ()=> { 
            props.socket.off('sendUsersList')
        }
    })
    
    return (
        <div className="w-1/3 border-r border-gray-800">
            <div className="py-3 px-4 ">
                <input type="text" className="bg-gray-800/50 w-full py-1 px-2 text-sm rounded" placeholder="Search for a friend..." onChange={ (e) => {setSearchtxt(e.target.value)}}/>
            </div>
            <div className='flex flex-row'>
                { bAdd ? <div className='px-4 w-full'>
                    {/* <input type="text" className="bg-gray-800/50 w-full py-1 px-2 text-sm rounded" placeholder="Type Address..." onChange={ (e) => {setSearchtxt(e.target.value)}}/> */}
                    <div className="flex ">
                        <AddressInput
                            onChange={(text) => {
                                setAddAddress(text)
                            }}
                            value={addAddress}
                        />
                    </div>
                </div> : <div className='w-full'></div>}
                <div className='flex flex-row justify-end' onClick={()=>{ 
                        if (bAdd) { 
                            if (addAddress.length > 25) {
                                setContacts( prevContacts => [...prevContacts, addAddress])
                            }
                        } 
                        setBAdd(prevAdd => !prevAdd)
                    }}>
                    <div className="px-3 py-3 hover:bg-gray-500">
                        <BsPlusCircle className="mx-auto"/>
                    </div>
                </div>
            </div>
            <div className="h-[1px] bg-gray-800"></div>
            <div>
                {
                    contacts.map((user) => {
                        if (!searchtxt || (searchtxt && user.toLowerCase().includes(searchtxt.toLocaleLowerCase()))){
                            return (
                                <div className='py-2 px-3 flex flex-row hover:bg-gray-500' style={{background: user === selected ? '#008080': 'transparent'}} onClick={()=> onSelect(user)}>
                                    <img className="rounded-full h-10 w-10 bg-gray-800" src={`/blockchains/solar.png`}></img>
                                    <div>
                                        <div className="px-3 font-bold">{user.substring(0,4)}-{user.substring(user.length-4)}</div>
                                        <div className="italic text-sm px-3 text-gray-100">{user.substring(0,4)}-{user.substring(user.length-4)}</div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    );

}
