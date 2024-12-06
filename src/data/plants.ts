import { CellWetnesState } from "../classes/game/field/EmptyCell";

// Enum representing different growth stages of a plant
export enum PlantGrowthStage {
  Seed,
  Sprout,
  Mature,
  Harvestable,
}

export interface Plant {
  title: string;
  growthDuration: number; // Total ticks to reach Harvestable stage
  needWetStateToGrow: CellWetnesState.Dry | CellWetnesState.ReadyToPlant;
  plantCost: number;
  sellPrice: number;
}

const plantsData: Plant[] = [
  {
    title: "Cactus",
    growthDuration: 50,
    needWetStateToGrow: CellWetnesState.Dry,
    plantCost: 1,
    sellPrice: 5,
  },
  {
    title: "Wheat",
    growthDuration: 50,
    needWetStateToGrow: CellWetnesState.ReadyToPlant,
    plantCost: 5,
    sellPrice: 20,
  },
];

export default plantsData;
