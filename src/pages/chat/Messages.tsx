import { Socket } from 'socket.io-client'
import { useState, useEffect } from 'react';
// import { time } from 'console';
import { decrypt } from "../../lib/core/AES";

export const Messages = (props:{username: string, room: string, socket: Socket}) => {
    const [msgReceived, setMsgReceived] = useState([])

    useEffect(() => {
        props.socket.on('receive_message', (data) => {
            setMsgReceived((state) => [
                ...state,
                {
                    message: decrypt(data.message),
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                },
            ])
        })
        return ()=> { 
            props.socket.off('receive_message')
        }
    }, [props.socket])

    const formatDateFromTimestamp = (timestamp: number) => {
        const date = new Date(timestamp)
        return date.toLocaleString()
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="py-3 px-4 border-b border-gray-800 flex flex-row items-center">
                <div className="grow">
                    <div className="font-bold py-1">{props.username.length == 0 ? '[User]': props.username.substring(0,4) + '-' + props.username.substring(props.username.length-4)}</div>
                    <div className="italic text-gray-400 text-xs">last seen recently</div>
                </div>
                
                    {/* <div className="mx-2 rounded-full  hover:bg-greenish bg-[#f64a28] cursor-pointer py-1 px-4 text-sm font-bold"> 
                        <img src="/blockchains/solar.png" className="w-6 inline-block" alt="" /> Send SXP</div> */}
                    {/* <BsSearch className="mx-2 text-gray-300 hover:text-white cursor-pointer"/> */}
            </div>
            <div className="grow">
                { msgReceived.map((msg, i) => {
                    return(
                    <div className='bg-gray-800 rounded-md mb-2 max-w-lg p-3' key={i}>
                        <div className='flex justify-between'>
                            <span className='text-cyan-300 text-sm'>{msg.username}</span>
                            <span className='text-cyan-300 text-sm'>{formatDateFromTimestamp(msg.__createdtime__)}</span>
                        </div>
                        <p className='text-white'>{msg.message}</p>
                        <br />
                    </div>
                )})
                }
            </div>

        </div>
    );

}
