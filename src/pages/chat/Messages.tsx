import { Socket } from 'socket.io-client'
import { useState, useEffect } from 'react';
// import { time } from 'console';

export const Messages = (props:{myId: string, partnerName: string, room: string, socket: Socket}) => {
    const [msgReceived, setMsgReceived] = useState([])
    useEffect(() => {
        props.socket.on('receive_message', (data) => {
            if(data.from && data.to) {
                setMsgReceived((state) => [
                    ...state,
                    {
                        message: data.message,
                        from: data.from,
                        __createdtime__: data.__createdtime__,
                    },
                ])
            }
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
                    <div className="font-bold py-1">{props.partnerName.length == 0 ? '[User]': props.partnerName.substring(0,4) + '-' + props.partnerName.substring(props.partnerName.length-4)}</div>
                    <div className="italic text-gray-400 text-xs">last seen recently</div>
                </div>
                
                    {/* <div className="mx-2 rounded-full  hover:bg-greenish bg-[#f64a28] cursor-pointer py-1 px-4 text-sm font-bold"> 
                        <img src="/blockchains/solar.png" className="w-6 inline-block" alt="" /> Send SXP</div> */}
                    {/* <BsSearch className="mx-2 text-gray-300 hover:text-white cursor-pointer"/> */}
            </div>
            <div className="grow">
                { msgReceived.map((msg, i) => (
                    (props.myId === msg.from) ? 
                        <div className='flex flex-col items-end'>
                            <div className='bg-gray-800 rounded-md mb-2 p-3 max-w-lg' key={`msg-${i}`}>
                                <div className='flex justify-between items-end'>
                                    <span className='text-cyan-300 text-sm'>{msg.from.substring(0,4)}-{msg.from.substring(msg.from.length-4)}</span>
                                    &nbsp;&nbsp;
                                    <span className='text-cyan-600 text-xs'>{formatDateFromTimestamp(msg.__createdtime__)}</span>
                                </div>
                                <p className='text-white break-words'>{msg.message}</p>
                                <br />
                            </div>
                        </div>
                        :
                        <div className='flex flex-col items-start'>
                            <div className='bg-gray-800 rounded-md mb-2 p-3 max-w-lg' key={`msg-${i}`}>
                                <div className='flex justify-between items-end'>
                                    <span className='text-cyan-300 text-sm'>{msg.from.substring(0,4)}-{msg.from.substring(msg.from.length-4)}</span>
                                    &nbsp;&nbsp;
                                    <span className='text-cyan-600 text-xs'>{formatDateFromTimestamp(msg.__createdtime__)}</span>
                                </div>
                                <p className='text-white break-words'>{msg.message}</p>
                                <br />
                            </div>
                        </div>
                ))
                }
            </div>

        </div>
    );

}
