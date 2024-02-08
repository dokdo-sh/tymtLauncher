import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { UserList } from './chat/UserList'
import { Messages } from './chat/Messages'
import { SendMessage } from './chat/SendMessage'
import { chat_socket_addr } from '../configs'
import { listen } from '@tauri-apps/api/event'


export interface MSG {
    room: string,
    message: string,
    from: string,
    to:string,
    __createdtime__: number,
}

const socket_server_url = chat_socket_addr || undefined;
let socket: any = io(socket_server_url, { secure: false });

export const Chat = (props: any) => {
    const [partnerName, setPartnerName] = useState("")
    const [room, setRoom] = useState("")
    const [myId, setMyId] = useState("")
    const [msgReceived, setMsgReceived] = useState<MSG[]>([])
    const [roomMsg, setRoomMsg] = useState<MSG[]>([])

    const onSelectUser = (user : string) => {
        let room_name = user + '-' + myId
        if (user> myId) {
            room_name = myId + '-' + user
        }
        console.log("room:", room_name)
        setRoom(room_name)
        setPartnerName(user)
        socket.emit('join_room', {user, room_name})
    }

    const handleSendMsg = (text: string) => {
        if (text.length > 0 && myId.length > 0 && partnerName.length > 0) {
          const __createdtime__ = Date.now();
          
          socket.emit("send-message", {
            to: partnerName,
            from: myId,
            room,
            text,
            __createdtime__,
          });
        }
    }

    const handleReceive = (data:any) => {
        console.log("data", room)
        if(data.from && data.to) {
            let rv_room = data.from + '-' + data.to
            if (data.from > data.to) {
                rv_room = data.to + '-' + data.from
            }
            console.log("rv_room", rv_room)
            setMsgReceived((state) => [
                ...state,
                {
                    room: rv_room,
                    message: data.message,
                    from: data.from,
                    to: data.to,
                    __createdtime__: data.__createdtime__,
                },
            ])
        }
    }

    useEffect(()=>{
        let msglist = msgReceived.filter(item => item.room === room)
        setRoomMsg(msglist)
    }, [msgReceived, room])

    useEffect(() => {
        socket.on('receive_message', handleReceive)
        return ()=> { 
            socket.off('receive_message')
        }
    }, [socket])

    useEffect(() => {
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
