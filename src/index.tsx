import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './css/App.css'
import App from './App';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom'
import { District53 } from './games/district53/District53';
import { Home } from './pages/HomeView';
import { WalletView } from './pages/WalletView';
import { Receive } from './pages/wallet/Receive';
import { Send } from './pages/wallet/Send';
import { Downloads } from './pages/Downloads';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} >
              <Route path="games/district53" element={<District53 />} />
              <Route path="wallet" element={<WalletView />} />
              <Route path="wallet/receive" element={<Receive />} />
              <Route path="wallet/send" element={<Send />} />
              <Route path="downloads" element={<Downloads />} />
              <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);