import React from 'react';
import Scene from './Scene';

const Caso1 = () => {
  const models = [
    {
      path: 'models/argentina.glb',
      scale: [0.8, 0.8, 0.8],
      position: [-2, 0, 0],
    },
    {
      path: 'models/ecuador.glb',
      scale: [0.8, 0.8, 0.8], 
      position: [2, 0, 0], 
    },
  ];

  return (
    <Scene 
      models={models}
      mainColor="#f9c0ff"
    />
  );
};

export default Caso1;
