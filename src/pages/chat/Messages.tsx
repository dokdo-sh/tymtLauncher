import { MSG } from '../Chat'


export const Messages = (props:{myId: string, partnerName: string, msglist: MSG[]}) => {
    
    const formatDateFromTimestamp = (timestamp: number) => {
        const date = new Date(timestamp)
        return date.toLocaleString()
    }

    return (
        <div className="flex h-full overflow-y-auto flex-col-reverse">
            { props.msglist.map((msg, i) => (
                (props.myId === msg.from) ? 
                    <div className='flex flex-col items-end'>
                        <div className='bg-sky-800 rounded-md mb-2 p-3 max-w-md' key={`msg-${i}`}>
                            <div className='flex justify-between items-end'>
                                <span className='text-cyan-300 text-sm'>{msg.from.substring(0,4)}-{msg.from.substring(msg.from.length-4)}</span>
                                &nbsp;&nbsp;
                                <span className='text-cyan-600 text-xs'>{formatDateFromTimestamp(msg.createdAt)}</span>
                            </div>
                            <p className='text-white break-words'>{msg.content}</p>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col items-start'>
                        <div className='bg-gray-800 rounded-md mb-2 p-3 max-w-md' key={`msg-${i}`}>
                            <div className='flex justify-between items-end'>
                                <span className='text-cyan-300 text-sm'>{msg.from.substring(0,4)}-{msg.from.substring(msg.from.length-4)}</span>
                                &nbsp;&nbsp;
                                <span className='text-cyan-600 text-xs'>{formatDateFromTimestamp(msg.createdAt)}</span>
                            </div>
                            <p className='text-white break-words'>{msg.content}</p>
                        </div>
                    </div>
            ))}
        </div>
    );

}
