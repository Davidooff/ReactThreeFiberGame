import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Field } from "../../classes/game/field";
import { EmptyCell } from "../../classes/game/field/EmptyCell";
import { PlantedCell } from "../../classes/game/field/PlantedCell";
import DisplayCell from "./DisplayCell";
import "./field.css";
import CameraSetup from "./CameraSetUp";
import DisplayPlayer from "./DisplayPlayer";

interface Props {
  fieldData: Array<EmptyCell | PlantedCell>[];
  playerPosition: [number, number];
}

function DisplayField(props: Props) {
  console.log("Field Data: ", props.fieldData);
  console.log("Possition: ", props.playerPosition);

  return (
    <div id="CanvasDiv">
      <Canvas>
        <CameraSetup />
        <ambientLight intensity={0.6} />
        <directionalLight position={[-5, 5, -5]} color="white" />
        {props.fieldData.flatMap((row, x) =>
          row.map((fieldCell, y) => (
            <DisplayCell key={`cell-${x}-${y}`} fieldCell={fieldCell} />
          ))
        )}
        {DisplayPlayer({ playerPosition: props.playerPosition })}
      </Canvas>
    </div>
  );
}

export default DisplayField;
