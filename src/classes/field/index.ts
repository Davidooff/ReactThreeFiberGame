import { CellWetnesState, EmptyCell } from "./EmptyCell";
import { PlantedCell } from "./PlantedCell";

enum Dir {
  Up,
  Right,
  Down,
  Left,
}

const FieldRuels: {
  rangeOfTiksBeforeGettingReadyToPlant: [number, number];
  rangeOfTiksBeforeGettingDry: [number, number];
} = {
  rangeOfTiksBeforeGettingReadyToPlant: [5, 10],
  rangeOfTiksBeforeGettingDry: [5, 10],
};

/** Create default EmptyCell */
function createEmptyCell(
  position: [number, number],
  wet: CellWetnesState
): EmptyCell {
  return new EmptyCell(
    FieldRuels.rangeOfTiksBeforeGettingReadyToPlant,
    FieldRuels.rangeOfTiksBeforeGettingDry,
    wet,
    [position[0], position[1]]
  );
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
    field?: Array<EmptyCell | PlantedCell>[]
  ) {
    if (field) {
      this.field = field;
    } else if (size) {
      this.field = Array(size[0]).map((_, i0) =>
        Array(size[1]).map(
          (_, i1) =>
            new EmptyCell(
              FieldRuels.rangeOfTiksBeforeGettingReadyToPlant,
              FieldRuels.rangeOfTiksBeforeGettingDry,
              _,
              [i0, i1]
            )
        )
      );
    } else
      throw Error(
        "U need to give size or field (Array<EmptyCell | PlantedCell>[])"
      );
    this.fieldSize = [this.field.length, this.field[0].length];
  }

  /** changing cell to new EmptyCell */
  _removePlant(position: [number, number]): void {
    this.field[position[0]][position[1]] = createEmptyCell(
      position,
      this.field[position[0]][position[1]].fieldWetnesState
    );
  }

  /** calling processFieldStateTik in each this.field element */
  _processTik() {
    this.field.forEach((fieldRow) =>
      fieldRow.forEach((fieldRowEl) => fieldRowEl.processFieldStateTik())
    );
  }

  /**  chaking is position !(out of this.size) */
  _isItPossiblePosition(position: [number, number]): boolean {
    return (
      position[0] < this.fieldSize[0] &&
      position[1] < this.fieldSize[1] &&
      position[0] > 0 &&
      position[1] > 0
    );
  }

  /** Applying move to this.playerPosition and process tik(if it's not possible throwing error) */
  move(direction: Dir): void {
    let nextPossition = applyDirToPosition(this.playerPosition, direction);
    if (!this._isItPossiblePosition(nextPossition)) {
      throw new Error("Position to move, out of field size range");
    }

    this.playerPosition = nextPossition;
    this._processTik();
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
}
