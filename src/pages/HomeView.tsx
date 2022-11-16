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
                    className="mySwiper "
                >
                    <SwiperSlide>
                        <img
                            className="object-fill w-full h-96"
                            src="/backgrounds/district53.webp"
                            alt="image slide 1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            className="object-fill w-full h-96"
                            src="/backgrounds/district53.webp"
                            alt="image slide 2"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            className="object-fill w-full h-96"
                            src="/backgrounds/district53.webp"
                            alt="image slide 3"
                        />
                    </SwiperSlide>
                </Swiper>
            </>
        );
    }

export const Home = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const session : Session = useAppSelector(getSession);
    const [availableGames, setAvailableGames] = useState([])

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
            <div className=""><SliderComponent/></div>
            <div className="max-w-7xl mx-auto">
            <div className="p-8">
                <div className="flex flex-row">
                <div className="text-3xl font-Orbitron space-x-3">
                    <div className="inline-block">
                    <div className="flex flex-row items-center ">
                        <div className="w-2 h-6 skew-y-12 mb-1 bg-primary inline-block"></div>
                        <div className="w-2 h-6 skew-y-12 bg-red-500 inline-block"></div>
                    </div>
                    </div>
                    <span>Available games</span>
                     </div>
                <div className="grow"></div>
                <div>
                {/* <input type="text"  className='bg-white/10 rounded py-1 px-2 text-sm ease-in duration-200 ' placeholder='Search games'/> */}
                </div>
                </div>
                <div className="py-8 flex flex-row gap-4 flex-wrap">
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
                </div>
            </div>
        </div>
        </div>
    );
}
