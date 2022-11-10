
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import TymtCore from './lib/core/TymtCore';
import { getSession, Session } from './lib/store/sessionSlice';
import { Loading } from './pages/components/Loading';
import { Navbar } from './pages/components/Navbar';
import { SessionView } from './pages/SessionView';
import { appWindow } from '@tauri-apps/api/window'

function App() {
  const session : Session = useAppSelector(getSession);
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    TymtCore.Launcher.Settings.init().then(() => setLoading(false))
      }, [])


  if (loading) {
    return <Loading/>
  } else {
    return (
      <div className="h-screen ">
      {session.logged && <Navbar/>}
      {session.logged && <Outlet/>}
      {!session.logged && <SessionView/>}
  </div>
    )
  }

}

export default App;
