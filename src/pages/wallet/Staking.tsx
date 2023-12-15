import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useAppSelector } from "../../app/hooks";
import { selectWallet } from "../../lib/store/walletSlice";
import { api_url, net_name } from "../../configs";
import Solar from "../../lib/wallets/Solar";


export type Delegate = {
    username: string,
    address: string,
    publicKey: string,
    rank: number,
    isResigned: boolean,
    percent: string,
    voted: number,
}

export type VoteAsset = {
    [key: string]: number
}

export const Staking = () => {
    const [delegates, setDelegates] = useState<Delegate[]>([])
    const [balance, setBalance] = useState(0)
    const [totalVoted, setTotalVoted] = useState(0) 
    const [voteCount, setVoteCount] = useState(0)
    const [changed, setChanged] = useState(false)
    const wallet = useAppSelector(selectWallet)
    const navigate = useNavigate()

    const selWallet = new Solar(wallet.mnemonic)

    const getDelegates = async () => {
        const bal = await selWallet.getCurrentBalance()
        setBalance(bal/10**8)
        const response = await fetch(`${api_url}/delegates?page=1&limit=60&orderBy=rank:asc`)
        let resData: Delegate[] = (await response.json()).data 

        const resp = await fetch(`${api_url}/wallets/${selWallet.address}`)
        const walletData = (await resp.json()).data
        let voters = walletData.votingFor
        let total = 0
        let voteCnt = 0
        const data = resData.map((item) => {
            if (voters && voters[item.username]) {
                item.percent = voters[item.username].percent.toFixed(2)
                item.voted = voters[item.username].percent
                total = total + item.voted
                voteCnt = voteCnt + 1
            } else {
                item.percent = "0.00"
                item.voted = 0
            }
            return item
        })
        setTotalVoted(total)
        setVoteCount(voteCnt)
        setDelegates(data)
    }

    const onClickedBtn = async () => {
        let votes: VoteAsset = {}
        let data = [...delegates]
        data.map((item) => {
            if (parseFloat(item.percent) > 0){
                votes[item.username] = parseFloat(item.percent)
            }
        })
        console.log("vote asset : ", votes)
        let res = await (selWallet as Solar).vote( votes, "0.09")
        console.log("response : ", res)
        navigate("/wallet")
    }

    useEffect(()=> {        
        let isChanged = false
        let data = [...delegates]
        let count = 0
        let total = 0                    
        data.map((item) => {
            if (item.voted !== parseFloat(item.percent)){
                isChanged = true
            }
            if (parseFloat(item.percent) > 0 && !item.isResigned){
                count = count + 1
                total  = total + parseFloat(item.percent)
            }
        })
        setTotalVoted(total)
        setVoteCount(count)
        setChanged(isChanged)
    }, [delegates])

    useEffect(()=> {        
        getDelegates()
    }, [])

    return (
        <div className="max-w-7xl mx-auto pb-16 px-8 ">
            <div className="text-xs font-bold p-1 my-6 mx-6 rounded hover:bg-greenish w-fit cursor-pointer" onClick={() => navigate("/wallet")}>{"<"} BACK</div>
        <div className="pt-2 pb-8 rounded-b px-6 w-3/4" style={{background: ""}}>
            <div className="flex flex-row  space-x-3 items-center ">
                <img src="/blockchains/solar.png" className="bg-[#f64a28] border rounded-full border-greenish  p-2"   alt="" />
                <div>
                <div className="text-3xl font-bold">Stake your SXP</div>
                <div className="py-2 text-xs">Vote for public delegates on the Solar Blockchain</div>
                </div>
                <div className="grow"></div>
                <Button className="bg-greenish text-white border border-gray-300/30 hover:bg-white hover:text-greenish" 
                    onClick={onClickedBtn} 
                    disabled={!changed || !(totalVoted === 100 || totalVoted === 0) || balance === 0}
                >Stake now</Button>
                <div>
                </div>
            </div>
            
        </div>
        <div className="px-8 w-3/4">
            <div className="flex flex-row rounded bg-gray-300/20 w-full py-2">
                <div className="flex flex-row w-full items-center text-center">
                    {totalVoted > 100 ? 
                        <div className="flex flex-row">
                            <div className="text-red-400 px-2">Total Voted: {totalVoted}%</div>
                            <div className="text-red-400 px-2">Remaining: {100 - totalVoted}%</div>
                        </div> : 
                        <div className="flex flex-row">
                            <div className="text-green-400 px-2">Total Voted: {totalVoted}%</div>
                            <div className="text-green-400 px-2">Remaining: {100 - totalVoted}%</div>
                        </div>
                    }                    
                    <div className="text-green-400 px-2">Votes: {voteCount}/53</div>
                </div> 
            </div>
        </div>
        
        <div className="py-3 px-3 flex flex-row items-center w-3/4 ">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row w-full items-center px-8">
                    <div className="text-gray-400 w-16"> Rank </div>
                    <div className="text-gray-400 w-72">Username </div>
                </div>                
                <div className="font-mono flex flex-row justify-end text-gray-400 w-full text-sm px-4"> Vote % </div>
            </div>
        </div>
        <div className="flex flex-row px-8">
            <div className="rounded border divide-y divide-gray-300/20 border-gray-300/20 bg-black/20 w-3/4">{delegates.map((del, index) => (
                <DelegateItem voter={del} balance={balance} changeVotes={(e) => {
                    const delTemp = [...delegates]
                    let val = parseFloat(e.target.value)
                    let valFix = parseFloat(parseFloat(e.target.value).toFixed(2))
                    if (val - valFix){
                        val = val*10
                    }                    
                    delTemp[index].percent = val.toFixed(2)
                    setDelegates(delTemp)
                }} />
            ))}</div>
        </div>
    </div>
    )
}

const DelegateItem = (props: {voter:Delegate, balance: number, changeVotes: (event: React.ChangeEvent<HTMLInputElement>) => void}) => {
    const voteValue = props.voter.percent ? (parseFloat(props.voter.percent) * props.balance / 100).toFixed(2): "0.00"
    return (
        <div className="px-3 flex flex-row items-center hover:bg-gray-800/20 cursor-pointer">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row w-full items-center">
                    <div className="text-gray-400 w-16"> # {props.voter.rank} </div>
                    <div className="text-lg w-72">{props.voter.username} </div>
                    {props.voter.isResigned ? <div className="bg-red-600 text-white text-sm width:70 px-2 rounded">Resigned</div>:
                     props.voter.voted ? <div className="bg-green-600 text-white text-sm width:70 px-2 rounded">Vote {props.voter.voted}%</div>: <div></div>}
                </div>
                
                <div className="py-1 w-36 px-2">
                    <input
                        type="text"
                        className={`bg-transparent w-full outline-none border-b dark:text-white dark:border-0 px-1 py-1 text-sm text-right $`}
                        pattern="[0-9]{0,5}"
                        placeholder="0.00"
                        value={props.voter.percent}
                        onChange={(e) => {
                            if (parseFloat(e.target.value) < 100){
                                props.changeVotes(e)
                            }
                        }}
                    />
                    { parseFloat(voteValue) > props.balance ? 
                        <div className="font-mono flex flex-row justify-end text-red-400 cursor-pointer w-full text-sm py-1">
                            {net_name === "mainnet" ? "SXP":"tSXP"} {voteValue}
                        </div> : 
                        <div className="font-mono flex flex-row justify-end text-gray-400 cursor-pointer w-full text-sm py-1">
                            {net_name === "mainnet" ? "SXP":"tSXP"} {voteValue}
                        </div>
                    }  
                </div>
            </div>
        </div>
    )
}