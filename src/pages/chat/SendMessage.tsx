import { Socket } from "socket.io-client";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import InputEmojiWithRef from "react-input-emoji";
import { use } from "i18next";

export const SendMessage = (props:{username: string, room: string, socket: Socket}) => {
    const [message, setMessage] = useState('')
    const [room] = useState(props.room)
    const [username] = useState(props.username)

    const handleOnEnter = (text: string) => {
        console.log('enter', text,  username)
        if (text.length > 0) {
            const __createdtime__ = Date.now()
            props.socket.emit('send-message', { username, room, text, __createdtime__})
            setMessage('')
        }
    }
    
    return (
        <div className="flex flex-row bg-gray-800/50 border-t border-gray-800">
            {/* <input type="text" className="bg-transparent w-full  outline-none py-2 px-4 text-sm" placeholder="Write a message..." onChange={(e)=> {
                setMessage(e.target.value)
            }}/> */}
            <InputEmojiWithRef 
                value={message}
                onChange={setMessage}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a message"
                disableRecent={true}
            />
            {/* <div className="px-3 py-2 hover:bg-gray-800">
                <BsSend className="mx-auto"/>
            </div> */}
        </div>
    );

}
