
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import TymtCore from './lib/core/TymtCore';
import { getSession, Session } from './lib/store/sessionSlice';
import { Loading } from './pages/components/Loading';
import { Navbar } from './pages/components/Navbar';
import { SessionView } from './pages/SessionView';
import { getAppState, setAppState } from './lib/store/appSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const session : Session = useAppSelector(getSession);
    const bg = useAppSelector(getAppState)
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(true)

    const gradients : {[key:string] : string}  = {
        "/library/district53": "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/backgrounds/district53/background.png') no-repeat",
        "/games/district53":"linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/backgrounds/district53/background.png') no-repeat",
        "/wallet/staking": "linear-gradient(rgb(246, 74, 40,.3), rgba(255,255,255,1))",
        "all":"#101010"
    }

    useEffect(() => {
        TymtCore.Launcher.Settings.init().then(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (gradients[window.location.pathname]) {
            dispatch(setAppState(gradients[window.location.pathname]))
        } else {
            dispatch(setAppState(gradients.all))
        }
        //   if (window.location.pathname != "/games/district53" && window.location.pathname != "/library/district53") {    dispatch(setAppState("linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.9)), url('/backgrounds/tymt.jpg') no-repeat"))
        // }
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
                <div className="h-screen bg-gradient-to-b from-transparent to-[#080808] ">
                    {session.logged && <Navbar/>}
                    {session.logged && <Outlet/>}
                    {!session.logged && <SessionView/>}
                    <ToastContainer theme="dark" position='bottom-right' toastStyle={{background: '#080808'}} progressStyle={{background: '#52e1f2'}}/>
                </div>
            </div>
        )
  }

}

export default App;

