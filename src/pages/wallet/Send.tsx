import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useWizard, Wizard } from "react-use-wizard";
import "../../lib/translations/i18n";
import { t } from "i18next";
import { FeeInput } from "../components/wallet/FeeInput";
import { Button } from "../components/Button";
import { Recipients } from "../components/wallet/Recipients";
import Solar from "../../lib/wallets/Solar";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectWallet } from "../../lib/store/walletSlice";

export const Send = (props:{}) => {
  const [performAction, setPerformAction] = useState(undefined)
  const [txData, setTxData] = useState(undefined)
  const navigate = useNavigate()
  const wallet = useAppSelector(selectWallet)

  return (
    <div className="py-16 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto py-2">
        <div className="text-xs font-bold p-1  rounded hover:bg-primary w-fit cursor-pointer" onClick={() => navigate("/wallet")}>{"<"} BACK</div>
        </div>
        <div className="max-w-3xl mx-auto bg-[#000000] border border-gray-800 rounded-t px-6 py-2">

            <div className="flex flex-row items-center space-x-4">
            <div> 
                <img src="/blockchains/solar.png" className="w-16" alt="" />
            </div>
        <div className="py-8 text-5xl font-bold">Send SXP</div>
            </div>
      <Wizard>
        <FirstStep  currentWallet={new Solar(wallet.mnemonic)}   setTxData={setTxData}/>
        <SecondStep txData={txData} currentWallet={new Solar(wallet.mnemonic)} setPerformAction={setPerformAction}/>
      </Wizard>
        </div>
    </div>
  )
}

const FirstStep = (props:{currentWallet: Solar, setTxData: (txData:any) => void}) => {
  const [currentWallet, setCurrentWallet] = useState(undefined)

  useEffect(() => {
  
    setCurrentWallet(props.currentWallet);
     
  },[props.currentWallet]);

  const [vendorfield, setVendorfield] = useState("");
  const [fee, setFee] = useState("0.05")
  const [recipients, setRecipients] = useState([])
  const [sendEnabled, setSendEnabled] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(true);
  const [password, setPassword] = useState("");

  const {nextStep} = useWizard();

  useEffect(() => {
    validateSend(fee,recipients)
  }, [wrongPassword])

  function getData() {
    // (currentWallet as Solar).sendTransaction({recipients:recipients,fee:fee,vendorField:vendorfield},password)
  }

  function onRecipientsChange(recipients:any[]) {
    setRecipients(recipients);
    validateSend(fee, recipients);
  }

  function validateSend(fees:string, recipients: any[]) {
    if (Number(fees) > 0 && recipients.length > 0) {setSendEnabled(true)} else {setSendEnabled(false)}
  }

  if (currentWallet) { return (
    <div>
      <div>
      <div className="py-1">
        <div className="text-gray-300 text-sm">{t("sender")}</div>
        <div className="font-mono text-greenish py-2">
          {currentWallet.address}
        </div>
      </div>

    <Recipients onChange={onRecipientsChange}/>

      <div className="py-3">
        <div className="text-gray-300 text-sm">{t("memo_field")}</div>
        <textarea className="w-full p-3 mt-2 h-24 bg-gray-800 bg-opacity-70 rounded-lg outline-primary" value={vendorfield} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setVendorfield(e.currentTarget.value)}} maxLength={255} />
        <div className="text-gray-400 text-xs text-right">
          {vendorfield.length}/{t("255_characters")}
        </div>
      </div>
      <div className="py-3">
        <FeeInput wallet={new Solar("ee")} onValidFee={(bfee:number) => {setFee(bfee.toString());validateSend(bfee.toString(), recipients)}}/>
      </div>

      <div className="py-3 ">
        <Button className="bg-primary" onClick={() => {props.setTxData({recipients:recipients, fee: fee, vendorfield:vendorfield, });nextStep();}} disabled={!sendEnabled} > <div className="flex items-center space-x-3 mx-auto w-fit"><span>{t("continue")}</span></div> </Button>
      </div>
      </div>
    </div>
  );} else {
    return <div></div>
  }
}

const SecondStep = (props: {setPerformAction: (action:any) => void, txData: any, currentWallet: Solar,}) => {

  const {nextStep, goToStep} = useWizard();

  return (
    <div>
      <div className="font-bold text-center text-xl py-3">{t("transaction_details")}</div>
            <div className="font-bold">{t("recipients")}</div>
      <div className="bg-dark-secondary  rounded p-2 my-2 divide-y divide-dark-secondary">
      {props.txData.recipients.map((r:any) => (
        <div className="py-1">
          <div className="w-28 text-sm text-greenish font-mono">{r.address}</div>
          <div className=" text-xs">{r.amount} {props.currentWallet.ticker}</div>
        </div>
      ))}
      </div>
      {props.txData.vendorfield.length>0 && <div className="py-2">
        <div className="font-bold">{t("memo")}</div>
      <div className="my-2 bg-dark-tertiary rounded p-2 italic">{props.txData.vendorfield}</div>
      </div> }

<div className="py-2">
<div className="">{t("fee")}</div>
      <div className="text-sm text-greenish">{props.txData.fee} SXP</div>
</div>

      <Button className="flex items-center space-x-3 mx-auto py-3 w-fit" onClick={() => {
              let performAction = (password:string) => {
                // (props.currentWallet as Solar).sendTransaction({recipients:props.txData.recipients,fee:props.txData.fee,vendorField:props.txData.vendorfield},password)
                goToStep(0)
              }
              props.setPerformAction(() => performAction);
              nextStep();
      }} ><FiSend/> <span>{t("send")}</span></Button>
    </div>
  )
}