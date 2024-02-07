import { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import { UserList } from './chat/UserList'
import { Messages } from './chat/Messages'
import { SendMessage } from './chat/SendMessage'
import { chat_socket_addr } from '../configs'
import { emit, listen } from '@tauri-apps/api/event'

const socket_server_url = chat_socket_addr || undefined;
let socket: any = io(socket_server_url, { secure: false });

export const Chat = (props: any) => {
    const [partnerName, setPartnerName] = useState('')
    const [room, setRoom] = useState('')
    const [myId, setMyId] = useState<string>('')

    useEffect(() => {
        listen('chatWindow-loaded', ({ event, payload }: { event: string, payload: string }) => { 
            console.log("event: ", event)
            console.log("payload: ", payload)
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
                    setPartnerName={setPartnerName}
                    setRoom={setRoom}
                    socket={socket}
                    myId={myId}
                />
                <div className="grow flex flex-col">
                    <Messages 
                        myId={myId}
                        partnerName={partnerName}
                        room={room}
                        socket={socket}
                    />
                    <SendMessage 
                        myId={myId}
                        to={partnerName}
                        room={room}
                        socket={socket}
                    />
                </div>
            </div>
        </div>
    )
}
