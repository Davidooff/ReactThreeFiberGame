import { useLoader } from '@react-three/fiber';
import { PlantGrowthStage, plantsModels, type PlantName } from '../data/plants';
import type { Group, Object3DEventMap } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export interface LoadModelPros {
  model_name: PlantName;
  growthStage: PlantGrowthStage;
}

const loadModel = async (modelData: LoadModelPros): Promise<Group<Object3DEventMap>> => {
  const gltf = useLoader(GLTFLoader, '/Poimandres.gltf')
  return gltf.scene;
}

export default loadModel;