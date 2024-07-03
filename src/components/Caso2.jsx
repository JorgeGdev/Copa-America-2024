import React from 'react';
import Scene from './Scene';

const Caso2 = () => {
  const models = [
    {
      path: 'models/canada.glb',
      scale: [0.7, 0.7, 0.7],
      position: [-2, 0, 0],
    },
    {
      path: 'models/venezuela.glb',
      scale: [0.7, 0.7, 0.7], 
      position: [2, 0, 0], 
    },
  ];

  return (
    <Scene 
      models={models}
      mainColor="#c0ffe1"
    />
  );
};

export default Caso2;
