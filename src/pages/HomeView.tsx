import { useAppDispatch } from "../app/hooks";
import Games from "../lib/api/Games";
import {change} from '../lib/store/gameSlice'

export const Home = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="p-16">
                <div className="flex flex-row">
                <div className="text-3xl font-Orbitron">Available games</div>
                <div className="grow"></div>
                <div>
                <input type="text" className='bg-white/10 rounded py-1 px-2 text-sm ease-in duration-200 ' placeholder='Search games'/>
                </div>
                </div>
                <div className="py-8">
                    {
                        <div className=" cursor-pointer hover:scale-110 ease-in duration-150 w-[177px] h-[266px] " onClick={() => {window.location.href = "/games/district53"}}>
                            <img src="http://localhost:3000/d53.jpg" className="absolute border  border-gray-800 rounded drop-shadow-xl -z-10" alt="" />

                                <div className="flex flex-1 flex-col justify-between w-full h-full ">
                                    <div className="grow"></div>
                                <div className="flex flex-row text-base font-bold py-2 px-2 bg-gradient-to-t from-black to-transparent">
                                    <div className="font-Orbitron">{Games.district53.name}</div>
                                    <div className="grow"></div>
                                    <div>{"(i)"}</div>
                                </div>
                                </div>
                        </div>
                    } 
                </div>
            </div>
        </div>
    );
}
