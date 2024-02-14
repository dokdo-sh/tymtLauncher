import { useState, useEffect } from 'react';
import {Socket} from 'socket.io-client'
import { BsPlusCircle } from "react-icons/bs";
import { AddressInput } from '../components/wallet/AddressInput';
import ChatContact from '../../lib/core/ChatContact';
import { secret_key_aes } from '../../configs'


export const UserList = (props:{partnerName: string, socket: Socket, myId: string, onSelectUser: (user:string) => void}) => {

    // const [contacts, setContacts] = useState(['0xfD2820fF09f7c627528a13649ebb4A6F48982D4b', 'DM81JgVzyjHHHzi2aWfgH9yJ9HZujuSgRT'])
    const [selected, setSelected] = useState(props.partnerName)
    const [searchtxt, setSearchtxt] = useState('')
    const [bAdd, setBAdd] = useState(false)
    const [addAddress, setAddAddress] = useState('')
    const [contactList, setContactList] = useState([])
    const [showAddressBar, setShowAddressBar] = useState(false)

    const onSelect = (user: string) => {
        props.onSelectUser(user)
        setSelected(user)
    }

    const handleAddContact = async (addContact: string) => {
        if (contactList.indexOf(addContact) === -1 && props.myId !== addContact){
            // console.log("list add ", [...contactList, addContact])
            ChatContact.save([...contactList, addContact], secret_key_aes)
            setContactList([...contactList, addContact])
            setAddAddress("")
        }
    }

    const handleListSync = async (users: string[]) => {
        let new_users: string[] = []
        users.map( (item) => {
            if (contactList.indexOf(item) === -1 && props.myId !== item) {
                new_users.push(item)
            }
        })
        
        if (new_users.length) {
            await ChatContact.save([...contactList, ...new_users], secret_key_aes)
            setContactList([...contactList, ...new_users])
        }
    }

    const initContacts = async () => {
        await ChatContact.init()
        const list = await ChatContact.load(secret_key_aes)
        // console.log("list", list)
        setContactList(list)
    }

    useEffect(()=> {
        initContacts()
    }, [])
    
    useEffect(()=> {
        props.socket.emit('getUsers');
        props.socket.on('sendUsersList', ({users}) => {
            handleListSync(users)
        })
        return ()=> { 
            props.socket.off('sendUsersList')
        }
    })
    
    return (
        <div className="w-1/3 border-r border-gray-800">
            <div className="flex flex-row">
                <div className="py-3 px-4 w-full">
                    { !showAddressBar ? <input type="text" className="bg-gray-800/50 w-full py-1 px-2 text-sm rounded" placeholder="Search for a friend..." onChange={ (e) => {setSearchtxt(e.target.value)}}/> :
                    <div className="flex ">
                        <AddressInput
                            onChange={(text) => {
                                setAddAddress(text)
                            }}
                            value={addAddress}
                        />
                    </div>}
                </div>
                <div className='flex flex-row justify-end items-center' onClick={()=>{ 
                        if (!showAddressBar) {
                            setShowAddressBar(true)
                        } else if (bAdd) { 
                            if (addAddress.length > 25) {
                                handleAddContact(addAddress)
                            } 
                            setShowAddressBar(false)
                            setBAdd(false)
                        } else {
                            setBAdd(true)
                        }
                    }}>
                    <div className="px-3 py-3 hover:bg-gray-500">
                        <BsPlusCircle className="mx-auto"/>
                    </div>
                </div>
            </div>
            <div className="h-[1px] bg-gray-800"></div>
            <div>
                {
                    contactList.map((user) => {
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
