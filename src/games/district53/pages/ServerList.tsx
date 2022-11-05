
import { FC, useEffect, useState } from "react";
import { fetch as tFetch } from '@tauri-apps/api/http';
import {BsPlay} from 'react-icons/bs'
import {RiCloudOffLine} from 'react-icons/ri'
import { Button } from "../../../pages/components/Button";
import TymtCore from "../../../lib/core/TymtCore";
import { Identities, Managers, Solar } from "@solar-network/crypto/";
import { Hash, HashAlgorithms } from "@solar-network/crypto/dist/crypto";
import { useAppSelector } from "../../../app/hooks";
import { selectWallet } from "../../../lib/store/walletSlice";

export const ServerList = () => {
    const [servers, setServers] = useState([])
    const [selectedServer, setSelectedServer] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const currentWallet = useAppSelector(selectWallet)

    useEffect(() => {
        tFetch("https://serverlist.mainnet.sh/list").then((rp:any) => {
            setServers(rp.data.list)
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
                  <div className='text-xl font-Orbitron'>Server list</div>
                  <div className="grow"></div>
                  <div>
                    {/* <input type="text" className='bg-white/10 rounded py-1 px-2 text-sm ease-in duration-200 ' placeholder='Search servers'/> */}
                  </div>
                  </div>
                  </div>
                </div>

                <div className='grid grid-cols-4  my-3  p-4'>
                  <div className='col-span-3 border border-gray-800 rounded'>
                    <div className='divide-y divide-gray-900'>
                    {servers && servers.map((srv:any, indx:number) => {
                      return (
                        <div onClick={() => {setSelectedServer(`${srv.address}:${srv.port}`)}} className={`py-3 px-3  hover:bg-gray-800 cursor-pointer ${selectedServer == `${srv.address}:${srv.port}`? 'bg-gray-800' : ''}`} key={`${srv.address}:${srv.port}`}>
                        <div className="text-green-500 font-bold">{srv.name.slice(1,-1)}</div>
                        <div className="text-gray-500 italic font-xs">{srv.description.slice(1,-1)}</div>
                      </div>
                      )
})}
                    </div>
                  </div>
                  <div className='px-7 space-y-3'>
                    <Button className="py-6" onClick={() => { TymtCore.Launcher.Launch("district53",["--address",selectedServer.split(":")[0],"--port",selectedServer.split(":")[1],"--name",username,"--password",password,"--go"]) }} disabled={selectedServer == ""}><BsPlay className="mx-1"/> <div>Play online</div></Button>
                    {/* <Button className="py-3 bg-red-500/70 hover:bg-red-500" onClick={() => { TymtCore.Launcher.Launch("district53") }}><RiCloudOffLine className="mx-1"/><div>Play offline</div></Button> */}
                  </div>
                </div>
            </div>
        </div>
    );
}
