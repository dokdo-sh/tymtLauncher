import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Games from '../../lib/api/Games';
import {change, selectGame} from '../../lib/store/gameSlice'
import {changeTab, selectCurrentGame} from '../../lib/store/currentGameSlice'
import { ProfileSelector } from './ProfileSelector';
import { BsDownload } from 'react-icons/bs';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { redirect, useNavigate } from 'react-router-dom';
import { changeSession } from '../../lib/store/sessionSlice';

export const Navbar = () => {
    const game = useAppSelector(selectGame);
    const currentGame = useAppSelector(selectCurrentGame)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()


    return (
        <div className=" border-b border-gray-800 top-0 sticky bg-black bg-opacity-70 z-50">
                <div className="flex flex-row items-center justify-items-center max-w-7xl mx-auto">
                        <div className="py-2">
                        <div className=" mx-4 flex flex-row items-center  rounded p-2 bg-red-500 opacity-80 hover:opacity-100 ease-in duration-200"><img src="/isotype_white.png" className="my-auto h-6 cursor-pointer " alt="logo" onClick={() => {dispatch(change(undefined));navigate("/")}  } />
                        
                        </div>
                        </div>
                           <div>
                           {/* {game && 
                            <div className='text-xl font-Orbitron font-bold pl-2'><span className="px-2 text-red-500">{">"}</span> {game.name}</div>
                        } */}
                           </div>
                        <div className="space-x-3">
                            {/* {game && currentGame &&
                                Object.keys(game.tabs).map((gt) => (
                                    
                                    <a href="#" className={`font-Orbitron text-sm border border-transparent rounded px-3 hover:text-white/70 hover:border hover:border-white/30 ${gt == currentGame.currentTab? 'text-white/70 border border-white/30 bg-primary/10':''} py-1 ease-in duration-200 hover:bg-primary/10`} onClick={() => dispatch(changeTab(gt))}>{game.tabs[gt]}</a>
                                ))
                            } */}
                            {/* {!game && */}
                                <div className='flex flex-row h-full space-x-3'>
                                    <input type="text" className='rounded bg-gray-800 bg-opacity-50 py-1 px-3 w-[300px]' placeholder='Search games' />
                                <div>
                                    <a onClick={() => navigate("/")} href="#" className="text-white text-xl   px-2  border-b-2 border-white ease-in duration-200 py-4 h-full">Catalog</a>
                                </div>
                                <div>
                                    <a onClick={() => navigate("/library")} href="#" className="text-white/50 text-xl   px-2   ease-in duration-200 py-4 h-full">Library</a>
                                </div>
                                </div>
                            {/* } */}
                        </div>
                        <div className="grow"></div>
                                <a className='bg-gray-800  font-Orbitron text-sm border border-transparent px-3 hover:text-white/70 hover:border hover:border-white/30 py-2 ease-in duration-200 hover:bg-primary/10 cursor-pointer rounded' onClick={() => {dispatch(change(undefined));navigate('/downloads')}} href='#'>
                                <BsDownload/>
                                </a>
                                <ProfileSelector/>
                                <div className='pr-4 text-xs font-Orbitron hover:text-red-500 hover:cursor-pointer rounded' onClick={() => { dispatch(changeSession({logged:false, password:undefined}));navigate("/session")}}> <RiLogoutCircleLine/> </div>
                </div>                
        </div>
    );
}
