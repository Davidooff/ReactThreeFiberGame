import { EmptyCell, CellWetnesState } from "./EmptyCell"; // Adjust the import path as needed

// Enum representing different growth stages of a plant
export enum PlantGrowthStage {
  Seed,
  Sprout,
  Mature,
  Harvestable,
}

// Interface for plant types (extend as needed)
export interface Plant {
  name: string;
  growthDuration: number; // Total ticks to reach Harvestable stage
  needWetStateToGrow: CellWetnesState.Dry | CellWetnesState.ReadyToPlant;
}

// PlantedCell extends EmptyCell to include planting functionality
export class PlantedCell extends EmptyCell {
  plant: Plant; // The plant planted in this cell
  currentGrowthStage: PlantGrowthStage = PlantGrowthStage.Seed; // Current growth stage
  ticksSincePlanted: number = 0; // Ticks since the plant was planted
  harvestReady: boolean = false; // Indicates if the plant is ready to harvest

  constructor(
    rangeOfTiksBeforeGettingReadyToPlant: [number, number],
    rangeOfTiksBeforeGettingDry: [number, number],
    cellPostion: [number, number],
    fieldWetnesState: CellWetnesState,
    // Extenshion
    plant: Plant
  ) {
    super(
      rangeOfTiksBeforeGettingReadyToPlant,
      rangeOfTiksBeforeGettingDry,
      fieldWetnesState,
      cellPostion
    );
    this.plant = plant;
  }

  /**
   * Overrides the processFieldStateTik method to include plant growth logic.
   */
  processFieldStateTik(): void {
    super.processFieldStateTik();

    if (
      this.fieldWetnesState === this.plant.needWetStateToGrow &&
      !this.harvestReady
    ) {
      this.ticksSincePlanted++;

      // Determine the growth stage based on ticksSincePlanted
      const growthRatio = this.ticksSincePlanted / this.plant.growthDuration;

      if (growthRatio >= 1) {
        this.currentGrowthStage = PlantGrowthStage.Harvestable;
        this.harvestReady = true;
      } else if (growthRatio >= 0.75) {
        this.currentGrowthStage = PlantGrowthStage.Mature;
      } else if (growthRatio >= 0.5) {
        this.currentGrowthStage = PlantGrowthStage.Sprout;
      } else {
        this.currentGrowthStage = PlantGrowthStage.Seed;
      }
    }
  }

  /**
   * Harvests the plant if it's ready.
   */
  harvestPlant(): boolean {
    if (this.harvestReady) {
      console.log(`Harvested ${this.plant.name} from the cell.`);
      return true;
    } else {
      return false;
    }
  }
}
