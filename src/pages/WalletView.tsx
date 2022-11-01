import Core, { BlockchainKey } from "../lib/core/Core";
import {ethers} from 'ethers'
import { selectWallet } from "../lib/store/walletSlice";
import { useAppSelector } from "../app/hooks";
import { Wallet } from "../lib/core/Wallet";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";

export const WalletView = () => {
  const wallet = useAppSelector(selectWallet)
  const [addresses, setAddresses] = useState({})

  async function getAddresses() {
    Object.keys(Core.Blockchains).map((key:string) => {
      return {key: key as BlockchainKey, data: Core.Blockchains[key as BlockchainKey]}
    }).map(async (blockchain)=> {
      let addr = await blockchain.data.wallet.getAddress("indoor dish desk flag debris potato excuse depart ticket judge file exit")
      setAddresses(addresses => ({
        ...addresses,
        ...{[blockchain.key]: addr}
      }))
    })
  }

  useEffect(() => {
    getAddresses()
  }, [])

  if (Object.keys(addresses).length > -1) {
    return (
      <div className="max-w-6xl mx-auto pb-16 px-8">
        <div className="py-16">
          <div className="flex flex-row max-w-2xl space-x-3">
            <div className="text-3xl font-Orbitron">Your wallet</div>
            <div className="grow"></div>
            <div className='bg-primary/70 py-2 mx-auto px-6 text-base w-fit font-Orbitron hover:bg-primary cursor-pointer hover:ease-in duration-200 flex flex-row items-center h-fit'> <div>Receive</div></div>
                  <div className='bg-red-500/70 py-2 mx-auto px-6 text-base w-fit font-Orbitron hover:bg-red-500 cursor-pointer hover:ease-in duration-200 flex flex-row items-center h-fit'> <div>Send</div></div>
          </div>
        </div>
        <div className="border border-gray-800 max-w-2xl rounded divide-y divide-gray-800 cursor-pointer">
          {Object.keys(Core.Blockchains).map((key:string) => {return {key: key as BlockchainKey, data: Core.Blockchains[key as BlockchainKey]}}).map((blockchain) => (
              <div className="py-4 px-4 hover:bg-gray-800">
              <div className="flex flex-row items-center space-x-4">
                <img src={`/blockchains/${blockchain.key}.png`} className="w-12" alt="" />
                <div className="grow">
                  <div className="font-bold text-xl">{blockchain.data.name}</div>
                  <div className="font-mono flex flex-row items-center text-center text-primary/70 font-bold  cursor-pointer">
                    {addresses[blockchain.key]}
                  </div>
                </div>
                <div className="font-2xl text-primary">
                  0 {blockchain.data.ticker}
                </div>
              </div>
            </div>))
  }
        </div>
      </div>
    );
  } else {
    return <Loading/> 
  }
};
