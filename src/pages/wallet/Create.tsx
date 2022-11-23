import { useEffect, useRef, useState } from "react";
import { BiCopy, BiRefresh } from "react-icons/bi";
import { useWizard, Wizard } from "react-use-wizard";
import { Button } from "../components/Button";
import "../../lib/translations/i18n";
import { t } from "i18next";
import { MdArrowBack } from "react-icons/md";
import TymtCore, { BlockchainKey } from "../../lib/core/TymtCore";
import { writeText } from '@tauri-apps/api/clipboard';
import { redirect, useNavigate } from "react-router-dom";

export const Create = (props: {password:string}) => {
  const [network, setNetwork] = useState(undefined)
  const [passphrase, setPassphrase] = useState("")
  const [performAction, setPerformAction] = useState(undefined)
  const navigate = useNavigate()

    return (
        <div className="mx-auto max-w-3xl py-safe">
                <div className="py-4">
                <a href="#" className="px-4 flex" onClick={() => window.location.href = "/session"}> <MdArrowBack className="text-2xl"/> Go back to login</a>
      </div>
          <Wizard>
            <GenerateWallet setPassphrase={setPassphrase}/>
            <BackupWallet passphrase={passphrase}/>
            <VerifyWallet passphrase={passphrase}/>
            <WalletSetup  passphrase={passphrase} password={props.password}/>
          </Wizard>
        </div>
      );
}

const GenerateWallet = (props: {setPassphrase: (pp:string) => void}) => {
    const { nextStep } = useWizard();
    const [mnemonic, setMnemonic] = useState("")

    function refreshMnemonic() {
        let mm = TymtCore.Crypto.generateMnemonic();
        setMnemonic(mm)
        props.setPassphrase(mm)
    }

    useEffect(() => {
      refreshMnemonic()
    }, [])

    return (
        <div className="px-6">
        <div className="">
        <img src="/full_logo.png" className="h-12 mx-auto" />
        <div className=" text-3xl font-black mt-6 text-center w-fit mx-auto flex space-x-3 items-center">
       <span>Generate a mnemonic</span>
      </div>
      <div className="text-gray-400 text-center  pt-8"><p>Remember, saving your mnemonic in a safe place is the only get to recover your wallet!</p> 
      <br />
      <p>Click on refresh to generate a new mnemonic</p></div>
      <div className="py-5"></div>
      <div className="flex flex-row mb-2 w-full"> <div className="grow"></div> <Button className="w-fit bg-red-500/50 hover:bg-red-500 px-2" onClick={() => {refreshMnemonic()}}><BiRefresh/> <span className="text-xs pl-2">Refresh</span></Button></div>

      <div className="rounded-t bg-dark-tertiary mx-auto  py-4 text-sm text-center select-none hover:bg-dark-hoverish font-mono  font-bold text-base  ">
            <div className="flex flex-row w-fit mx-auto gap-3 px-3 flex-wrap items-center justify-items-center"> 
        {mnemonic.split(" ").map((word) => ( <div className="border border-gray-800 text-gray-400 px-1 py-1 rounded">{word}</div> ) )}
        </div></div>
      
        </div>
      <div className="flex py-4 flex-row-reverse">
        <Button onClick={nextStep}>
        {t("next")}
        </Button>
      </div>
    </div>
    );
}

const BackupWallet = (props: {passphrase:string}) => {
    const { nextStep } = useWizard();
    const [cb, setCB] = useState(t("copy"));
    function copyPP() {
      writeText(props.passphrase).then(() => setCB(t("copied")))
    }

    return (
        <div className="px-6">
        <div className="">
        <img src="/full_logo.png" className="h-12 mx-auto" />
        <div className=" text-2xl font-black mt-6 text-center w-fit mx-auto flex space-x-3 items-center">
        <span>Backup your mnemonic</span>
      </div>
      <div className="flex flex-row mt-3"> <div className="grow"></div> <Button className="w-fit bg-red-500/50 hover:bg-red-500 px-2 border border-dark-secondary flex items-center ease-in duration-300 text-sm" onClick={() => { copyPP();}}><BiCopy className="mr-2"/> <span className="text-xs">{cb}</span> </Button></div>
      <div className="grid grid-cols-3 gap-3 mx-auto mb-8 mt-6">
          {props.passphrase.split(" ").map((word,i) => (
              <div className="px-2  py-3 rounded-lg items-center flex bg-gray-800"> <span className="text-xs text-gray-400 mx-2 mr-2 select-none">{i+1}</span> <span className="text-sm font-black mx-auto">{word}</span></div>
          ))}
      </div>
      </div>
      <div className="flex py-4 flex-row-reverse">
        <Button onClick={nextStep}>
          {t("next")}
        </Button>
      </div>
      </div>
    )
}

const VerifyWallet = (props: {passphrase:string}) => {
    const { nextStep } = useWizard();
    const [shuffledPassphrase, setShuffledPassphrase] = useState([])
    const [currentInput, setCurrentInput] = useState("1")
    
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")

    const [correct1, setCorrect1] = useState("")
    const [correct2, setCorrect2] = useState("")
    const [correct3, setCorrect3] = useState("")
    
    const i1 = useRef(null)
    const i2 = useRef(null)
    const i3 = useRef(null)

    useEffect(() => {
      refreshShuffle()
      let splitted = props.passphrase.split(" ")
      setCorrect1(splitted[2])
      setCorrect2(splitted[5])
      setCorrect3(splitted[8])
    }, [props.passphrase])

    function refreshShuffle() {
      setShuffledPassphrase(props.passphrase.split(" ").map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value));
    }

    function setCurrentWord(word:string) {
      if (currentInput == "1") {
        setInput1(word)
      } else if (currentInput == "2") {
        setInput2(word)
      } else if (currentInput == "3") {
        setInput3(word)
      }
    }

    function isVerified() : boolean {
      let splitted = props.passphrase.split(" ")
      return input1 == splitted[2] && input2 == splitted[5] && input3 == splitted[8]
    }

    return (
        <div className="px-6">
        <div className="">
        <img src="/full_logo.png" className="h-12 mx-auto" />
        <div className=" text-3xl font-black mt-6 text-center w-fit mx-auto flex space-x-3 items-center">
        <span>Verify your mnemonic</span>
      </div>
      </div>
      <div className="py-5 flex w-fit mx-auto">
      <div className="px-3"> <div className="text-center py-4 font-black text-sm">Third word</div> <input type="text" name="" className={`text-center p-3  bg-dark-secondary rounded-lg outline-greenish w-40 ${input1 != correct1? 'bg-dark-secondary' : 'bg-green-800'}`} value={input1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (input1 != correct1) {setInput1(e.currentTarget.value); if (correct1 == e.currentTarget.value) {i2.current.focus()}}}} onFocus={() => {refreshShuffle(); setCurrentInput("1")}} readOnly={input1 == correct1} ref={i1}/></div>
      <div className="px-3"> <div className="text-center py-4 font-black text-sm">Sixth word</div> <input type="text" name="" ref={i2} className={`text-center p-3  bg-dark-secondary rounded-lg outline-greenish w-40 ${input2 != correct2? 'bg-dark-secondary' : 'bg-green-800'}`} value={input2}  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (input2 != correct2) {setInput2(e.currentTarget.value); if (correct2 == e.currentTarget.value) {i3.current.focus()} } }} onFocus={() => {refreshShuffle(); setCurrentInput("2")}} readOnly={input2 == correct2} /></div>
      <div className="px-3"> <div className="text-center py-4 font-black text-sm">Ninth word</div> <input type="text" ref={i3}  value={input3} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (input3 != correct3) {setInput3(e.currentTarget.value); if (correct1 == e.currentTarget.value) {i1.current.focus()}}}} name="" className={`text-center p-3  w-40 bg-dark-secondary rounded-lg outline-greenish ${input3 != correct3? 'bg-dark-secondary' : 'bg-green-800'}`} readOnly={input3 == correct3} onFocus={() => {refreshShuffle(); setCurrentInput("3")}}/></div>
      </div>
      <div>        
      </div>
      <div className="grid grid-cols-3 gap-3 mx-auto mb-8 mt-6">
      
      {shuffledPassphrase.map((word,i) => (
              <div className="px-2 border py-2 border-dark-secondary rounded-lg items-center flex hover:bg-dark-secondary cursor-pointer" onClick={() => setCurrentWord(word)}> <span className="text-xs text-gray-400 mx-2 mr-2 select-none">{i+1}</span> <span className="text-sm font-black mx-auto">{word}</span></div>
          ))}
      </div>
      <div className="flex py-4 flex-row-reverse">
        <Button onClick={nextStep} disabled={!isVerified()}>
          {t("next")}
        </Button>
      </div>
      </div>
    )
}

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
    <div className="px-4">
        <div className="pb-10">
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

      <div className="flex pt-2 flex-row-reverse items-center justify-items-center pb-10">
        <Button onClick={()=> {
          TymtCore.Launcher.Settings.save({mnemonic: props.passphrase, addresses: {} },props.password).then(() => window.location.href = "/session")
        }}>
          {t("Confirm")}
        </Button>
        <a href="#" className="hover:underline mx-3 pb-4" onClick={() => {previousStep()}}>{t("No, go back")}</a>
      </div>
    </div>
  );
};