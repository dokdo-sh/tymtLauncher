import { type } from "@tauri-apps/api/os";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Games from "../lib/api/Games";
import { Button } from "./components/Button";

export const Catalog = () => {

    const navigate = useNavigate()
    const [availableGames, setAvailableGames] = useState([])
    const [currentPreview, setCurrentPreview] = useState("/backgrounds/d53slider.png")
    
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
            } })
            setAvailableGames(ag);
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
                    <div className="grid grid-flow-row-dense grid-cols-10 grid-rows-3 gap-4">
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
