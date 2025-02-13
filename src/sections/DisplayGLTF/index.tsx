import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import plantsData, { PlantData, PlantGrowthStage, PlantName, plantsModels } from "../../data/plants";
import { useGLTF } from '@react-three/drei'
interface Props {
  plantName: PlantName;
  plantStage: PlantGrowthStage;
  position: [number, number];
}

const Model = (props: Props) => {
  let plantModel = plantsModels[props.plantName][props.plantStage]
  const gltf = useLoader(GLTFLoader, plantModel.model_path);
  return (
    <>
      <primitive object={gltf.scene.clone()} scale={plantModel.scale} position={[props.position[0], 0, props.position[1]]} />
    </>
  );
};

export default Model;

Object.keys(plantsModels).forEach((plantName) => {
  // length / 2 bks for enum object Object.keys returning also the values of the enum
  for (let i = 0; i < Object.keys(PlantGrowthStage).length / 2; i++) 
    useGLTF.preload(plantsModels[plantName as PlantName][PlantGrowthStage.Seed].model_path)
})