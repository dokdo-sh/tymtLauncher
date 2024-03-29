import moment from "moment";
import { useEffect, useState } from "react";
import { BsArrowDownLeft, BsArrowRight, BsArrowUpRight, BsClock, BsClockFill, BsReceipt } from "react-icons/bs";
import "../../../lib/translations/i18n";
import { t } from "i18next";
import { MdHowToVote } from "react-icons/md";
import { CoreTransactionTypeKey, CoreTransactionTypes } from "./SolarTxType";
import Solar from "../../../lib/wallets/Solar";

export const WalletTransactions = (props:{currentWallet: Solar, setModalTx: (tx:string) => void, setShowTransaction: (b:boolean) => void}) => {
  const [currentWallet, setCurrentWallet] = useState(undefined)
  const [intervalTxs, setIntervalTxs] = useState(undefined)

  const network = {ticker: "SXP"}

  useEffect(() => {
    setCurrentWallet(props.currentWallet)
    function getTransactions() {
      props.currentWallet.getLatestTransactions()
      .then((transactions: any) => {
        setTransactions(transactions);
      }).catch(() => {});
    }
    setIntervalTxs(setInterval(getTransactions, 5000));
    getTransactions()
    return () => {
      clearInterval(intervalTxs)
    }
  }, [])

  const [transactions, setTransactions] = useState(undefined);


  if (transactions == undefined) {
    return <div className="min-h-full">e</div>;
  } else {
    return (
      <div className="flex flex-col text-white">
      <div className="flex-1 grow">
        <div className="overflow-y-scroll h-full divide-y divide-gray-800/30">
        {transactions.map((transaction: any) => (
          <div className="py-4 items-center hover:bg-gray-800/30 cursor-pointer select-none px-6" onClick={() => {props.setModalTx(transaction.id);props.setShowTransaction(true)}}>
            <img src="/blockchains/solar.png" className="w-5 absolute translate-x-8 translate-y-6 border-2 border-gray-800 rounded-full" alt="" />
                  {transaction.type == 2 && transaction.typeGroup == 2 &&
                              <div className="flex align-middle items-center">
                              <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2"><MdHowToVote className="inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3 " /></div>
                              <div>
                    <div>
                      <div className="text-primary italic">{t("switched_vote")}</div>
                      <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment(transaction.timestamp.human).fromNow()}</div>
                    </div>
                    </div></div>
                  }
                  {transaction.type == 6 && transaction.typeGroup == 1 &&
                                <div className="flex align-middle items-center">
                                {transaction.sender != currentWallet.address && 
                                <div className="bg-red-500 rounded-full items-center justify-center py-2 mx-2"><BsArrowDownLeft className="inline-flex text-white hover:text-dark-primary cursor-pointer mx-3" /></div>
                                }
                                {transaction.sender == currentWallet.address && 
                                <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2"><BsArrowUpRight className="inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3" /></div>
                                }
                                <div>
                      {transaction.sender == currentWallet.address && 
                        <div>
                          <div className="text-primary">{transaction.asset.transfers.map((payment:any) => {return payment.amount as number}).reduce((a:number,b:number)=>{return (+a)+(+b)})/100000000} {network.ticker}</div>
                        <div className="text-sm text-gray-200 mb-1"> <BsArrowRight className="inline-block"/> {transaction.asset.transfers.length} {t("recipient-s").toLowerCase()}</div>
                        </div>
                      }
                      {transaction.sender != currentWallet.address && 
                        <div className=""><span className="font-bold">Received</span> <span className="text-primary">{transaction.asset.transfers.map((payment:any) => {if (payment.recipientId == currentWallet.address) {return payment.amount as number} else {return 0}}).reduce((a:number,b:number)=>{return (+a)+(+b)})/100000000}  {network.ticker}</span></div>
                      }
                      <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment(transaction.timestamp.human).fromNow()}</div>                      
                    </div></div>
                  }
                  {transaction.type == 0 && transaction.typeGroup == 1 &&
                              <div className="flex align-middle items-center">
                             <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2"> <BsReceipt className="inline-flex text-primary hover:text-dark-primary cursor-pointer mr-3" /></div>
                              <div>
                    <div>
                      <div className="text-primary">Received {transaction.amount/100000000} {network.ticker}</div>
                    <div className="text-gray-400 text-xs"><BsClock className="inline-block"/> {moment(transaction.timestamp.human).fromNow()}</div>
                    </div></div></div>
                  }
                  {!(transaction.type == 0 && transaction.typeGroup == 1) && !(transaction.type == 6 && transaction.typeGroup == 1) && !(transaction.type == 2 && transaction.typeGroup == 2) && transaction.typeGroup == 1 && <div className="flex align-middle items-center">
                             <div className="bg-dark-secondary rounded-full items-center justify-center py-2 mx-2"> {CoreTransactionTypes[transaction.type as CoreTransactionTypeKey].icon("inline-flex text-primary hover:text-dark-primary cursor-pointer mx-3")}</div>
                              <div>
                    <div>
                      <div className="text-primary italic">{CoreTransactionTypes[transaction.type as CoreTransactionTypeKey].text}</div>
                    <div className="text-gray-400 text-xs"><BsClock className="inline-block mr-1"/> {moment(transaction.timestamp.human).fromNow()}</div>
                    </div></div></div>}
              </div>
        ))}

      </div>
      
      </div>
      </div>
    );
  }
};
