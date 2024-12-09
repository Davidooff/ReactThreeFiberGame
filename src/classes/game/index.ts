import { Plant } from "../../data/plants";
import { myTree } from "../../data/skills";
import { Dir, Field } from "./field";
import { EmptyCell } from "./field/EmptyCell";
import { PlantedCell } from "./field/PlantedCell";
import Skills from "./skills";

const gameRuels = {
  waterCost: 1,
};

class Game {
  money: number = 100;
  field = new Field([10, 10]);
  unlocks = new Skills(myTree);
  playerCode: string = "";
  /** Function(
      move,
      plant,
      "remove",
      "unlock",
      "getPossibleUnlocks",
      "water",
      "getCurentCell",
      "getMonney",
      this.playerCode
    ); */
  playerFunction: Function | null = null;
  constructor() {}

  createUserFunction(): Function {
    return new Function(
      "move",
      "plant",
      "remove",
      "unlock",
      "getPossibleUnlocks",
      "water",
      "getCurentCell",
      "getMonney",
      this.playerCode
    );
  }

  move(direction: Dir) {
    this.field.move(direction);
  }

  plant(plant: Plant) {
    if (this.money >= plant.plantCost) {
      this.money -= plant.plantCost;
      this.field.plant(plant);
    } else {
      throw new Error("Not enugh money");
    }
  }

  removePlant() {
    this.field.deletPlant();
  }

  water() {
    if (this.money >= gameRuels.waterCost) {
      this.money -= gameRuels.waterCost;
      this.field.water();
    } else {
      throw new Error("Not enough money");
    }
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
        this.move,
        this.plant,
        this.removePlant,
        // this.unlock,
        // this.getPossibleUnlocks,
        this.water,
        this.getCurentCell,
        this.getMonney,
        this.playerCode
      );
    else throw new Error("Player function not deffined");
  }

  execute(code: string) {
    if (code != this.playerCode) {
      this.playerCode = code;
      this.playerFunction = this.createUserFunction();
    }
    eval(this.playerCode);
    // this._runFunctionWithClassMethods();
  }
}

export default Game;
