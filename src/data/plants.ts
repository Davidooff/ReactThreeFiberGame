import { CellWetnesState } from '../classes/game/field/EmptyCell'

// Enum representing different growth stages of a plant
export enum PlantGrowthStage {
  Seed,
  Sprout,
  Mature,
  Harvestable,
}

export type PlantName = 'Cactus' | 'Wheat';

export interface Plant {
  title: PlantName
  growthDuration: number // Total ticks to reach Harvestable stage
  needWetStateToGrow: CellWetnesState.Dry | CellWetnesState.ReadyToPlant
  plantCost: number
  sellPrice: number
}

export const defaultStartPlants: Plant[] = [
  {
    title: 'Cactus',
    growthDuration: 20,
    needWetStateToGrow: CellWetnesState.Dry,
    plantCost: 1,
    sellPrice: 3,
  },
];

const plantsData: Plant[] = [
  {
    title: 'Cactus',
    growthDuration: 20,
    needWetStateToGrow: CellWetnesState.Dry,
    plantCost: 1,
    sellPrice: 3,
  },
  {
    title: 'Wheat',
    growthDuration: 50,
    needWetStateToGrow: CellWetnesState.ReadyToPlant,
    plantCost: 5,
    sellPrice: 40,
  },
]

export type PlantData = {
  model_path: string
  scale: number
  y: number
}

export type PlantModels = {
  [key in PlantName]: {
    [stage in PlantGrowthStage]: PlantData
  }
}

export const plantsModels: PlantModels = {
  "Cactus": {
    [PlantGrowthStage.Seed]: {
      model_path: "/cactus/cactus.glb",
      scale: 1,
      y: 1
    },
    [PlantGrowthStage.Sprout]: {
      model_path: "/cactus/cactus.glb",
      scale: 2,
      y: 1
    },
    [PlantGrowthStage.Mature]: {
      model_path: "/cactus/cactus.glb",
      scale: 3,
      y: 1
    },
    [PlantGrowthStage.Harvestable]: {
      model_path: "/cactus/cactus.glb",
      scale: 4,
      y: 1
    }
  },
  "Wheat": {
    [PlantGrowthStage.Seed]: {
      model_path: "/wheat/scene.gltf",
      scale: 4,
      y: 1
    },
    [PlantGrowthStage.Sprout]: {
      model_path: "/wheat/scene.gltf",
      scale: 6,
      y: 1
    },
    [PlantGrowthStage.Mature]: {
      model_path: "/wheat/scene.gltf",
      scale: 8,
      y: 1
    },
    [PlantGrowthStage.Harvestable]: {
      model_path: " /wheat/scene.gltf",
      scale: 10,
      y: 1
    }
  }
}

export default plantsData
