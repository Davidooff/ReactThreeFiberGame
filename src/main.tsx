import "./reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GamePage from "./pages/game/index.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Menu from "./sections/Menu/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game/:isNewGame" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
