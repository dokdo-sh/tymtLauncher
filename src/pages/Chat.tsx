import { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import { UserList } from './chat/UserList'
import { Messages } from './chat/Messages'
import { SendMessage } from './chat/SendMessage'
import { chat_socket_addr } from '../configs'

const socket_server_url = chat_socket_addr || "http://127.0.0.1:5000";
const socket = io(socket_server_url);

export const Chat = (props: any) => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [myId, setMyId] = useState('')

    const generateRandomString = useCallback((length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(randomValues[i] % charactersLength);
        }
        return result;
      }, []) 
      

    useEffect(() => {
        let id = generateRandomString(16)
        setMyId(id)
        console.log("first:", id)
        socket.on('connect', () => {
            socket.emit('addressMapId', { chatId: id})
        });
        return ()=> { 
            socket.off('connect')
        }
    }, [])

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
