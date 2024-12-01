import getRandomIntInRange from "../../utils/getRandomIntInRange";

enum CellState {
  Dry,
  Wet,
  ReadyToPlant,
}

export class EmptyCell {
  fieldState: CellState; // Current state of the field
  ticksUntilNextState: number | null = null;
  rangeOfTicksBeforeGettingReady: [number, number]; // Possible range for becoming ready to plant
  rangeOfTicksBeforeGettingDry: [number, number]; // Range for drying; null if it can't dry

  constructor(
    rangeOfTicksBeforeGettingReady: [number, number],
    rangeOfTicksBeforeGettingDry: [number, number],
    fieldState: CellState = CellState.Dry
  ) {
    this.rangeOfTicksBeforeGettingReady = rangeOfTicksBeforeGettingReady;
    this.rangeOfTicksBeforeGettingDry = rangeOfTicksBeforeGettingDry;
    this.fieldState = fieldState;
  }

  processFieldStateTick = (): void => {
    if (this.ticksUntilNextState !== null) {
      switch (this.fieldState) {
        case CellState.ReadyToPlant:
          // Decrement ticks until the field becomes dry
          this.ticksUntilNextState--;
          if (this.ticksUntilNextState === 0) {
            // Transition to Dry state
            this.fieldState = CellState.Dry;
            this.ticksUntilNextState = null;
          }
          break;

        case CellState.Wet:
          // Decrement ticks until the field becomes ready to plant
          this.ticksUntilNextState--;
          if (this.ticksUntilNextState === 0) {
            // Transition to ReadyToPlant state
            this.fieldState = CellState.ReadyToPlant;
            this.ticksUntilNextState = getRandomIntInRange(
              this.rangeOfTicksBeforeGettingDry
            );
          }
          break;

        case CellState.Dry:
          throw new Error(
            "Cell state is Dry, but ticksUntilNextState is not null. This is an inconsistent state."
          );

        default:
          throw new Error("Unhandled CellState encountered.");
      }
    }
  };

  waterTheCell = () => {
    if (this.fieldState !== CellState.Wet) {
      if (this.fieldState === CellState.Dry) {
        this.ticksUntilNextState = getRandomIntInRange(
          this.rangeOfTicksBeforeGettingReady
        );
        this.fieldState = CellState.Wet;
      } else if (this.fieldState === CellState.ReadyToPlant) {
        this.ticksUntilNextState = getRandomIntInRange(
          this.rangeOfTicksBeforeGettingDry
        );
      }
    }
  };
}
