import { useState } from 'react'
import io from 'socket.io-client'
import { UserList } from './chat/UserList'
import { Messages } from './chat/Messages'
import { SendMessage } from './chat/SendMessage'
import { chat_socket_addr } from '../configs'

const socket = io(chat_socket_addr)

export const Chat = () => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div>
            <div className="flex flex-row h-screen">
                <UserList 
                    username={username}
                    setUsername={setUsername}
                    setRoom={setRoom}
                    socket={socket}
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
