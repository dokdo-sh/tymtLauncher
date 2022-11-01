
import { FC, useEffect, useState } from "react";
import { fetch as tFetch } from '@tauri-apps/api/http';
import {BsPlay} from 'react-icons/bs'
import {RiCloudOffLine} from 'react-icons/ri'


export const ServerList = () => {
    const [servers, setServers] = useState([])

    useEffect(() => {
        tFetch("https://serverlist.mainnet.sh/list").then((rp:any) => {
            setServers(rp.data.list)
        })
    }, [])

    return (
        <div className="max-w-5xl mx-auto">
                <div className=' py-12'>
                <div className='grid grid-cols-4'>
                  <div className="col-span-3">
                  <div className="flex flex-row px-4">
                  <div className='text-xl font-Orbitron'>Server list</div>
                  <div className="grow"></div>
                  <div>
                    <input type="text" className='bg-white/10 rounded py-1 px-2 text-sm ease-in duration-200 ' placeholder='Search servers'/>
                  </div>
                  </div>
                  </div>
                </div>

                <div className='grid grid-cols-4  my-3  p-4'>
                  <div className='col-span-3 border border-gray-800 rounded'>
                    <div className='divide-y divide-gray-900'>
                    {servers && servers.map((srv:any) => (
                      <div className='py-3 px-3 hover:bg-black  hover:bg-gray-800 cursor-pointer' key={srv.update_time}>
                        <div className="text-green-500 font-bold">{srv.address}</div>
                        <div className="text-gray-500 italic font-xs">{srv.description.slice(1,-1)}</div>
                      </div>
                    ))}
                    </div>
                  </div>
                  <div className='px-7 space-y-3'>
                      <div className='bg-primary/70 py-4 mx-auto px-6 text-base w-fit font-Orbitron hover:bg-primary cursor-pointer hover:ease-in duration-200 w-full flex flex-row items-center'> <BsPlay className="mx-1"/> <div>Play now</div></div>
                      <div className='bg-red-500/50 py-2 mx-auto px-6 text-sm w-fit font-Orbitron hover:bg-red-600 cursor-pointer hover:ease-in duration-200 w-full flex flex-row items-center'><RiCloudOffLine className="mx-1"/><div>Play offline</div></div>
                  </div>
                </div>
            </div>
        </div>
    );
}
