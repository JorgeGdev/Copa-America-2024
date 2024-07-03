import React from 'react';
import Scene from './Scene';

const Caso4 = () => {
  const models = [
    {
      path: 'models/colombia.glb', // Reemplaza con la ruta correcta del primer modelo
      scale: [0.8, 0.8, 0.8],
      position: [0, 0, 0],
    },
    {
      path: 'models/panama.glb', // Reemplaza con la ruta correcta del segundo modelo
      scale: [0.8, 0.8, 0.8], // Ajusta la escala según sea necesario
      position: [3, 0, 0], // Ajusta la posición según sea necesario
    },
  ];

  return (
    <Scene 
      models={models}
      mainColor="#00f2ff" // Ajusta el color principal según sea necesario
    />
  );
};

export default Caso4;
