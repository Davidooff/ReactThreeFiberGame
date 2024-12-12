import "./reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GamePage from "./pages/game/index.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <GamePage />
  //  </StrictMode>
);
