import { useEffect, useState } from "react";
import { useWizard, Wizard } from "react-use-wizard";
import { MdArrowBack } from "react-icons/md";

import "../../lib/translations/i18n";
import { t } from "i18next";
import { Loading } from "../components/Loading";
import TymtCore, { BlockchainKey } from "../../lib/core/TymtCore";
import { Button } from "../components/Button";
import { redirect, useNavigate } from "react-router-dom";

export const Import = (props: {password:string}) => {
  const [network, setNetwork] = useState(undefined)
  const [passphrase, setPassphrase] = useState("")
  const [secondPassphrase, setSecondPassphrase] = useState("")
  const [performAction, setPerformAction] = useState(undefined)
  const navigate = useNavigate()


  return (
    <div className="max-w-5xl mx-auto py-safe">
      
      <Wizard>
        <Passphrase setPassphrase={setPassphrase}/>
        <WalletSetup passphrase={passphrase}  password={props.password}/>
      </Wizard>
      
    </div>
  );
};

const Passphrase = (props: {setPassphrase: (passphrase:string) => void}) => {
  const [passphrase, setPassphrase] = useState("");
  const [isMnemonic, setIsMnemonic] = useState(true)
  const { nextStep } = useWizard();
  const navigate = useNavigate()

  useEffect(() => {
    setIsMnemonic(TymtCore.Crypto.validateMnemonic(passphrase))
    props.setPassphrase(passphrase)
  }, [passphrase])

  return (
    <div>
        <div className="py-4"> <a href="#" className="px-4  hover:underline flex" onClick={() => navigate('/session')}> <MdArrowBack className="text-2xl"/> Go back to login</a></div>
        <div className="px-4 py-16">
        <img src="/full_logo.png" className="h-12 mx-auto" />
        <div className=" text-2xl font-black mt-6 text-center">
        {t("import_existing")}
      </div>
      <div className="py-1"></div>
      <div className="py-6 text-xl text-center">
        {t("paste_passphrase")}
      </div>
      <textarea
        name=""
        className="w-full p-3 h-48 text-xl font-mono bg-dark-secondary rounded-lg outline-greenish"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setPassphrase(e.currentTarget.value);
        }}
      ></textarea>
      {!isMnemonic && <div className="text-red-400">This is not a bip39 mnemonic!</div> }
        </div>
      <div className="flex py-2 flex-row-reverse">
        <Button disabled={passphrase.length==0 || !isMnemonic} onClick={nextStep}>
          {t("next")}
        </Button>
        
      </div>
    </div>
  );
};

const WalletSetup = (props: { passphrase:string, password:string }) => {
  const { nextStep, previousStep } = useWizard();
  const [addresses, setAddresses] = useState({})
  const navigate = useNavigate()

  async function getAddresses() {
    Object.keys(TymtCore.Blockchains).map((key:string) => {
      return {key: key as BlockchainKey, data: TymtCore.Blockchains[key as BlockchainKey]}
    }).map(async (blockchain)=> {
      let addr = await blockchain.data.wallet.getAddress(props.passphrase)
      setAddresses(addresses => ({
        ...addresses,
        ...{[blockchain.key]: addr}
      }))
    })
  }

  useEffect(() => {
    getAddresses()
  }, [])
  return (
    <div className="px-4 py-8">
        <div className="pb-10">
        <div className=""> <a href="#" className="px-4  hover:underline flex" onClick={() => navigate('/session')}> <MdArrowBack className="text-2xl"/> Go back to login</a></div>
        <div className="px-4 py-4">
        <img src="/full_logo.png" className="h-12 mx-auto" />
        <div className=" text-2xl font-black mt-6 text-center">
        Confirm this information is correct.
      </div>
</div>
      <div className="py-1"></div>
        <div className="rounded-t bg-dark-tertiary mx-auto  py-4 text-sm text-center select-none hover:bg-dark-hoverish font-mono  font-bold text-base  ">
            <div className="flex flex-wrap flex-row w-fit mx-auto gap-3 px-3"> 
        {props.passphrase.split(" ").map((word) => ( <div className="border border-gray-800 text-gray-400 px-1 py-1 rounded">{word}</div> ) )}
            </div>
      </div>
      <div className="border-b border-l border-r border-gray-800 rounded-b divide-y divide-gray-800 cursor-pointer">
          {Object.keys(TymtCore.Blockchains).map((key:string) => {return {key: key as BlockchainKey, data: TymtCore.Blockchains[key as BlockchainKey]}}).map((blockchain) => (
              <div className="py-4 px-4 hover:bg-gray-800">
              <div className="flex flex-row items-center space-x-4">
                <img src={`/blockchains/${blockchain.key}.png`} className="w-12" alt="" />
                <div className="grow">
                  <div className="font-bold text-xl">{blockchain.data.name}</div>
                  <div className="font-mono flex flex-row items-center text-center text-primary/70 font-bold  cursor-pointer">
                  {addresses[blockchain.key]}
                  </div>
                </div>
              </div>
            </div>))
  }
        </div>
        </div>

      <div className="flex py-2 flex-row-reverse items-center justify-items-center">
        <Button onClick={()=> {
          TymtCore.Launcher.Settings.save({mnemonic: props.passphrase},props.password).then(() => window.location.href = "/session")
        }}>
          {t("Confirm")}
        </Button>
        <a href="#" className="hover:underline mx-3 pb-4" onClick={() => {previousStep()}}>{t("No, go back")}</a>
      </div>
    </div>
  );
};