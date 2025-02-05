import { Plant } from "../../data/plants";
import { MySkillData, myTree, SkillTree } from "../../data/skills";
import { Dir, Field } from "./field";
import { CellWetnesState, EmptyCell } from "./field/EmptyCell";
import { isPlantedCell, PlantedCell } from "./field/PlantedCell";
import Skills from "./skills";

const gameRuels = {
  waterCost: 1,
};

const defaultStartPlants: Plant[] = [
  {
    title: "Wheat",
    growthDuration: 20,
    needWetStateToGrow: CellWetnesState.Dry,
    plantCost: 1,
    sellPrice: 5,
  },
];

export interface SaveData {
  money: number;
  unlockedPlants: Plant[];
  fieldData: Array<EmptyCell | PlantedCell>[];
  playerPosition: [number, number];
  skillTree: SkillTree<MySkillData>;
}

class Game {
  money: number = 100;
  field = new Field([10, 10]);
  unlocks = new Skills(myTree);
  unlockedPlants: Plant[] = defaultStartPlants;
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
  constructor(save?: SaveData) {
    if (save) {
      this.money = save.money;
      this.field = new Field([0, 0], save.fieldData);
      this.unlocks = new Skills(save.skillTree);
      this.field.playerPosition = save.playerPosition;
      this.unlockedPlants = save.unlockedPlants;
    }
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
    if (this.money >= gameRuels.waterCost) {
      this.money -= gameRuels.waterCost;
      this.field.water();
    } else {
      throw new Error("Not enough money");
    }
  }

  unlockSkill(title: string) {
    const tryingToUnlock = this.unlocks
      .getPossibleToUnlock()
      ?.find((el) => el.title === title);

    if (!tryingToUnlock) {
      throw new Error("Skill not found or can't be unlocked");
    }
    if (tryingToUnlock.cost > this.money) {
      throw new Error("Not enough money");
    }

    this.unlocks.setUnlockedByKey({ title }, true, true);
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
    // return new Function(
    //   "move",
    //   "plant",
    //   "harvest",
    //   "remove",
    //   "unlockSkill",
    //   "getPossibleSkills",
    //   "unlockedSkills",
    //   "water",
    //   "getCurentCell",
    //   "getMonney",
    //   this.playerCode
    // );
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
    };
  }
}

export default Game;
