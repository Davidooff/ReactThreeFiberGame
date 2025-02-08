import { Dispatch, SetStateAction } from "react";
import { ExpData, ExpDataItem, expDefaultData } from "../../../data/exp";

export interface ExpStateUpdate {
  exp: number;
  lvl: number;
  exp_next_lvl?: number; //exist if next lvl exist's
  new_lvl_data?: ExpDataItem;
}

class Exp  {
  exp: number;
  curentLvl: number;
  expData: ExpData = expDefaultData;
  displayExpState: Dispatch<SetStateAction<ExpStateUpdate>>
  constructor(
    exp: number, 
    displayExpState: Dispatch<SetStateAction<ExpStateUpdate>>
  ) {
    this.exp = exp;
    this.displayExpState = displayExpState;
    this.curentLvl = this.getCurentLvl();
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
      exp_next_lvl: this.expData[this.curentLvl + 1]?.exp,
      new_lvl_data: oldLvl !== this.curentLvl ? this.expData[this.curentLvl] : undefined
    })
  }

  getCurentLvl(): number {
    return this.expData.findIndex((item, index) => 
      index === this.expData.length - 1 || 
      this.exp >= item.exp && this.exp < this.expData[index + 1].exp);
  }
}