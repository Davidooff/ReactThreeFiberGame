import { Plant, PlantGrowthStage } from "../../../data/plants";
import { EmptyCell, EmptyCellProp } from "./EmptyCell"; // Adjust the import path as needed

export interface PlantedCellProps extends EmptyCellProp {
  plant: Plant;
}

export function isPlantedCell(
  node: PlantedCellProps | EmptyCellProp
): node is PlantedCellProps {
  return (node as PlantedCell).plant !== undefined;
}

// PlantedCell extends EmptyCell to include planting functionality
export class PlantedCell extends EmptyCell {
  plant: Plant; // The plant planted in this cell
  currentGrowthStage: PlantGrowthStage = PlantGrowthStage.Seed; // Current growth stage
  ticksSincePlanted: number = 0; // Ticks since the plant was planted
  harvestReady: boolean = false; // Indicates if the plant is ready to harvest
  deletPlantFun: (cellPostion: [number, number]) => void;

  constructor(
    props: PlantedCellProps,
    deletPlantCallBack: (cellPostion: [number, number]) => void
  ) {
    super(props);
    this.plant = props.plant;
    this.deletPlantFun = deletPlantCallBack;
  }

  /**
   * Overrides the processFieldStateTik method to include plant growth logic.
   */
  public processFieldStateTik(): void {
    super.processFieldStateTik();
    if (!this.harvestReady) {
      if (this.fieldWetnesState === this.plant.needWetStateToGrow) {
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
      } else {
        this.deletPlantFun(this.cellPostion);
      }
    }
  }
}
