import { Vector3 } from "three";

function convert2dPossition(position: [number, number], height: number = 0) {
  return new Vector3(position[0], height, position[1]);
}

export default convert2dPossition;
