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

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";



    function SliderComponent() {
        return (
            <>
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img
                            className="object-fill w-full"
                            src="/backgrounds/d53slider.png"
                            alt="image slide 1"
                        />
                    </SwiperSlide>
                </Swiper>
            </>
        );
    }

export const Catalog = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const session : Session = useAppSelector(getSession);
    const [availableGames, setAvailableGames] = useState([])
    const [currentPreview, setCurrentPreview] = useState("/backgrounds/d53slider.png")
    async function gameAction(game: {key:string, data: Game}) {
        navigate(`/games/${game.key}`)
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
            Object.keys(Games).map((key) => { return {key:key, data: Games[key]}}).map((game) =>  {if (Games[game.key].executables[platform] != undefined) {
                ag.push(game)
            }
        })
        setAvailableGames(ag)
        })
        
    }, [])

    return (
        <div className="">
            <div className="max-w-7xl border-x border-[#161616] mx-auto flex flex-row items-center px-8 h-[600px] " style={{background: `url('/backgrounds/banner.jpg') no-repeat`}}>
                <div className="py-16 h-fit">
                    <div className="text-6xl font-bold" style={{textShadow: '4px 4px #161616;'}}>District 53</div>
                    <div className="font-bold py-3">Recent release</div>
                    <div className="w-1/2 py-2" style={{textShadow: '4px 4px #000000;'}}>District 53 is a virtual desktop and mobile voxel based metaverse game.
                    It has unique features utilizing the SXP blockchain with the Minetest codebase.</div>
                    <div className="py-3">
                        <Button className="font-bold" onClick={() => {navigate(`/games/district53`)}}>ADD TO LIBRARY</Button>
                    </div>
                    </div>
            <div className="grid grid-cols-6 py-8 hidden">
                {/* <div className="col-span-1"></div> */}
                <div className="col-span-6">
                <div className="grid grid-cols-6 w-full px-16 py-8  rounded border border-gray-800 gap-4">
                <div className="col-span-4 py-6"><img src={currentPreview} alt="" /></div>
            
                <div className="col-span-2 px-3 bg-black">
                    <div className="text-4xl text-center py-6 font-bold">District 53</div>
                    <div className="grid grid-cols-2 gap-4 px-3 w-fit mx-auto">
                    <img src="/backgrounds/d53slider.png"  className="h-20 rounded-lg border-2 border-transparent hover:border-2 hover:border-primary" onMouseUp={() => setCurrentPreview('/backgrounds/d53slider.png')} alt="" />
                    <img src="https://i.ytimg.com/vi/fdt_jBXg3B4/maxresdefault.jpg" className="h-20 rounded-lg cursor-pointer border-2 border-transparent hover:border-2 hover:border-primary" onMouseUp={() => setCurrentPreview('https://i.ytimg.com/vi/fdt_jBXg3B4/maxresdefault.jpg')}  alt="" />
                    <img src="/d53_screenshot.png" onMouseUp={() => setCurrentPreview('/d53_screenshot.png')} className="rounded-lg border-2 border-transparent hover:border-2 h-20 hover:border-primary" alt="" />
                    <img src="/d53_landmap.png" onMouseUp={() => setCurrentPreview('/d53_landmap.png')} className="rounded-lg border-2 border-transparent hover:border-2 hover:border-primary h-20" alt="" />
                    
                    </div>
                    <div className="text-xs text-gray-400 font-light px-2 py-3 text-justify">
                    <p>District 53 is a virtual desktop and mobile voxel based metaverse game.
                    It has unique features utilizing the SXP blockchain with the Minetest codebase.
                    </p>
                    <br />
              <p>Purchase virtual land. Hire contractors with building skills or use your skills to build your own dream land.</p>
                    </div>
                </div>
            </div>
                </div>
            </div>
            </div>
            <div className="max-w-7xl mx-auto bg-[#080808] border-x border-[#161616]">
            <div className="p-8">
                <div className="flex flex-row">
                <div className="text-4xl  space-x-3">
                    {/* <span>Tymt Catalog</span> */}
                     </div>
                <div className="grow"></div>
                <div>
                {/* <input type="text"  className='bg-white/10 rounded py-1 px-2 text-sm ease-in duration-200 ' placeholder='Search games'/> */}
                </div>
                </div>
                {/* <div className="py-8 flex flex-row gap-4 flex-wrap">
                    { availableGames.map((game) => {return (
                                                <div className=" cursor-pointer  ease-in duration-150 hover:scale-110" onClick={() => {gameAction(game)}} key={game.key}>
                                                <img src={game.data.thumbnail} className="border rounded-lg border-white/5 shadow-sm shadow-white/10 w-[180px]" alt="" />
                    
                                                    <div className="flex flex-1 flex-col justify-between ">
                                                        <div></div>
                                                        <div className="grow"></div>
                                                        <div className="">

                                                         <div className="flex flex-row text-base font-bold py-2 px-2  items-center">
                                                         <div className="font-light">{game.data.name}</div>
                                                        <div className="grow"></div>
                                                    </div>
                                                        </div>
                                                    </div>

                                            </div>
                    )})}  
                </div> */}
                <div className="grid grid-flow-row-dense grid-cols-10 grid-rows-3 gap-4">
                    {/* <div className="col-span-1 rounded">
                        By genre
                    </div> */}
                    <div className="col-span-10">
                        <div className="grid grid-cols-3">
                        { availableGames.map((game) => {return (
                            <div className="col-span-1">
                                <div className="mx-auto hover:scale-110 w-[301px] rounded-lg ease-in duration-150 cursor-pointer ">
                                <img src={game.data.thumbnail} onClick={() => navigate(`/games/${game.key}`)} className="border-2 hover:border-white w-fit border-gray-800/50  rounded-lg " alt="" />
                                <div className="py-1 font-bold text-xl">{game.data.name}</div>
                                <div className="text-sm text-justify">A virtual desktop and mobile voxel based metaverse game.</div>
                            </div>
                            </div>
                        )})}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
