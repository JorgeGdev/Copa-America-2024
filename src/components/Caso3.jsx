import React from 'react';
import Scene from './Scene';

const Caso3 = () => {
  const models = [
    {
      path: 'models/uruguay.glb',
      scale: [0.8, 0.8, 0.8],
      position: [-2, 0, 0],
    },
    {
      path: 'models/brasil.glb',
      scale: [0.8, 0.8, 0.8], 
      position: [2, 0, 0], 
    },
  ];

  return (
    <Scene 
      models={models}
      mainColor="#ffdec0"
    />
  );
};

export default Caso3;
