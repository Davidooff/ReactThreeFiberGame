import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import plantsData, { PlantData, PlantGrowthStage, PlantName, plantsModels } from "../../data/plants";

interface Props {
  plantName: PlantName;
  plantStage: PlantGrowthStage;
}

const Model = (props: Props) => {
  let plantModel = plantsModels[props.plantName][props.plantStage]
  const gltf = useLoader(GLTFLoader, plantModel.model_path) as any as { scene: any };
  return (
    <>
      <primitive object={gltf.scene} scale={plantModel.scale} />
    </>
  );
};

export default Model;