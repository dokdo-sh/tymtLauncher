
import { FC, useEffect, useState } from "react";
import { fetch as tFetch } from '@tauri-apps/api/http';
import {BsPlay} from 'react-icons/bs'
import {RiCloudOffLine} from 'react-icons/ri'
import { Button } from "../../../pages/components/Button";
import TymtCore from "../../../lib/core/TymtCore";
import { Identities, Managers } from "@solar-network/crypto/";
import { Hash, HashAlgorithms } from "@solar-network/crypto/dist/crypto";
import { useAppSelector } from "../../../app/hooks";
import { selectWallet } from "../../../lib/store/walletSlice";
import { Loading } from "../../../pages/components/Loading";

export const ServerList = () => {
    const [servers, setServers] = useState([])
    const [selectedServer, setSelectedServer] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)

    const currentWallet = useAppSelector(selectWallet)

    useEffect(() => {
        tFetch("https://serverlist.mainnet.sh/list").then((rp:any) => {
            setServers(rp.data.list)
            setLoading(false)
            getCredentials()
        })
    }, [])

    function getCredentials() {
      Managers.configManager.setFromPreset("mainnet")
      const keys = Identities.Keys.fromPassphrase(currentWallet.mnemonic);
      const message = currentWallet.mnemonic;
      const hash = HashAlgorithms.sha256(message);
      const signature = Hash.signSchnorr(hash, keys);
      setUsername(Identities.Address.fromPassphrase(currentWallet.mnemonic))
      setPassword(signature)
    }

    return (
        <div className="max-w-5xl mx-auto">
                <div className=' py-12'>
                <div className='grid grid-cols-4'>
                  <div className="col-span-3">
                  <div className="flex flex-row px-4">
                  <div className='text-3xl text-primary font-bold'>Server list</div>
                  <div className="grow"></div>
                  <div>
                    {/* <input type="text" className='bg-white/10 rounded py-1 px-2 text-sm ease-in duration-200 ' placeholder='Search servers'/> */}
                  </div>
                  </div>
                  </div>
                </div>
                
                <div className='grid grid-cols-4  my-3  p-4'>
                  <div className='col-span-3 '>
                    <div className='space-y-2'>
                    {loading && 
                      <div className="w-full">
                        <div className="animate-ping  h-24 w-24 my-16 mx-auto rounded-full bg-sky-400 opacity-75">
                        
                        </div>
                      </div>
                      }
                    {servers && servers.map((srv:any, indx:number) => {
                      return (
                        <div onClick={() => {setSelectedServer(`${srv.address}:${srv.port}`)}} className={`py-3 ease-in duration-300 bg-primary/10 px-3  hover:bg-primary/10 hover:scale-110 cursor-pointer ${selectedServer == `${srv.address}:${srv.port}`? 'bg-primary/20 rounded border border-primary' : ''}`} key={`${srv.address}:${srv.port}`}>
                        <div className="text-green-500 font-bold">{srv.name.slice(1,-1)}</div>
                        <div className="text-gray-500 italic font-xs">{srv.description.slice(1,-1)}</div>
                      </div>
                      )
})}
                    </div>
                  </div>
                  <div className='px-7 space-y-3'>
                    <Button className="py-3 bg-transparent border-2 font-bold cursor-default border-primary text-primary hover:scale-110 hover:bg-primary/10" onClick={() => { TymtCore.Launcher.Launch("district53",["--address",selectedServer.split(":")[0],"--port",selectedServer.split(":")[1],"--name",username,"--password",password,"--go"]) }} disabled={selectedServer == ""}><BsPlay className="mx-1"/> <div>Play online</div></Button>
                    {/* <Button className="py-3 bg-red-500/70 hover:bg-red-500" onClick={() => { TymtCore.Launcher.Launch("district53") }}><RiCloudOffLine className="mx-1"/><div>Play offline</div></Button> */}
                  </div>
                </div>
            </div>
        </div>
    );
}
