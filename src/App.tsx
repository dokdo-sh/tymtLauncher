
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import TymtCore from './lib/core/TymtCore';
import { getSession, Session } from './lib/store/sessionSlice';
import { Loading } from './pages/components/Loading';
import { Navbar } from './pages/components/Navbar';
import { SessionView } from './pages/SessionView';
import { appWindow } from '@tauri-apps/api/window'
import { getAppState, setAppState } from './lib/store/appSlice';

function App() {
  const session : Session = useAppSelector(getSession);
  const bg = useAppSelector(getAppState)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    TymtCore.Launcher.Settings.init().then(() => setLoading(false))
    
      }, [])

      useEffect(() => {
        if (window.location.pathname != "/games/district53" && window.location.pathname != "/library/district53") {    dispatch(setAppState("linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/backgrounds/tymt.jpg') no-repeat"))
      }
      }, [window.location.pathname])

  if (loading) {
    return <Loading/>
  } else {
    return (
      <div className='h-screen' style={{
        backgroundRepeat: 'no-repeat',
        background: `${bg}`,
        backgroundSize: "cover",
      }}>
        <div className="h-screen bg-gradient-to-b from-transparent to-[#080808] " 
>
      {session.logged && <Navbar/>}
      {session.logged && <Outlet/>}
      {!session.logged && <SessionView/>}
  </div>
      </div>
    )
  }

}

export default App;

