import { Dispatch, SetStateAction } from "react";
import { ExpData, expDefaultData } from "../../../data/exp";
import { PopUpData } from "../../../sections/PopUp";

export interface ExpStateUpdate {
  exp: number;
  lvl: number;
  exp_this_lvl: number;
  exp_next_lvl?: number; //exist if next lvl exist's
}

// u can see that in alot of places im doing -1 to curentLvl, bks we are counting 0 as nothing open and 1 as 0 el of expData

export default class Exp  {
  exp: number;
  curentLvl: number;
  expData: ExpData = expDefaultData;
  displayExpState: Dispatch<SetStateAction<ExpStateUpdate>>
  addPopUp: Dispatch<SetStateAction<PopUpData | null>>;
  constructor(
    exp: number, 
    addPopUp: Dispatch<SetStateAction<PopUpData | null>>,
    displayExpState: Dispatch<SetStateAction<ExpStateUpdate>>
  ) {
    this.exp = exp;
    this.curentLvl = this.getCurentLvl();
    this.displayExpState = displayExpState;
    this.updateState(this.curentLvl);
    this.addPopUp = addPopUp;
  }

  addExp(exp: number): void {
    this.exp += exp;
    let oldLvl = this.curentLvl;
    this.curentLvl = this.getCurentLvl();
    this.updateState(oldLvl)
  }

  updateState(oldLvl: number): void {
    this.displayExpState({
      exp: this.exp,
      lvl: this.curentLvl,
      exp_this_lvl: this.expData[this.curentLvl-1]?.exp || 0,
      exp_next_lvl: this.expData[this.curentLvl]?.exp,
    })

    if (oldLvl !== this.curentLvl) {
      this.addPopUp(this.expData[this.curentLvl-1]);
    }
  }

  getCurentLvl(): number {
    for (let i = this.expData.length - 1; i >= 0; i--) {
      if (this.exp >= this.expData[i].exp) {
        return i+1;
      }
    }
    return 0;
  }
}