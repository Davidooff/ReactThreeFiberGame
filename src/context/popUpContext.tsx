import { createContext, useContext, useState, ReactNode } from "react";
import PopUp, { PopUpData } from "../sections/PopUp";

interface PopUpContextType {
  newPopUp: PopUpData | null;
  setNewPopUp: React.Dispatch<React.SetStateAction<PopUpData | null>>;
}

const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const PopUpProvider = ({ children }: { children: ReactNode }) => {
  const [newPopUp, setNewPopUp] = useState<PopUpData | null>(null);

  return (
    <PopUpContext.Provider value={{ newPopUp, setNewPopUp }}>
      {children}
      <PopUp newPopUpData={newPopUp} setNewPopUp={setNewPopUp} timeToWait={5000} />
    </PopUpContext.Provider>
  );
};

export const usePopUpContext = (): PopUpContextType => {
  const context = useContext(PopUpContext as React.Context<PopUpContextType>);
  if (!context) {
    throw new Error("usePopUpContext must be used within a PopUpProvider");
  }
  return context;
};