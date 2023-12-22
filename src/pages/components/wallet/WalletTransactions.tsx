import moment from "moment";
// import useSWR from "swr";
import { useEffect, useState } from "react";
import { BsArrowDownLeft, BsArrowRight, BsArrowUpRight, BsClock, BsReceipt, BsCheckCircle, BsArrowDownRight } from "react-icons/bs";
import "../../../lib/translations/i18n";
import { t } from "i18next";
import { MdHowToVote } from "react-icons/md";
import { CoreTransactionTypeKey, CoreTransactionTypes } from "./SolarTxType";
import TymtCore, { BlockchainKey } from "../../../lib/core/TymtCore";
import { selectWallet } from "../../../lib/store/walletSlice";
import { useAppSelector } from "../../../app/hooks";


export const WalletTransactions = (props:{selectedkey: string, setModalTx: (tx:string) => void, setShowTransaction: (b:boolean) => void}) => {
    const wallet = useAppSelector(selectWallet)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [currentAddr, setCurrentAddr] = useState('')
    const [ticker, setTicker] = useState("SXP")

    const MINUTE_MS = 20000;
    
    // const url = new URL(`${api_url}/wallets/${props.currentWallet.address}/transactions?limit=10`);
    
    // const { data, error, isLoading } = useSWR(url.toString(), {
    //   refreshInterval: 3000,
    //   dedupingInterval: 10000,
    //   fetcher: (...args) => fetch(...args).then(async (res) => await res.json()),
    // });

    const getTransactions = async () => {
        
        setIsLoading(true)
        try{
            const block = TymtCore.Blockchains[props.selectedkey as BlockchainKey]
            const addr = await block.wallet.getAddress(wallet.mnemonic)
            setCurrentAddr(addr)
            const trxs = await block.wallet.getTransactions(addr)
            setIsLoading(false)
            setTicker(TymtCore.Blockchains[props.selectedkey as BlockchainKey].ticker)
            setData(trxs)
        } catch(_) {
            setIsLoading(false)
            setError(true)
        }
    }

    useEffect(()=> {
        setData([])
        getTransactions()
        const interval = setInterval(() => {
            getTransactions()
          }, MINUTE_MS);
        
        return () => clearInterval(interval);
    }, [props.selectedkey])

    return (
        <div>
            { data && (props.selectedkey === "solar" ?
                <div className="flex flex-col text-white">
                    <div className="flex-1 grow">
                        <div className=" h-full divide-y divide-gray-800/30">
                        { data.length === 0 && <span>No transactions</span>}
                        { data.length !== 0 && data.map((transaction: any) => (
                            <a href={TymtCore.Blockchains[props.selectedkey as BlockchainKey].txexplorer + transaction.id} target="_blank">
                                <div className="py-4 items-center hover:bg-gray-800/30 cursor-pointer select-none px-6" 
                                    onClick={
                                        () => {
                                            props.setModalTx(transaction.id);
                                            props.setShowTransaction(true)
                                        }
                                    }
                                >
                                    <img src="/blockchains/solar.png" className="w-5 absolute translate-x-8 translate-y-6 border-2 border-gray-800 rounded-full" alt="" />
                                    { transaction.type === 2 && transaction.typeGroup === 2 &&
                                        <div className="flex align-middle items-center">
                                            <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2">
                                                <MdHowToVote className="inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3 " />
                                            </div>
                                            <div className="text-primary italic">{t("switched_vote")}</div>
                                            <div className="text-gray-400 text-xs">
                                                <BsClock className="inline-block mr-1"/> {moment(transaction.timestamp.human).fromNow()}
                                            </div>
                                        </div>
                                    }
                                    { transaction.type === 6 && transaction.typeGroup === 1 &&
                                        <div className="flex align-middle items-center">
                                            { transaction.sender !== currentAddr && 
                                                <div className="bg-red-500 rounded-full items-center justify-center py-2 mx-2">
                                                    <BsArrowDownLeft className="inline-flex text-white hover:text-dark-primary cursor-pointer mx-3" />
                                                </div>
                                            }
                                            { transaction.sender === currentAddr && 
                                                <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2">
                                                    <BsArrowUpRight className="inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3" />
                                                </div>
                                            }
                                            <div>
                                                { transaction.sender === currentAddr && 
                                                    <div>
                                                        <div className="text-primary">
                                                            { transaction.asset.transfers.map((payment:any) => {
                                                                return payment.amount as number
                                                            }).reduce((a:number,b:number)=>{
                                                                return (+a)+(+b)})/100000000
                                                            } 
                                                            { " " + ticker } 
                                                        </div>
                                                        <div className="text-sm text-gray-200 mb-1"> <BsArrowRight className="inline-block"/> {transaction.asset.transfers.length} {t("recipient-s").toLowerCase()}</div>
                                                    </div>
                                                }
                                                { transaction.sender !== currentAddr && 
                                                    <div className="">
                                                        <span className="font-bold">Received</span> 
                                                        <span className="text-primary">
                                                            { transaction.asset.transfers.map((payment:any) => {
                                                                    if (payment.recipientId === currentAddr) {
                                                                        return payment.amount as number
                                                                    } else {
                                                                        return 0
                                                                    }
                                                                }).reduce((a:number,b:number)=>{return (+a)+(+b)})/100000000
                                                            }  {" " + ticker}
                                                        </span>
                                                    </div>
                                                }
                                                <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment(transaction.timestamp.human).fromNow()}</div>                      
                                            </div>
                                        </div>
                                    }
                                    {transaction.type === 0 && transaction.typeGroup === 1 &&
                                        <div className="flex align-middle items-center">
                                            <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2"> 
                                                <BsReceipt className="inline-flex text-primary hover:text-dark-primary cursor-pointer mr-3" />
                                            </div>
                                            <div>
                                                <div className="text-primary">Received {transaction.amount/100000000} {ticker}</div>
                                                <div className="text-gray-400 text-xs"><BsClock className="inline-block"/> {moment(transaction.timestamp.human).fromNow()}</div>
                                            </div>
                                        </div>
                                    }
                                    {!(transaction.type === 0 && transaction.typeGroup === 1) && !(transaction.type === 6 && transaction.typeGroup === 1) && !(transaction.type === 2 && transaction.typeGroup === 2) && transaction.typeGroup === 1 && <div className="flex align-middle items-center">
                                        <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2"> {CoreTransactionTypes[transaction.type as CoreTransactionTypeKey].icon("inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3")}</div>
                                            <div>
                                                <div className="text-primary italic">{CoreTransactionTypes[transaction.type as CoreTransactionTypeKey].text}</div>
                                                <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment(transaction.timestamp.human).fromNow()}</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </a>
                        ))}
                        </div>
                    </div>
                </div>:
                props.selectedkey === "solana" ? 
                <div className="flex flex-col text-white"> 
                    <div className="flex-1 grow">
                        <div className=" h-full divide-y divide-gray-800/30">
                            { data.length === 0 && <span>No transactions</span>}
                            { data.length !== 0 && data.map((transaction: any) => (
                            <a href={TymtCore.Blockchains[props.selectedkey as BlockchainKey].txexplorer + transaction.signature} target="_blank">
                                <div className="py-4 items-center hover:bg-gray-800/30 cursor-pointer select-none px-6" 
                                    onClick={
                                        () => {
                                            props.setModalTx(transaction.signature);    //https://explorer.solana.com/address/${signature}?cluster=devnet
                                            props.setShowTransaction(true)
                                        }
                                    }
                                >
                                    <img src={`/blockchains/${props.selectedkey}.png`} className="w-5 absolute translate-x-8 translate-y-6 border-2 border-gray-800 rounded-full" alt="" />
                                    <div className="flex align-middle items-center">
                                        <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2">
                                            <BsCheckCircle className="inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3" />
                                        </div>
                                        <div>                                            
                                            <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment((transaction.blockTime as number) * 1000).fromNow()}</div>                      
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        </div>
                    </div>
                </div> :
                props.selectedkey === "btc" ? 
                <div className="flex flex-col text-white">
                    <div className="flex-1 grow">
                        <div className=" h-full divide-y divide-gray-800/30">
                        { data.length === 0 && <span>No transactions</span>}
                        { data.length !== 0 && data.map((transaction: any) => (
                            <a href={TymtCore.Blockchains[props.selectedkey as BlockchainKey].txexplorer + transaction.hash} target="_blank">
                                <div className="py-4 items-center hover:bg-gray-800/30 cursor-pointer select-none px-6" 
                                    onClick={
                                        () => {
                                            props.setModalTx(transaction.hash); 
                                            props.setShowTransaction(true)
                                        }
                                    }
                                >
                                    <img src={`/blockchains/${props.selectedkey}.png`} className="w-5 absolute translate-x-8 translate-y-6 border-2 border-gray-800 rounded-full" alt="" />
                                    <div className="flex align-middle items-center">
                                        { (transaction.result as number) > 0 ?
                                            <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2">
                                                <BsArrowDownRight className="inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3" />
                                            </div> : 
                                            <div className="bg-red-500 rounded-full items-center justify-center py-2 mx-2">
                                                <BsArrowUpRight className="inline-flex text-white hover:text-dark-primary cursor-pointer mx-3" />
                                            </div>
                                        }                                        
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row">
                                                    <div className="text-gray-400 text-xs mr-1">ID:</div>
                                                    <div className="text-red-300 text-xs">{transaction.hash.substring(0,4)}-{transaction.hash.substring(transaction.hash.length-4)}</div>
                                                </div>                                            
                                                <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment((transaction.time as number) * 1000).fromNow()}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex flex-row">
                                                    <div className="text-primary text-xs mr-1">From </div>
                                                    <div className="text-gray-400 text-xs"> {transaction.vin_sz} Inputs</div>
                                                </div>
                                                <div className="flex flex-row">
                                                    <div className="text-primary text-xs mr-1">To </div>
                                                    <div className="text-gray-400 text-xs"> {transaction.vout_sz} Outputs</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="text-primary text-xs">
                                                    { (transaction.result  as number )/100000000 } 
                                                    { " " + ticker } 
                                                </div>
                                                <div className="flex flex-row">
                                                    <div className="text-red-300 text-xs mr-1">Fee </div>
                                                    <div className="text-primary text-xs"> {((transaction.fee as number) / 1000).toFixed(1)}K Sats</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        </div>
                    </div>
                </div> :
                props.selectedkey === "avalanche" ? 
                <div className="flex flex-col text-white">
                    <div className="flex-1 grow">
                        <div className=" h-full divide-y divide-gray-800/30">
                        { data.length === 0 && <span>No transactions</span>}
                        { data.length !== 0 && data.map((transaction: any) => (
                            <a href={TymtCore.Blockchains[props.selectedkey as BlockchainKey].txexplorer + transaction.blockHash} target="_blank">
                                <div className="py-4 items-center hover:bg-gray-800/30 cursor-pointer select-none px-6" 
                                onClick={
                                    () => {
                                        props.setModalTx(transaction.blockHash);
                                        props.setShowTransaction(true)
                                    }
                                }
                                >
                                <img src={`/blockchains/${props.selectedkey}.png`} className="w-5 absolute translate-x-8 translate-y-6 border-2 border-gray-800 rounded-full" alt="" />
                                    <div className="flex align-middle items-center">
                                        { (transaction.from && transaction.from.toLowerCase() === currentAddr.toLowerCase()) ?
                                            <div className="bg-red-500 rounded-full items-center justify-center py-2 mx-2">
                                                <BsArrowUpRight className="inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3" />
                                            </div> : 
                                            <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2">
                                                <BsArrowDownLeft className="inline-flex text-white hover:text-dark-primary cursor-pointer mx-3" />
                                            </div>
                                        }                                        
                                        <div>
                                            <div className="text-primary">
                                                { ((transaction.value  as number )/1000000000/1000000000) } 
                                                { " " + ticker } 
                                            </div>
                                            <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment(transaction.timestamp).fromNow()}</div>                      
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        </div>
                    </div>
                </div> :
                <div className="flex flex-col text-white">
                    <div className="flex-1 grow">
                        <div className=" h-full divide-y divide-gray-800/30">
                        { data.length === 0 && <span>No transactions</span>}
                        { data.length !== 0 && data.map((transaction: any) => (
                            <a href={TymtCore.Blockchains[props.selectedkey as BlockchainKey].txexplorer + transaction.hash} target="_blank">
                                <div className="py-4 items-center hover:bg-gray-800/30 cursor-pointer select-none px-6" 
                                    onClick={
                                        () => {
                                            props.setModalTx(transaction.hash);
                                            props.setShowTransaction(true)
                                        }
                                    }
                                >
                                <img src={`/blockchains/${props.selectedkey}.png`} className="w-5 absolute translate-x-8 translate-y-6 border-2 border-gray-800 rounded-full" alt="" />
                                    <div className="flex align-middle items-center">
                                        { (transaction.from && transaction.from.toLowerCase() === currentAddr.toLowerCase()) ?
                                            <div className="bg-red-500 rounded-full items-center justify-center py-2 mx-2">
                                                <BsArrowUpRight className="inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3" />
                                            </div> : 
                                            <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2">
                                                <BsArrowDownLeft className="inline-flex text-white hover:text-dark-primary cursor-pointer mx-3" />
                                            </div>
                                        }                                        
                                        <div>
                                            <div className="text-primary">
                                                { (transaction.value  as number )/1000000000/1000000000 } 
                                                { " " + ticker } 
                                            </div>
                                            <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment((transaction.timeStamp as number) * 1000).fromNow()}</div>                      
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
