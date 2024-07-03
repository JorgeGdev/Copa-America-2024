import React, { useEffect, useRef } from 'react';
import { useGLTF, PerspectiveCamera, OrbitControls, AccumulativeShadows, RandomizedLight, Environment, Sphere, Lightformer } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DEG2RAD } from 'three/src/math/MathUtils';

const Model = ({ path, scale, position }) => {
  const { scene, animations } = useGLTF(path);
  const mixer = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixer.current.clipAction(clip).play();
      });
    }
  }, [scene, animations]);

  useEffect(() => {
    return () => mixer.current?.stopAllAction();
  }, []);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={scene} scale={scale} position={position} />;
};

const Scene = ({ models = [], mainColor }) => {
  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <group dispose={null}>
        <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
        <OrbitControls autoRotate enablePan={false} maxPolarAngle={DEG2RAD * 75} minDistance={6} maxDistance={10} autoRotateSpeed={0.5} />
        {models.map((model, index) => (
          <Model key={index} {...model} />
        ))}
        <ambientLight intensity={0.1} color="pink" />
        <AccumulativeShadows frames={100} alphaTest={0.9} scale={30} position={[0, -0.005, 0]} color="pink" opacity={0.8}>
          <RandomizedLight amount={4} radius={9} intensity={0.8} ambient={0.25} position={[10, 5, 15]} />
          <RandomizedLight amount={4} radius={5} intensity={0.5} position={[-5, 5, 15]} bias={0.001} />
        </AccumulativeShadows>
        <Environment blur={0.8} background>
          <Sphere scale={15}>
            <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
          </Sphere>
          <Lightformer position={[5, 4, -5]} form="rect" intensity={1} color="red" scale={[3, 5]} target={[0, 0, 0]} />
          <Lightformer position={[-5, 5.1, 1]} form="circle" intensity={1} color="green" scale={[2, 5]} target={[0, 0, 0]} />
          <Lightformer position={[0, 5, -2]} form="ring" intensity={0.5} color="orange" scale={[10, 5]} target={[0, 0, 0]} />
          <Lightformer position={[0, 4, 5]} form="rect" intensity={1} color="purple" scale={[10, 5]} target={[0, 0, 0]} />
        </Environment>
      </group>
    </>
  );
};

// Preload all models
useGLTF.preload('models/argentina.glb');
useGLTF.preload('models/soccer_ball.glb');
useGLTF.preload('models/canada.glb');
useGLTF.preload('models/venezuela.glb');
useGLTF.preload('models/uruguay.glb');
useGLTF.preload('models/brasil.glb');
useGLTF.preload('models/ecuador.glb');
useGLTF.preload('models/colombia.glb');
useGLTF.preload('models/panama.glb');

export default Scene;
