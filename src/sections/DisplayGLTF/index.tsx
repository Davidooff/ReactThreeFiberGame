import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PlantData } from "../../data/plants";

interface Props {
  plant: PlantData
}

const Model = (props: Props) => {
  const gltf = useLoader(GLTFLoader, props.plant.model_path);
  return (
    <>
      <primitive object={gltf.scene} scale={props.plant.scale} />
    </>
  );
};

export default Model;