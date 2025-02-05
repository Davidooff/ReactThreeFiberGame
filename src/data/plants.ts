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

const plantsData: Plant[] = [
  {
    title: 'Cactus',
    growthDuration: 50,
    needWetStateToGrow: CellWetnesState.Dry,
    plantCost: 1,
    sellPrice: 5,
  },
  {
    title: 'Wheat',
    growthDuration: 50,
    needWetStateToGrow: CellWetnesState.ReadyToPlant,
    plantCost: 5,
    sellPrice: 20,
  },
]

export type PlantData = {
  model_path: string
  scale: number
}

export type PlantModels = {
  [key in PlantName]: {
    [stage in PlantGrowthStage]: PlantData
  }
}

export const plantsModels: PlantModels = {
  "Cactus": {
    [PlantGrowthStage.Seed]: {
      model_path: "/assets/models/cactus_seed.gltf",
      scale: 0.1
    },
    [PlantGrowthStage.Sprout]: {
      model_path: "/assets/models/cactus_sprout.gltf",
      scale: 0.1
    },
    [PlantGrowthStage.Mature]: {
      model_path: "/assets/models/cactus_mature.gltf",
      scale: 0.1
    },
    [PlantGrowthStage.Harvestable]: {
      model_path: "/assets/models/cactus_harvestable.gltf",
      scale: 0.1
    }
  },
  "Wheat": {
    [PlantGrowthStage.Seed]: {
      model_path: "/wheat/scene.gltf",
      scale: 4
    },
    [PlantGrowthStage.Sprout]: {
      model_path: "/wheat/scene.gltf",
      scale: 6
    },
    [PlantGrowthStage.Mature]: {
      model_path: "/wheat/scene.gltf",
      scale: 8
    },
    [PlantGrowthStage.Harvestable]: {
      model_path: " /wheat/scene.gltf",
      scale: 10
    }
  }
}

export default plantsData
