import { useMemo } from "react";
import { EmptyCell } from "../../classes/field/EmptyCell";
import { PlantedCell } from "../../classes/field/PlantedCell";
import convert2dPossition from "../../utils/convert2dPossition";

interface Props {
  fieldCell: EmptyCell | PlantedCell;
}

const stateColors = ["brown", "blue", "green"];

function DisplayCell(props: Props) {
  return (
    <mesh position={convert2dPossition(props.fieldCell.cellPostion)}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color={stateColors[props.fieldCell.fieldWetnesState]}
      />
    </mesh>
  );
}

export default DisplayCell;
