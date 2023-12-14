import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const delegates = {
    "acanthus": 2,
    "advin": 2,
    "arbaro": 2,
    "arktoshi": 2,
    "aurelion_sol": 2,
    "bfx": 2,
    "biz_classic": 2,
    "cactus": 2,
    "crypticmaniac": 2,
    "dev51": 2,
    "doctordefi": 2,
    "dpos.info": 2,
    "finca": 2,
    "fnoufnou": 2,
    "fonk": 2,
    "fun ": 2,
    "gangnam": 2,
    "generalpuma": 2,
    "goat": 2,
    "goose": 2,
    "kaos": 2,
    "kimchi": 2,
    "kippers": 2,
    "leitesv": 2,
    "lunar": 2,
    "mtaylan": 2,
    "osrn": 2,
    "podushkin": 2,
    "sevi": 2,
    "sigma": 2,
    "sl33p": 2,
    "st3v3n": 2,
    "studiocoina": 2,
    "thamar": 2,
    "wevalidate": 2,
    "nft": 2,
    "axefin1": 2,
    "cams_yellow_jacket": 2,
    "deadlock": 2,
    "umbrella": 2,
    "fortune": 2,
    "geops": 2,
    "balu": 2,
    "axel": 2,
    "schuan911": 2,
    "lucky_delegate": 2,
    "exolarite": 2,
    "pnwdrew": 2,
    "emsy": 2,
    "nybl": 2
}

export type Delegate = {
    
}

export const Staking = () => {
    const navigate = useNavigate()
    return (
        <div className="max-w-7xl mx-auto pb-16 px-8 ">
            <div className="text-xs font-bold p-1 my-6 mx-6 rounded hover:bg-greenish w-fit cursor-pointer" onClick={() => navigate("/wallet")}>{"<"} BACK</div>
        <div className="pt-2 pb-8 rounded-b px-6 w-2/3" style={{background: ""}}>
            <div className="flex flex-row  space-x-3 items-center ">
                <img src="/blockchains/solar.png" className="bg-[#f64a28] border rounded-full border-greenish  p-2"   alt="" />
                <div>
                <div className="text-3xl font-bold">Stake your SXP</div>
                <div className="py-2 text-xs">Vote for public delegates on the Solar Blockchain</div>
                </div>
                <div className="grow"></div>
                <Button className="bg-greenish text-white border border-gray-300/30 hover:bg-white hover:text-greenish" onClick={() => navigate("/wallet")}>Stake now</Button>
                <div>
                </div>
            </div>
            
        </div>
        <div className="px-8"></div>
        <div className="py-4 px-8 text-xl font-bold">You will be voting for</div>
        <div className="flex flex-row px-8">
        <div className="rounded border divide-y divide-gray-300/20 border-gray-300/20 bg-black/20 w-2/3">{Object.keys(delegates).map((del) => (
            <DelegateItem username={del} />
        ))}</div>
        </div>
    </div>
    )
}

const DelegateItem = (props: {username:string}) => {
    const [del, setDel] = useState({rank:0, short_proposal: "", contribution_count: 0, avatar: "/blockchains/solar.png"})
    // const [resp, setResp] = useState("")

    const isJSON = (response: any) => {
        if (response){
            try{
                JSON.parse(response)
            } catch(_) {
                return false
            }
            return true
        } else {
            return false
        }
    }
    useEffect(() => {
        fetch(`https://delegates.solar.org/api/delegates/${props.username}`)
            .then(async (rp) => {
                // setResp(await rp.text())
                if (isJSON(rp)){
                    return rp.json()
                } else {
                    return null;
                }
            }).then((dlRp) => {
                if(dlRp) setDel(dlRp)
            })
    }, [])

    return (
        <div className="py-3 px-3 flex flex-row items-center hover:bg-gray-800/20 cursor-pointer">
            <div className="flex-none w-38"> 
                <img src={del.avatar? del.avatar :  "/blockchains/solar.png"} className="rounded-full bg-white border border-gray-100 shadow-sm w-16 h-16 aspect-square" alt="" />
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="px-4">
                    <div className=" font-bold">{props.username}<span className="text-gray-400">#{del.rank}</span> </div>
                    <div className="text-sm text-gray-400 py-2">{del.short_proposal}</div>
                    <div className="flex flex-row">
                        <div className="bg-green-500/30 border border-green-500/20 w-fit p-1 text-xs rounded text-green-200 my-1">Active</div>
                        <div className="bg-greenish/70 w-fit p-1 text-xs rounded text-white border border-gray-200/20 my-1 mx-2">{del.contribution_count} contributions</div>
                    </div>
                    {/* <div className="flex flex-row">
                    <div className="bg-green-500/30 border border-green-500/20 w-fit p-1 text-xs rounded text-green-200 my-1">{resp}</div>
                    </div> */}
                </div>

                <div className="py-2">
                    <input
                        type="text"
                        className={`bg-transparent w-full outline-none border-b dark:text-white dark:border-0 px-1 py-1 text-sm text-right $`}
                        placeholder="votes"
                    />                    
                    <div className="font-mono flex flex-row justify-end text-gray-600 cursor-pointer w-full text-sm py-1">
                        tSXP 0.00
                    </div>
                </div>
            </div>
            
        </div>
    )
}