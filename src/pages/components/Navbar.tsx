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
        <div className=" border-b border-gray-800 sticky bg-black">
                <div className="flex flex-row items-center justify-items-center max-w-7xl mx-auto">
                        <div className=" my-2 mx-4 flex flex-row items-center"><img src="/full_logo.png" className="my-auto h-10 cursor-pointer" alt="logo" onClick={() => {dispatch(change(undefined));navigate("/")}  } />
                        {game && 
                            <div className='text-xl font-Orbitron font-bold pl-2'><span className="px-2 text-red-500">{">"}</span> {game.name}</div>
                        }
                           </div>
                        <div className="space-x-3">
                            {game && currentGame &&
                                Object.keys(game.tabs).map((gt) => (
                                    
                                    <a href="#" className={`font-Orbitron text-sm border border-transparent rounded px-3 hover:text-white/70 hover:border hover:border-white/30 ${gt == currentGame.currentTab? 'text-white/70 border border-white/30 bg-primary/10':''} py-1 ease-in duration-200 hover:bg-primary/10`} onClick={() => dispatch(changeTab(gt))}>{game.tabs[gt]}</a>
                                ))
                            }
                            {!game &&
                                <div className='flex flex-row'>
                                <div>
                                    <a onClick={() => navigate("/")} href="#" className="font-Orbitron text-sm text-white border border-transparent px-3 hover:text-white border border-white/30 py-1 ease-in duration-200 rounded">Catalog</a>
                                </div>
                                </div>
                            }
                        </div>
                        <div className="grow"></div>
                                {/* <a className='font-Orbitron text-sm border border-transparent px-3 hover:text-white/70 hover:border hover:border-white/30 py-1 ease-in duration-200 hover:bg-primary/10 cursor-pointer rounded' onClick={() => {dispatch(change(undefined));navigate('/downloads')}} href='#'>
                                <BsDownload/>
                                </a> */}
                                <ProfileSelector/>
                                <div className='pr-4 text-xs font-Orbitron hover:text-red-500 hover:cursor-pointer rounded' onClick={() => { dispatch(changeSession({logged:false, password:undefined}));navigate("/session")}}> <RiLogoutCircleLine/> </div>
                </div>                
        </div>
    );
}
