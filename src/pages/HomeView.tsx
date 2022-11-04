import { type } from "@tauri-apps/api/os";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { redirect, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { downloadGame } from "../lib/api/Downloads";
import Games, { Game } from "../lib/api/Games";
import TymtCore from "../lib/core/TymtCore";
import {change} from '../lib/store/gameSlice'
import { getSession, Session } from "../lib/store/sessionSlice";
import { Button } from "./components/Button";
import { Login, SessionView } from "./SessionView";

export const PlayButton = (props: {game: {key:string, data: Game}}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [installed, setInstalled] = useState(false)
    const [installing, setInstalling] = useState(false)

    async function install() {
        setInstalling(true);
        await downloadGame(props.game.key).then(async () => {
        } )
        setInstalling(false);
        checkInstalled()
	}

    async function checkInstalled() {
        setInstalled(await TymtCore.Launcher.Library.isInstalled(props.game.key))
        setLoading(false)
    }

    useEffect(() => {
        checkInstalled()
    }, [])

    if (loading) {
        return <></>
    } else {
        if (installed) {
            return (<Button className="py-0 px-1 text-sm"
            onClick={
                () => {
                    props.game.data.component == undefined?
                    TymtCore.Launcher.Launch(props.game.key)
                    :
                    navigate(`/games/${props.game.key}`)
                }
            }
            >Play</Button>) 
        } else {
            if (installing) {
                return <Button className="py-0 px-1 text-sm">Installing...</Button>
            } else {
                return <Button className="py-0 px-1 text-sm" onClick={install}>Install</Button>
            }
        }
    }
        
    }


export const Home = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const session : Session = useAppSelector(getSession);
    const [platform, setPlatform] = useState("linux")

    async function gameAction(game: {key:string, data: Game}) {
        if (await TymtCore.Launcher.Library.isInstalled(game.key)) {
            if (game.data.component == undefined) {
                TymtCore.Launcher.Launch(game.key)
            } else {
                navigate(`/games/${game.key}`)
            }
        }
    }

    async function getPlatform() {
        let platform = await type();
        switch (platform) {
            case 'Linux':
                setPlatform("linux")
                break;
            case 'Darwin':
                setPlatform("macos")
                break;
            case 'Windows_NT':
                setPlatform("windows")
            break;
        }
    }

    function getGames() {

    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="p-16">
                <div className="flex flex-row">
                <div className="text-3xl font-Orbitron">Available games</div>
                <div className="grow"></div>
                <div>
                {/* <input type="text"  className='bg-white/10 rounded py-1 px-2 text-sm ease-in duration-200 ' placeholder='Search games'/> */}
                </div>
                </div>
                <div className="py-8 flex flex-row gap-4 flex-wrap">
                    {Object.keys(Games).map((key) => { return {key:key, data: Games[key]}}).map((game) =>  {if (Games[game.key].executables[platform]) {return (
                                                <div className=" cursor-pointer hover:scale-110 ease-in duration-150 w-[240px] h-[340px] " onClick={() => {gameAction(game)}} key={game.key}>
                                                <img src={game.data.thumbnail} className="absolute  rounded drop-shadow-xl -z-10" alt="" />
                    
                                                    <div className="flex flex-1 flex-col justify-between w-full h-full ">
                                                        <div></div>
                                                        <div className="grow"></div>
                                                        <div className="bg-gradient-to-t from-black to-transparent">

                                                         <div className="flex flex-row text-base font-bold py-2 px-2  items-center">
                                                         <div className="font-Orbitron">{game.data.name}</div>
                                                        <div className="grow"></div>
                                                        <div> 
                                                            <PlayButton game={game}/>
                                                         </div>
                                                    </div>
                                                        </div>
                                                    </div>
                                            </div>
                    )}})}  
                </div>
            </div>
        </div>
    );
}
