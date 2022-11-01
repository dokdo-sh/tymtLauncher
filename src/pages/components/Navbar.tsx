import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Games from '../../lib/api/Games';
import {change, selectGame} from '../../lib/store/gameSlice'
import {changeTab, selectCurrentGame} from '../../lib/store/currentGameSlice'
import { ProfileSelector } from './ProfileSelector';
import { BsDownload } from 'react-icons/bs';
import { RiLogoutCircleLine } from 'react-icons/ri';

export const Navbar = () => {
    const game = useAppSelector(selectGame);
    const dispatch = useAppDispatch();

    return (
        <div className=" border-b border-gray-800 sticky bg-black">
                <div className="flex flex-row items-center justify-items-center max-w-7xl mx-auto">
                        <div className=" my-2 mx-4 flex flex-row items-center"><img src="/logo.png" className="my-auto w-8 cursor-pointer" alt="logo" onClick={() => {dispatch(change(undefined));window.location.href = "/"}  } />
                        {game && 
                            <div className='text-xl font-Orbitron pl-2'><span className="px-2 text-red-500">{">"}</span> {game.name}</div>
                        }
                           </div>
                        <div className="space-x-3">
                            {game && 
                                Object.keys(game.tabs).map((gt) => (
                                    <a href="#" className="font-Orbitron text-sm border border-transparent px-3 hover:text-white/70 hover:border hover:border-white/30 py-1 ease-in duration-200 hover:bg-primary/10" onClick={() => dispatch(changeTab(gt))}>{game.tabs[gt]}</a>
                                ))
                            }
                            {!game &&
                                <div className='flex flex-row'>
                                <div>
                                    <a href="/" className="font-Orbitron text-normal  text-white border border-transparent px-3 hover:text-white border border-white/30 py-1 ease-in duration-200 ">Library</a>
                                </div>
                                </div>
                            }
                        </div>
                        <div className="grow"></div>
                                <a className='font-Orbitron text-sm border border-transparent px-3 hover:text-white/70 hover:border hover:border-white/30 py-1 ease-in duration-200 hover:bg-primary/10 cursor-pointer' href='/downloads'>
                                <BsDownload/>
                                </a>
                                <ProfileSelector/>
                                <div className='pr-4 text-xs font-Orbitron hover:text-red-500 hover:cursor-pointer'> <RiLogoutCircleLine/> </div>
                </div>                
        </div>
    );
}
