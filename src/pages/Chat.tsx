import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { UserList } from './chat/UserList'
import { Messages } from './chat/Messages'
import { SendMessage } from './chat/SendMessage'
import { chat_socket_addr } from '../configs'
import { listen } from '@tauri-apps/api/event'
import ChatHistory from '../lib/core/ChatHistory'


export interface MSG {
    room: string,
    content: string,
    from: string,
    to:string,
    createdAt: number,
}

const SAVE_DURATION = 2 * 24 * 60 * 60 * 1000;     // 2 days

const socket_server_url = chat_socket_addr || undefined;
let socket: any = io(socket_server_url, { secure: false });

export const Chat = (props: any) => {
    const [partnerName, setPartnerName] = useState("")
    const [room, setRoom] = useState("")
    const [myId, setMyId] = useState("")
    const [msgReceived, setMsgReceived] = useState<MSG[]>([])
    const [roomMsg, setRoomMsg] = useState<MSG[]>([])
    const [history, setHistory] = useState<MSG[]>([])
    const [newMsg, setNewMsg] = useState<MSG>()
    const [bLoadHistory, setBLoadHistory] = useState(false)

    const onSelectUser = (user : string) => {
        let room_name = user + '-' + myId
        if (user> myId) {
            room_name = myId + '-' + user
        }
        setBLoadHistory(false)
        setRoom(room_name)
        setPartnerName(user)
        loadHistory(room_name)
        // socket.emit('join_room', {user, room_name})
    }

    const loadHistory = async (room_name: string) => {
        const history: MSG[] = await ChatHistory.load()
        console.log("history", history)
        setHistory(history)
        const room_history = history.filter(item => item.room === room_name)
        if (room_history.length > 0) {
            setMsgReceived([ ...msgReceived, ...room_history])
            setBLoadHistory(true)
        }        
    }

    const handleSaveHistory = async ( msg: MSG) => {
        const curTime = Date.now()
        const filtered = history.filter((item) => item.createdAt > (curTime - SAVE_DURATION))
        console.log("filtered", filtered)
        const new_history = [msg, ...filtered];
        setHistory(new_history)
        await ChatHistory.save(new_history)
    }

    const handleSendMsg = (text: string) => {
        if (text.length > 0 && myId.length > 0 && partnerName.length > 0) {
          const __createdtime__ = Date.now();
          
          socket.emit("send-message", {
            to: partnerName,
            from: myId,
            room,
            content: text,
            __createdtime__,
          });
        }
    }

    const handleReceive = async (data:any) => {
        if(data.from && data.to) {
            let rv_room = data.from + '-' + data.to
            if (data.from > data.to) {
                rv_room = data.to + '-' + data.from
            } 
            console.log(data)

            setNewMsg({
                room: rv_room,
                content: data.content,
                from: data.from,
                to: data.to,
                createdAt: data.createdAt,
            })
        }
    }

    const handleServerHistory = async (chatHistory: MSG[]) => {
        console.log("chat history", chatHistory)
        if (chatHistory.length){
            const curTime = Date.now()
            const filtered = chatHistory.filter((item) => item.createdAt > (curTime - SAVE_DURATION))
            
            console.log("filtered history", filtered)
            filtered.reverse()
            setHistory(filtered)
            await ChatHistory.save(filtered)
            console.log("update history", filtered)
            setMsgReceived(filtered)
        }
    }

    const initHistory = async () => {
        await ChatHistory.init()
    }

    useEffect(()=> {
        console.log("new msg", newMsg)
        if (newMsg){
            if (!bLoadHistory) {
                loadHistory(room)
            }
            setMsgReceived((state) => [
                newMsg, ...state
            ])
            handleSaveHistory(newMsg)
        }
    }, [newMsg])

    useEffect(()=>{
        let msglist = msgReceived.filter(item => item.room === room)
        setRoomMsg(msglist)
    }, [msgReceived, room])

    useEffect(() => {
        socket.on('receive_message', handleReceive)
        socket.on('sendChatHistory', (chatHistory: MSG[]) => {            
            handleServerHistory(chatHistory)
        })
        return ()=> { 
            socket.off('receive_message');
            socket.off('sendChatHistory');
        }
    }, [socket])

    useEffect(() => {
        initHistory()
        listen('chatWindow-loaded', ({ event, payload }: { event: string, payload: string }) => { 
            // console.log("payload: ", payload)
            setMyId(payload)
            socket.emit('addressMapId', { chatId: payload})
        });
        return ()=> { 
            socket.off('connect')
        }
    }, [])

    return (
        <div>
            <div className="flex flex-row h-screen">
                <UserList 
                    partnerName={partnerName}                    
                    socket={socket}
                    myId={myId}
                    onSelectUser={onSelectUser}
                />
                <div className="grow flex flex-col">
                    {partnerName.length > 0 && <div className="py-2 px-4 border-b border-gray-800 flex flex-row items-center top-0 right-0 left-0">
                        <div className="grow">
                            <div className="font-bold py-1">{partnerName.length == 0 ? '[User]': partnerName.substring(0,4) + '-' + partnerName.substring(partnerName.length-4)}</div>
                            <div className="italic text-gray-400 text-xs">last seen recently</div>
                        </div> 
                    </div> }    
                            {/* <div className="mx-2 rounded-full  hover:bg-greenish bg-[#f64a28] cursor-pointer py-1 px-4 text-sm font-bold"> 
                                <img src="/blockchains/solar.png" className="w-6 inline-block" alt="" /> Send SXP</div> */}
                            {/* <BsSearch className="mx-2 text-gray-300 hover:text-white cursor-pointer"/> */}
                    
                    <Messages 
                        myId={myId}
                        partnerName={partnerName}
                        msglist={roomMsg}
                    />
                    <SendMessage 
                        myId={myId}
                        to={partnerName}
                        onHandleSend={handleSendMsg}
                    />
                </div>
            </div>
        </div>
    )
}
