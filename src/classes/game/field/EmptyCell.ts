import getRandomIntInRange from "../../../utils/getRandomIntInRange";

export enum CellWetnesState {
  Dry,
  Wet,
  ReadyToPlant,
}

export interface EmptyCellProp {
  fieldWetnesState: CellWetnesState; // Current state of the field
  tiksUntilChangingWetnesState: number | null; // If null => Field is dry => (fieldWetnesState will not change)
  rangeOfTiksBeforeGettingReadyToPlant: [number, number]; // Possible range for becoming ready to plant
  rangeOfTiksBeforeGettingDry: [number, number]; // Range of tiks for drying;
  cellPostion: [number, number];
}

export class EmptyCell {
  fieldWetnesState: CellWetnesState; // Current state of the field
  tiksUntilChangingWetnesState: number | null; // If null => Field is dry => (fieldWetnesState will not change)
  rangeOfTiksBeforeGettingReadyToPlant: [number, number]; // Possible range for becoming ready to plant
  rangeOfTiksBeforeGettingDry: [number, number]; // Range of tiks for drying;
  cellPostion: [number, number];

  constructor(props: EmptyCellProp) {
    this.rangeOfTiksBeforeGettingReadyToPlant =
      props.rangeOfTiksBeforeGettingReadyToPlant;
    this.rangeOfTiksBeforeGettingDry = props.rangeOfTiksBeforeGettingDry;
    this.fieldWetnesState = props.fieldWetnesState;
    this.cellPostion = props.cellPostion;
    this.tiksUntilChangingWetnesState = props.tiksUntilChangingWetnesState; // If null => Field is dry => (fieldWetnesState will not change)
  }

  processFieldStateTik(): void {
    if (this.tiksUntilChangingWetnesState !== null) {
      switch (this.fieldWetnesState) {
        case CellWetnesState.ReadyToPlant:
          // Decrement tiks until the field becomes dry
          this.tiksUntilChangingWetnesState--;
          if (this.tiksUntilChangingWetnesState === 0) {
            // Transition to Dry state
            this.fieldWetnesState = CellWetnesState.Dry;
            this.tiksUntilChangingWetnesState = null;
          }
          break;

        case CellWetnesState.Wet:
          // Decrement tiks until the field becomes ready to plant
          this.tiksUntilChangingWetnesState--;
          if (this.tiksUntilChangingWetnesState === 0) {
            // Transition to ReadyToPlant state
            this.fieldWetnesState = CellWetnesState.ReadyToPlant;
            this.tiksUntilChangingWetnesState = getRandomIntInRange(
              this.rangeOfTiksBeforeGettingDry
            );
          }
          break;

        case CellWetnesState.Dry:
          throw new Error(
            "Cell state is Dry, but tiksUntilNextState is not null. This is an inconsistent state."
          );

        default:
          throw new Error("Unhandled CellState encountered.");
      }
    }
  }

  waterTheCell = () => {
    if (this.fieldWetnesState !== CellWetnesState.Wet) {
      if (this.fieldWetnesState === CellWetnesState.Dry) {
        this.tiksUntilChangingWetnesState = getRandomIntInRange(
          this.rangeOfTiksBeforeGettingReadyToPlant
        );
        this.fieldWetnesState = CellWetnesState.Wet;
      } else if (this.fieldWetnesState === CellWetnesState.ReadyToPlant) {
        this.tiksUntilChangingWetnesState = getRandomIntInRange(
          this.rangeOfTiksBeforeGettingDry
        );
      }
    }
  };
}
