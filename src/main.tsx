import "./reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GamePage from "./pages/game/index.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Menu from "./sections/Menu/index.tsx";
import { PopUpProvider } from "./context/popUpContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PopUpProvider> 
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/game/:isNewGame" element={<GamePage />} />
        </Routes>
      </PopUpProvider>
    </BrowserRouter>
  </StrictMode>
);
