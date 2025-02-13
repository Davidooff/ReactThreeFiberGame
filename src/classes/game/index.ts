import { Dispatch, SetStateAction } from "react";
import { defaultStartPlants, Plant } from "../../data/plants";
import { MySkillData, myTree, SkillTree } from "../../data/skills";
import Exp, { ExpStateUpdate } from "./exp";
import { Dir, Field } from "./field";
import { EmptyCell } from "./field/EmptyCell";
import { isPlantedCell, PlantedCell } from "./field/PlantedCell";
import Skills from "./skills";
import { PopUpData } from "../../sections/PopUp";

export interface SaveData {
  money: number;
  unlockedPlants: Plant[];
  fieldData: Array<EmptyCell | PlantedCell>[];
  playerPosition: [number, number];
  skillTree: SkillTree<MySkillData>;
  exp: number
  waterCost: number
}

class Game {
  money: number = 1000;
  waterCost: number = 5;
  field = new Field([10, 10]);
  unlocks = new Skills<MySkillData>(myTree);
  unlockedPlants: Plant[] = defaultStartPlants;
  expUnlocks: Exp;
  playerCode: string = "";
  playerFunction: Function | null = null;
  constructor(addPopUp: Dispatch<SetStateAction<PopUpData | null>>, expUnlockState: Dispatch<SetStateAction<ExpStateUpdate>>, save?: SaveData) {
    if (save) {
      this.money = save.money;
      this.field = new Field([0, 0], save.fieldData);
      this.unlocks = new Skills(save.skillTree);
      this.field.playerPosition = save.playerPosition;
      this.unlockedPlants = save.unlockedPlants;
      this.waterCost = save.waterCost
    }
    this.expUnlocks = new Exp(save?.exp || 0, addPopUp, expUnlockState);
  }

  createUserFunction(): Function {
    return new Function(
      "move",
      "plant",
      "harvest",
      "remove",
      "unlockSkill",
      "getPossibleSkills",
      "unlockedSkills",
      "water",
      "getCurentCell",
      "getMonney",
      this.playerCode
    );
  }

  move(direction: Dir) {
    this.field.move(direction);
  }

  plant(title: string) {
    let plant = this.unlockedPlants.find((el) => el.title === title);
    if (!plant) {
      throw new Error("Plant not found");
    }

    if (!(this.money >= plant.plantCost)) {
      throw new Error("Not enugh money");
    }

    this.money -= plant.plantCost;
    this.field.plant(plant);
  }

  removePlant() {
    this.field.deletPlant();
  }

  water() {
    if (this.money >= this.waterCost) {
      this.money -= this.waterCost;
      this.field.water();
      this.expUnlocks.addExp(20);
    } else {
      throw new Error("Not enough money");
    }
  }

  unlockSkill(title: string) {
    console.log(this.unlocks
      .getPossibleToUnlock());
    console.log(title);
    const tryingToUnlock = this.unlocks
      .getPossibleToUnlock()
      ?.find((el) => el.title === title);

      console.log(tryingToUnlock);
    if (!tryingToUnlock) {
      throw new Error("Skill not found or can't be unlocked");
    }
    if (tryingToUnlock.cost > this.money) {
      throw new Error("Not enough money");
    }

    this.unlocks.setUnlockedByKey({ title }, true, true);
    const gameInstance = this; // Capture reference
    tryingToUnlock.unlock(gameInstance);
    this.money -= tryingToUnlock.cost;
  }


  getPossibleToUnlock() {
    return this.unlocks.getPossibleToUnlock();
  }

  harvest() {
    const [x, y] = this.field.playerPosition;
    const currentCell = this.field.field[x][y];
    if (!isPlantedCell(currentCell)) {
      throw new Error("U need to stand on planted cell");
    }

    if (!currentCell.harvestReady) {
      throw new Error("Harvest is not ready");
    }

    this.money += currentCell.plant.plantCost;
    this.field.deletPlant([x, y]);
  }

  getCurentCell(): EmptyCell | PlantedCell {
    const [x, y] = this.field.playerPosition;
    return this.field.field[x][y];
  }

  getMonney(): number {
    return this.money;
  }

  _runFunctionWithClassMethods() {
    if (this.playerFunction)
      this.playerFunction(
        this.move.bind(this),
        this.plant.bind(this),
        this.harvest.bind(this),
        this.removePlant.bind(this),
        this.unlockSkill.bind(this),
        this.getPossibleToUnlock.bind(this),
        this.getPossibleToUnlock.bind(this),
        this.water.bind(this),
        this.getCurentCell.bind(this),
        this.getMonney.bind(this),
        this.playerCode
      );
    else throw new Error("Player function not deffined");
  }

  execute(code: string) {
    if (code != this.playerCode) {
      this.playerCode = code;
      this.playerFunction = this.createUserFunction();
    }
    // eval(this.playerCode);
    this._runFunctionWithClassMethods();
  }

  getSave(): SaveData {
    return {
      money: this.money,
      unlockedPlants: this.unlockedPlants,
      fieldData: this.field.field,
      playerPosition: this.field.playerPosition,
      skillTree: this.unlocks.skillTree,
      exp: this.expUnlocks.exp,
      waterCost: this.waterCost
    };
  }
}

export default Game;
