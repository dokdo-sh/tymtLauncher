import { type } from "@tauri-apps/api/os";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Games, { Game } from "../lib/api/Games";
import TymtCore from "../lib/core/TymtCore";
import { getSession, Session } from "../lib/store/sessionSlice";

export const Library = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const session : Session = useAppSelector(getSession);
    const [availableGames, setAvailableGames] = useState([])

    async function gameAction(game: {key:string, data: Game}) {
        navigate(`/library/${game.key}`)
    }

    async function getPlatform() {
        let platform = await type();
        switch (platform) {
            case 'Linux':
                return "linux"
            case 'Darwin':
                return "macos"
            case 'Windows_NT':
                return "windows"
        }
    }

    useEffect(() => {
        getPlatform().then((platform) => {
            let ag : any = []
            Object.keys(Games).map((key) => { return {key:key, data: Games[key]}}).map((game) =>  {if (Games[game.key].executables[platform] != undefined && TymtCore.Launcher.Library.isInstalled(game.key)) {
                ag.push(game)
            }
        })
        setAvailableGames(ag)
        })
        
    }, [])


    return (
        <div className="max-w-7xl mx-auto py-16 px-8">
            <div className="pb-8 text-4xl">Library</div>
            <div className="py-8 grid grid-cols-3 gap-4 flex-wrap">
                    { availableGames.map((game) => {return (
                                                <div className="col-span-1">
                                                    <div className=" cursor-pointer  ease-in duration-150 hover:scale-110 mx-auto" onClick={() => {gameAction(game)}} key={game.key}>
                                                <img src={game.data.thumbnail} className="border rounded-lg border-white/5 shadow-sm shadow-white/10" alt="" />
                    
                                                    <div className="flex flex-1 flex-col justify-between ">
                                                        <div></div>
                                                        <div className="grow"></div>
                                                        <div className="">

                                                         <div className="flex flex-row text-base font-bold py-2 px-2  items-center">
                                                         <div className="text-xl">{game.data.name}</div>
                                                        <div className="grow"></div>
                                                    </div>
                                                        </div>
                                                    </div>

                                            </div>
                                                </div>
                    )})}  
                </div>
        </div>
    );
}
