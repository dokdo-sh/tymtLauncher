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
import { Button } from "./components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Downloads } from "./Downloads";
import { WalletTransactions } from "./components/wallet/WalletTransactions";
import Solar from "../lib/wallets/Solar";


export const WalletView = () => {
  const wallet = useAppSelector(selectWallet)
  const [addresses, setAddresses] = useState({})
  const [selectedBlockchain, setSelectedBlockchain] = useState("solar")
  const navigate = useNavigate()
  const cW = new Solar(wallet.mnemonic)
  async function getAddresses() {
    Object.keys(TymtCore.Blockchains).map((key:string) => {
      return {key: key as BlockchainKey, data: TymtCore.Blockchains[key as BlockchainKey]}
    }).map(async (blockchain)=> {
      let addr = await blockchain.data.wallet.getAddress(wallet? wallet.mnemonic : "")
      let bal = (await blockchain.data.wallet.getBalance(addr)).toFixed(2)
      console.log(addr)
      setAddresses(addresses => ({
        ...addresses,
        ...{[blockchain.key]: {address: addr, balance: bal}}
      }))
    })
  }

  useEffect(() => {
    getAddresses()
  }, [])

  if (Object.keys(addresses).length > -1) {
    return (
      <div className="max-w-7xl mx-auto pb-16 px-8">
        <div className="py-16">
          <div className="flex flex-row max-w-3xl space-x-3 mt-8">
            <div className="text-4xl ">Your wallet</div>
            <div className="grow"></div>
            <Button className="bg-primary/80 hover:bg-primary" onClick={() => navigate("/wallet/send")}>  Send</Button>
            <Button className="bg-[#f64a28] hover:bg-greenish" onClick={() => navigate("/wallet/staking")}> <img src="/blockchains/solar.png" className="w-6 mr-2" alt="" /> Staking</Button>
          </div>
        </div>
<div className="grid grid-cols-6 space-x-2">
<div className="col-span-4 border border-gray-800 w-full rounded divide-y divide-gray-800 cursor-pointer">
          {Object.keys(TymtCore.Blockchains).map((key:string) => {return {key: key as BlockchainKey, data: TymtCore.Blockchains[key as BlockchainKey]}}).map((blockchain) => (
              <div className={`py-4 px-4 hover:bg-gray-800/50 ${selectedBlockchain == blockchain.key? 'bg-gray-800/50' : ''}`} onClick={() => {setSelectedBlockchain(blockchain.key)}} key={blockchain.key}>
              <div className="flex flex-row items-center space-x-4">
                <img src={`/blockchains/${blockchain.key}.png`} className="w-12" alt="" />
                <div className="grow">
                  <div className="font-bold text-xl">{blockchain.data.name}</div>
                  <div className="font-mono flex flex-row items-center text-center text-primary/70 font-bold  cursor-pointer">
                    {addresses[blockchain.key] && <div>{addresses[blockchain.key].address}</div> }
                  </div>
                </div>
                <div className="text-sm font-bold  text-primary w-[100px]">
                {addresses[blockchain.key] && <div>{addresses[blockchain.key].balance} {blockchain.data.ticker}</div> } 
                </div>
              </div>
            </div>))
  }
        </div>
        <div className="col-span-2">
        <div className="bg-gray-800/50 py-8 rounded border border-gray-800">
          <div className="pb-6 text-center text-2xl ">Deposit</div>
        <QRCode value={addresses[selectedBlockchain]? addresses[selectedBlockchain].address : ""} size={150} className="mx-auto"/>
        <div className="py-4">
        <div className="grow w-fit rounded-lg   text-center select-none   cursor-pointer text-sm rounded-full hover:bg-primary/10 hover:text-white px-2 py-1 mx-auto text-primary hover:text-white">
        <div className="font-mono " onClick={() => {writeText(addresses[selectedBlockchain]? addresses[selectedBlockchain].address : "").then(() => {toast.success("Copied!",{autoClose: 2000})})}}>
            <BiCopy className="text-white inline-block"/>  <span className="text-xs">{addresses[selectedBlockchain]? addresses[selectedBlockchain].address : ""}</span>
            </div>
            </div>
        </div>
        </div>
        </div>
</div>
<div>

<div className="text-2xl py-4">Latest transactions</div>
<div className="h-96 grid grid-cols-6">
  <div className="py-2 rounded bg-gray-800/30 border border-gray-800/30 col-span-4 h-fit text-gray-400">
  <WalletTransactions currentWallet={cW} setShowTransaction={(b) => {}} setModalTx={(a) => {}}/>
  </div>
</div>
<div className="h-96"></div>
</div>
      </div>
    );
  } else {
    return <Loading/> 
  }
};
