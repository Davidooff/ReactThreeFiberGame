import { Canvas } from "@react-three/fiber";
import convert2dPossition from "../../utils/convert2dPossition";
import CameraSetup from "../DisplayField/CameraSetUp";
import DisplayPlayer from "../DisplayField/DisplayPlayer";

interface Props {
  walls: boolean[][];
  playerPosition: [number, number];
}

function DisplayMaze(props: Props) {
  const size: [number, number] = [(props.walls.length - 1) / 2, props.walls[0].length];
  const floor = Array.from({ length: size[0] }, (_, i) =>
    Array.from({ length: size[1] }, (_, j) => (
      <mesh key={`floor-${i}-${j}`} position={convert2dPossition([i, j])}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
    ))
  );

  console.log("Player position ", props.playerPosition);

  return (
     <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-5, 5, -5]} color="white" />'
        <CameraSetup />
        {floor}
        {props.walls.map((row, x) =>
          row.map((wall, y) => {
            const position = convert2dPossition([x / 2 - 0.5, x % 2 === 0 ? y : y - 0.5], 0.2);
            return wall && (
              <mesh position={position}>
                <boxGeometry args={[0.2 + (x % 2 * 0.8), 0.8,  1 - (x % 2 * 0.8)]} />
                <meshStandardMaterial
                  color={"black"}
                />
              </mesh>
            )
          })
        )}
        {DisplayPlayer({ playerPosition: props.playerPosition })}
      </Canvas>
  )
}

export default DisplayMaze