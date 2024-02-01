import { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import { UserList } from './chat/UserList'
import { Messages } from './chat/Messages'
import { SendMessage } from './chat/SendMessage'
import { chat_socket_addr } from '../configs'
import { emit, listen } from '@tauri-apps/api/event'

const socket_server_url = chat_socket_addr || "http://127.0.0.1:5000";
const socket = io(socket_server_url);

export const Chat = (props: any) => {
    const [username, setUsername] = useState('')
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
    }, [socket, listen])

    return (
        <div>
            <div className="flex flex-row h-screen">
                <UserList 
                    username={username}
                    setUsername={setUsername}
                    setRoom={setRoom}
                    socket={socket}
                    myId={myId}
                />
                <div className="grow flex flex-col">
                    <Messages 
                        username={username}
                        room={room}
                        socket={socket}
                    />
                    <SendMessage 
                        username={username}
                        room={room}
                        socket={socket}
                    />
                </div>
            </div>
        </div>
    )
}
