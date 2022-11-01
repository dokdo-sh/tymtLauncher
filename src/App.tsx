
import { Outlet } from 'react-router-dom';
import { Navbar } from './pages/components/Navbar';
import { Login } from './pages/Login';

function App() {
  const logged = true;

  if (logged) {
    return (
      <div className="h-screen ">
          <Navbar/>
          <Outlet/>
      </div>
    );
  }  else {
    return <Login/>
  }

}

export default App;
