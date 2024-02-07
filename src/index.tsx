import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./css/App.css";
import App from "./App";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { District53 } from "./games/district53/District53";
import { Catalog } from "./pages/Catalog";
import { WalletView } from "./pages/WalletView";
import { Receive } from "./pages/wallet/Receive";
import { Send } from "./pages/wallet/Send";
import { Downloads } from "./pages/Downloads";
import { SessionView } from "./pages/SessionView";
import { GamePage } from "./games/GamePage";
import { Library } from "./pages/Library";
import { Staking } from "./pages/wallet/Staking";
import { Chat } from "./pages/Chat";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<App />}>
            <Route path="library" element={<Library />} />
            <Route path="library/district53" element={<District53 />} />
            <Route path="games/*" element={<GamePage />} />
            <Route path="wallet" element={<WalletView />} />
            <Route path="wallet/receive" element={<Receive />} />
            <Route path="wallet/send" element={<Send />} />
            <Route path="wallet/staking" element={<Staking />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="session" element={<SessionView />} />
            <Route path="/" element={<Catalog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
