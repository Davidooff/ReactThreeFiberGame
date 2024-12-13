import { Plant } from "../../../data/plants";
import { CellWetnesState, EmptyCell } from "./EmptyCell";
import { isPlantedCell, PlantedCell } from "./PlantedCell";

export enum Dir {
  Up,
  Right,
  Down,
  Left,
}

const EmptyCellRuels: {
  // fieldWetnesState: CellWetnesState; // Current state of the field
  tiksUntilChangingWetnesState: number | null; // If null => Field is dry => (fieldWetnesState will not change)
  rangeOfTiksBeforeGettingReadyToPlant: [number, number]; // Possible range for becoming ready to plant
  rangeOfTiksBeforeGettingDry: [number, number]; // Range of tiks for drying;
} = {
  tiksUntilChangingWetnesState: null,
  rangeOfTiksBeforeGettingReadyToPlant: [5, 10],
  rangeOfTiksBeforeGettingDry: [5, 10],
};

/** Create default EmptyCell */
function createEmptyCell(
  position: [number, number],
  wet: CellWetnesState
): EmptyCell {
  return new EmptyCell({
    ...EmptyCellRuels,
    cellPostion: position,
    fieldWetnesState: wet,
  });
}
/** Applying position and chacking is x/y !< 0 */
function applyDirToPosition(
  currentPosition: [number, number],
  dir: Dir
): [number, number] {
  let nextPossition: [number, number];
  switch (dir) {
    case Dir.Up:
      nextPossition = [currentPosition[0] + 1, currentPosition[1]];
      break;
    case Dir.Right:
      nextPossition = [currentPosition[0], currentPosition[1] + 1];
      break;
    case Dir.Down:
      nextPossition = [currentPosition[0] - 1, currentPosition[1]];
      break;
    case Dir.Left:
      nextPossition = [currentPosition[0], currentPosition[1] - 1];
      break;
    default:
      throw new Error("No such dir");
  }

  if ((nextPossition[0] < 0, nextPossition[1] < 0)) {
    throw new Error("Position x/y can't be < 0");
  }

  return nextPossition;
}
[];

export class Field {
  field: Array<EmptyCell | PlantedCell>[];
  fieldSize: [number, number];
  playerPosition: [number, number] = [0, 0];

  /** Creates a new Field instance (U can send just one of params), other one will be calculated. */
  constructor(
    size?: [number, number],
    field?: Array<EmptyCell | PlantedCell>[],
    playerPosition: [number, number] = [0, 0]
  ) {
    if (field) {
      this.field = field.map((row) =>
        row.map((el) => {
          if (isPlantedCell(el)) {
            return new PlantedCell(el, this.deletPlant);
          } else {
            return new EmptyCell(el);
          }
        })
      );
    } else if (size) {
      this.field = Array.from({ length: size[0] }, (_, i0) =>
        Array.from({ length: size[1] }, (_, i1) =>
          createEmptyCell([i0, i1], CellWetnesState.Dry)
        )
      );
      console.log(this.field);
    } else
      throw Error(
        "U need to give size or field (Array<EmptyCell | PlantedCell>[])"
      );
    this.fieldSize = [this.field.length, this.field[0].length];
    this.playerPosition = playerPosition;
  }

  /** changing cell to new EmptyCell */
  _removePlant(position: [number, number]): void {
    this.field[position[0]][position[1]] = createEmptyCell(
      position,
      this.field[position[0]][position[1]].fieldWetnesState
    );
  }

  /** calling processFieldStateTik in each this.field element */
  processTik() {
    console.log(this.field);

    this.field.forEach((fieldRow) =>
      fieldRow.forEach((fieldRowEl) => {
        console.log(fieldRowEl);

        fieldRowEl.processFieldStateTik();
      })
    );
  }

  /**  chaking is position !(out of this.size) */
  _isItPossiblePosition(position: [number, number]): boolean {
    return (
      position[0] < this.fieldSize[0] &&
      position[1] < this.fieldSize[1] &&
      position[0] >= 0 &&
      position[1] >= 0
    );
  }

  /** Applying move to this.playerPosition and process tik(if it's not possible throwing error) */
  move(direction: Dir): void {
    let nextPossition = applyDirToPosition(this.playerPosition, direction);
    if (!this._isItPossiblePosition(nextPossition)) {
      throw new Error(
        "Position to move, out of field size range" +
          nextPossition +
          this.fieldSize +
          this._isItPossiblePosition(nextPossition)
      );
    }

    this.playerPosition = nextPossition;
    this.processTik();
  }

  /** returning amount of monney made by harvesting courent field, changing courent cell to EmptyCell (Err !possible) */
  harvest(): number {
    let playerPossitionedCell =
      this.field[this.playerPosition[0]][this.playerPosition[1]];

    if (!(playerPossitionedCell instanceof PlantedCell)) {
      throw new Error("Cell is not planted, u can't harvest empty cell");
    }

    if (!playerPossitionedCell.harvestReady) {
      throw new Error("Plant is not redy to harvest");
    }

    let monneyToAdd = playerPossitionedCell.plant.sellPrice;

    this.field[this.playerPosition[0]][this.playerPosition[1]] =
      createEmptyCell(
        playerPossitionedCell.cellPostion,
        playerPossitionedCell.fieldWetnesState
      );

    return monneyToAdd;
  }

  water() {
    this.field[this.playerPosition[0]][this.playerPosition[1]].waterTheCell();
  }

  deletPlant(position: [number, number] = this.playerPosition) {
    const [x, y] = position;
    const fieldEl = this.field[x][y];
    this.field[x][y] = new EmptyCell({
      fieldWetnesState: fieldEl.fieldWetnesState,
      tiksUntilChangingWetnesState: fieldEl.tiksUntilChangingWetnesState,
      rangeOfTiksBeforeGettingReadyToPlant:
        EmptyCellRuels.rangeOfTiksBeforeGettingReadyToPlant,
      rangeOfTiksBeforeGettingDry: EmptyCellRuels.rangeOfTiksBeforeGettingDry,
      cellPostion: position,
    });
  }

  plant(plant: Plant) {
    const [x, y] = this.playerPosition;
    if (this.field[x][y] instanceof PlantedCell) {
      throw new Error("Cell is not empty, can't plant");
    }

    this.field[x][y] = new PlantedCell(
      {
        rangeOfTiksBeforeGettingReadyToPlant:
          EmptyCellRuels.rangeOfTiksBeforeGettingReadyToPlant,
        rangeOfTiksBeforeGettingDry: EmptyCellRuels.rangeOfTiksBeforeGettingDry,
        cellPostion: [x, y],
        fieldWetnesState: this.field[x][y].fieldWetnesState,
        plant,
        tiksUntilChangingWetnesState:
          this.field[x][y].tiksUntilChangingWetnesState,
      },
      this.deletPlant
    );
  }
}
