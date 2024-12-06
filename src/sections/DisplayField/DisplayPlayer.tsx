import convert2dPossition from "../../utils/convert2dPossition";

interface Props {
  playerPosition: [number, number];
}

function DisplayPlayer(props: Props) {
  return (
    <mesh position={convert2dPossition(props.playerPosition, 0.8)}>
      <boxGeometry args={[0.2, 0.8, 0.2]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

export default DisplayPlayer;
