import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Field } from "../../classes/game/field";
import { EmptyCell } from "../../classes/game/field/EmptyCell";
import { PlantedCell } from "../../classes/game/field/PlantedCell";
import DisplayCell from "./DisplayCell";
import "./field.css";
import CameraSetup from "./CameraSetUp";
import DisplayPlayer from "./DisplayPlayer";

function DisplayField() {
  const fieldRef = useRef<Field>();
  const [isExecuting, setIsExecuting] = useState<boolean>();
  const [fieldData, setFieldData] = useState<Array<EmptyCell | PlantedCell>[]>(
    []
  );

  useEffect(() => {
    // Initialize the Field instance once
    fieldRef.current = new Field([10, 10]);

    // Set initial field data
    setFieldData(fieldRef.current.field);
  }, []);

  useEffect(() => {
    console.log(isExecuting);
    let intervalId: number = 0;
    if (isExecuting) {
      intervalId = setInterval(() => {
        if (fieldRef.current) {
          fieldRef.current.processTik();
          setFieldData({ ...fieldRef.current.field });
        }
      }, 1000);

      console.log(isExecuting, intervalId);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => clearInterval(intervalId);
  }, [isExecuting]);

  const fieldComponents = useMemo(() => {
    return fieldData.flatMap((row, x) =>
      row.map((fieldCell, y) => (
        <DisplayCell key={`cell-${x}-${y}`} fieldCell={fieldCell} />
      ))
    );
  }, [fieldData]);

  const playerComponent = useMemo(() => {
    if (fieldRef.current) {
      return DisplayPlayer({ playerPosition: fieldRef.current.playerPosition });
    }
    return <></>;
  }, [fieldData]);

  return (
    <div id="CanvasDiv">
      <Canvas>
        <CameraSetup />
        <ambientLight intensity={0.6} />
        <directionalLight position={[-5, 5, -5]} color="white" />
        {fieldComponents}
        {playerComponent}
      </Canvas>
    </div>
  );
}

export default DisplayField;
