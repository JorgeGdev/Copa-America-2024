import React from 'react';
import { useGLTF } from '@react-three/drei';

const Ball = ({ path, scale, position }) => {
  const { scene } = useGLTF(path);

  return <primitive object={scene} scale={scale} position={position} />;
};

export default Ball;

