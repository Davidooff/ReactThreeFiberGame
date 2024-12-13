import { EmptyCell } from "../../classes/game/field/EmptyCell";
import {
  isPlantedCell,
  PlantedCell,
} from "../../classes/game/field/PlantedCell";
import convert2dPossition from "../../utils/convert2dPossition";

interface Props {
  fieldCell: EmptyCell | PlantedCell;
}

const stateColors = ["brown", "blue", "green"];

function DisplayCell(props: Props) {
  return (
    <>
      <mesh position={convert2dPossition(props.fieldCell.cellPostion)}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={stateColors[props.fieldCell.fieldWetnesState]}
        />
      </mesh>
      {isPlantedCell(props.fieldCell) && (
        <mesh position={convert2dPossition(props.fieldCell.cellPostion, 0.6)}>
          <boxGeometry args={[0.1, 0.4, 0, 1]} />
          <meshStandardMaterial color={"purple"} />
        </mesh>
      )}
    </>
  );
}

export default DisplayCell;
