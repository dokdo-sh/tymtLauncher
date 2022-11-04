import TymtCore, { BlockchainKey } from "../lib/core/TymtCore";
import {ethers} from 'ethers'
import { selectWallet } from "../lib/store/walletSlice";
import { useAppSelector } from "../app/hooks";
import { Wallet } from "../lib/core/Wallet";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import QRCode from "react-qr-code";
import { writeText } from "@tauri-apps/api/clipboard";
import { BiCopy } from "react-icons/bi";


export const WalletView = () => {
  const wallet = useAppSelector(selectWallet)
  const [addresses, setAddresses] = useState({})
  const [selectedBlockchain, setSelectedBlockchain] = useState("solar")
  async function getAddresses() {
    Object.keys(TymtCore.Blockchains).map((key:string) => {
      return {key: key as BlockchainKey, data: TymtCore.Blockchains[key as BlockchainKey]}
    }).map(async (blockchain)=> {
      let addr = await blockchain.data.wallet.getAddress(wallet? wallet.mnemonic : "")
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
          </div>
        </div>
<div className="grid grid-cols-6">
<div className="col-span-4 border border-gray-800 max-w-2xl rounded divide-y divide-gray-800 cursor-pointer">
          {Object.keys(TymtCore.Blockchains).map((key:string) => {return {key: key as BlockchainKey, data: TymtCore.Blockchains[key as BlockchainKey]}}).map((blockchain) => (
              <div className={`py-4 px-4 hover:bg-gray-800 ${selectedBlockchain == blockchain.key? 'bg-gray-800' : ''}`} onClick={() => {setSelectedBlockchain(blockchain.key)}}>
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
        <div className="col-span-2">
        <div className="bg-gray-800 py-8 rounded">
          <div className="pb-6 text-center text-2xl font-Orbitron">Deposit</div>
        <QRCode value={addresses[selectedBlockchain]? addresses[selectedBlockchain] : ""} size={150} className="mx-auto"/>
        <div className="py-4">
        <div className="grow w-fit rounded-lg   text-center select-none   cursor-pointer text-sm rounded-full hover:bg-primary hover:text-white px-2 py-1 mx-auto">
        <div className="font-mono text-primary hover:text-white" onClick={() => writeText(addresses[selectedBlockchain])}>
            <BiCopy className="text-white inline-block"/>  <span className="text-xs">{addresses[selectedBlockchain]}</span>
            </div>
            </div>
        </div>
        </div>
        </div>
</div>
      </div>
    );
  } else {
    return <Loading/> 
  }
};
