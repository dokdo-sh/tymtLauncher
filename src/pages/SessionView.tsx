import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useWizard, Wizard } from "react-use-wizard";
import { useAppDispatch } from "../app/hooks";
import TymtCore from "../lib/core/TymtCore";
import { changeSession } from "../lib/store/sessionSlice";
import { changeWallet } from "../lib/store/walletSlice";
import { Button } from "./components/Button";
import { Loading } from "./components/Loading";
import { Create } from "./wallet/Create";
import { Import } from "./wallet/Import";

export const SessionView = () => {
    const [hasMnemonic, setHasMnemonic] = useState(false);
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        TymtCore.Launcher.Settings.hasMnemonic().then((hm) => {
            setHasMnemonic(hm)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loading/>  
    } else {
        if (hasMnemonic) {
            return <Login/>
        } else {
            return <SignUp/>
        }
    }
}

export const Login = () => {
    const navigate = useNavigate()
    const [wrongPassword, setWrongPassword] = useState(false);
    const [didTry, setDidTry] = useState(false);
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch()

    function login() {
        TymtCore.Launcher.Settings.load(password).then((val) => {
            if (val.settings) {
                dispatch(changeWallet(val.settings.wallet))
                dispatch(changeSession({logged:true, password: password}))
                navigate("/")
            } else {
                setWrongPassword(true)
            }
        })
    }

    return (

    <div className="h-screen w-screen flex  items-center">
    <div className="min-w-1/2 max-w-4xl mx-auto px-8">
                <div className="border border-primary p-1 rounded space-y-3 bg-black/40">
                    <div className="border-2 border-red-500 rounded space-y-4 p-6 w-full h-full">
                    <img src="/logo.png" className="h-16 mx-auto" alt="" />
                    <div className="text-3xl text-center py-3  font-bold">Log in on <span className="text-primary">tymt</span></div>
                    <div className="">
                                <div className=" text-center py-4 text-xs">
                    Enter your password to decrypt your mnemonic.
                </div>

                <div className="mx-auto w-fit my-2"><input type="password" value={password} onKeyDown={(e) => {if (e.key == 'Enter') {login()}}} onChange={(e) => setPassword(e.currentTarget.value)} className="rounded bg-white/10 py-1 px-2" placeholder="Password"/></div>
        {wrongPassword && <div className="text-red-800 text-center text-xs pb-4">Password is not correct</div>}
    <div className="py-3 px-9 mx-auto"><Button className="w-full text-center font-bold" onClick={login}><div className="mx-auto">LOGIN</div></Button></div>

                    </div>
        </div>
        </div></div>
    </div>
    )
}

export const SignUp = () => {
    const [password, setPassword] = useState("")
    const [action, setAction] = useState("")

        return (
            <Wizard>
            <FirstStep setPassword={setPassword}/>
            <SecondStep setAction={setAction}/>
            <ThirdStep password={password} action={action}/>
        </Wizard>    
        )
    
}

const FirstStep = (props: {setPassword: (password:string) => void}) => {
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {nextStep} = useWizard()

    function signup() {
        if (password == confirmPassword) {
            setPassword(password)
            props.setPassword(password)
            nextStep()
        } else {
            setPasswordsMatch(false)
        }
    }

    return (

        <div className="h-screen w-screen flex  items-center">
        <div className="min-w-1/2 max-w-4xl mx-auto px-8">
                    <div className="border border-primary p-1 rounded space-y-3">
                        <div className="border border-red-500 rounded space-y-4 p-6 w-full h-full">
                        <img src="/logo.png" className="h-16 mx-auto" alt="" />
                        <div className="text-3xl text-center py-3  font-bold">Welcome to <span className="text-primary">tymt</span></div>
                        <div className="">
                                    <div className=" text-center py-4 text-xs">
                        Set up a local password to encrypt your mnemonic.
                    </div>
        
                    <div className="mx-auto w-fit my-2"><input value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" className="rounded bg-white/10 py-1 px-2" placeholder="Password"/></div>
                    <div className="mx-auto w-fit my-2"><input value={confirmPassword} onChange={(e) => setConfirmPassword(e.currentTarget.value)} type="password" placeholder="Confirm password" className="rounded bg-white/10 py-1 px-2" /></div>
            {!passwordsMatch && <div className="text-red-800 text-center text-xs pb-4">Passwords do not match</div>}
        <div className="py-3"><Button onClick={signup}>Next</Button></div>
        
                        </div>
            </div>
            </div></div>
        </div>
        )

}

const SecondStep = (props: {setAction: (action:string) => void}) => {
    
    const navigate = useNavigate()
    const {nextStep} = useWizard()

    function proceed(action:string) {
        props.setAction(action)
        nextStep()
    }

    return (
        <div className="max-w-2xl mx-auto my-16 px-4">
            <div className="border border-primary p-1 rounded space-y-3">
                <div className="border border-red-500 rounded space-y-4 p-6 w-full h-full">
                <img src="/logo.png" className="h-16 mx-auto" alt="" />
                <div className="text-3xl text-center py-3  font-bold">Log in on <span className="text-primary">tymt</span></div>
                <div className=" text-center py-4 text-xs">
                    You can log in with your mnemonic or create a new one.
                </div>
                <div className='bg-primary/70 py-2 mx-auto px-6 text-base w-fit  hover:bg-primary cursor-pointer hover:ease-in duration-200 flex flex-row items-center h-fit' onClick={() => proceed("import")}> <div  >Import mnemonic</div></div>
                  <div className='bg-red-500/70 py-2 mx-auto px-6 text-base w-fit  hover:bg-red-500 cursor-pointer hover:ease-in duration-200 flex flex-row items-center h-fit' onClick={() => proceed("create")}> <div>Create mnemonic</div></div>
                <div className="text-center text-xs">
                    tymt.com
                </div>
                </div>
            </div>
        </div>
    );
}

const ThirdStep = (props: {action:string, password:string}) => {

    if (props.action == "import") {
        return <Import password={props.password}/>
    } else {
        return <Create password={props.password}/>
    }

}
