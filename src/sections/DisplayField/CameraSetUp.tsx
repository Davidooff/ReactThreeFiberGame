import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Set the camera position to (-10, 10, 10)
    camera.position.set(-5, 10, 15);

    // Define the target point to look at (5, 0, 5)
    const target = new THREE.Vector3(5, 0, 6);

    // Make the camera look at the target
    camera.lookAt(target);

    // Optionally, update the camera's projection matrix if needed
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};

export default CameraSetup;
