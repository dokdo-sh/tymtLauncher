import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Games from '../../lib/api/Games';
import {change, selectGame} from '../../lib/store/gameSlice'
import {changeTab, selectCurrentGame} from '../../lib/store/currentGameSlice'
import { ProfileSelector } from './ProfileSelector';
import { BsArrowRight, BsChat, BsChevronBarRight, BsChevronCompactRight, BsDownload } from 'react-icons/bs';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { redirect, useNavigate } from 'react-router-dom';
import { changeSession } from '../../lib/store/sessionSlice';
import { WebviewWindow } from '@tauri-apps/api/window';

export const Navbar = () => {
    const game = useAppSelector(selectGame);
    const currentGame = useAppSelector(selectCurrentGame)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    console.log(window.location.pathname)

    return (
        <div className=" border-b border-gray-800 top-0 sticky bg-black bg-opacity-90 z-50 shadow-lg shadow-black">
                <div className="flex flex-row items-center justify-items-center max-w-7xl mx-auto">
                        <div className="">
                        <div className="mx-4 flex flex-row items-center my-1 rounded-lg border-2 border-transparent hover:border-white p-2 bg-red-500 cursor-pointer opacity-80 hover:opacity-100 ease-in duration-200" onClick={() => {dispatch(change(undefined));navigate("/")}  }><img src="/isotype_white.png" className="my-auto h-6  " alt="logo"  />
                        
                        </div>
                        </div>
                        <div>
                          
                           </div>
                            {game && currentGame &&
                                <div className='flex flex-row bg-primary/40 my-2   rounded'>
                                    <div>
                                    </div>
                                    <div className='text-2xl text-primary  mr-3'><span className=" text-primary/60"> <BsChevronCompactRight className='inline-block text-4xl'/> </span>
                                        <img src="https://district53.io/d53logo.png" className='w-10 inline-block ' alt="" />
                                    
                                     </div>
                                    {Object.keys(game.tabs).map((gt) => (
                                    <a href="#" className={`my-1 mx-1 text-sm border border-transparent  px-3 hover:text-primary hover:border hover:border-white/30 ${gt == currentGame.currentTab? 'text-primary/70 rounded border border-primary bg-primary/10':'text-white/50'} py-1 ease-in duration-200 hover:bg-primary/10 hover:border hover:border-primary`} onClick={() => dispatch(changeTab(gt))}>{game.tabs[gt]}</a>
                                ))}
                                </div>
                            } 
                             {!game &&
                                    <div className="space-x-3">
                                <div className='flex flex-row h-full space-x-3'>
                                    <input type="text" className='rounded bg-gray-800 bg-opacity-50 py-1 px-3 w-[300px]' placeholder='Search games' />
                                <div>
                                    <a onClick={() => navigate("/")} href="#" className={` text-xl   px-2 ${window.location.pathname == "/" || window.location.pathname == "/games/district53"? 'text-white border-b-2 border-white': 'text-white/50 hover:border-b-2 hover:border-white/80 hover:text-white/80 hover:scale-110'}   ease-in duration-200 py-4 h-full`}>Catalog</a>
                                </div>
                                <div>
                                    <a onClick={() => navigate("/library")} href="#" className={` text-xl   px-2 ${window.location.pathname == "/library"? 'text-white border-b-2 border-white': 'text-white/50 hover:border-b-2 hover:border-white/80 hover:text-white/80 hover:scale-110'}   ease-in duration-200 py-4 h-full`}>Library</a>
                                </div>
                                </div>
                        </div>
                          } 
                        <div className="grow"></div>
                                <a className={`bg-gray-800   text-sm border border-transparent px-3 hover:text-white/70 hover:border hover:border-white/30 py-2 ease-in duration-200 hover:bg-primary/10 cursor-pointer rounded ${window.location.pathname == "/downloads"?'border-primary/30 text-primary':''}`} onClick={() => {dispatch(change(undefined));navigate('/downloads')}} href='#'>
                                <BsDownload/>
                                </a>
                                <ProfileSelector/>
                                <div className='text-primary flex flex-row items-center gap-3   text-sm border border-primary px-3 hover:text-white/70 hover:border hover:border-white/30 py-1 ease-in duration-200 hover:bg-primary/10 cursor-pointer rounded mx-2' onClick={() => {
                                    const webview = new WebviewWindow('theUniqueLabel', {
                                        url: '/chat ',
                                        title: 'tymt Chat'
                                      });
                                }}> <BsChat className='inline-block'/> Chat </div>
                                <div className='pr-4 text-xs  hover:text-red-500 hover:cursor-pointer rounded' onClick={() => { dispatch(changeSession({logged:false, password:undefined}));navigate("/session")}}> <RiLogoutCircleLine/> </div>
                </div>                
        </div>
    );
}
