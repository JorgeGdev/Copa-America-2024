import React from 'react';
import {
  CameraControls,
  Environment,
  Grid,
  MeshDistortMaterial,
  RenderTexture,
  Dodecahedron,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { slideAtom } from "./Overlay";
import Caso1 from './Caso1';
import Caso2 from './Caso2';
import Caso3 from './Caso3';
import Caso4 from './Caso4'; // Importa Caso4

const CameraHandler = ({ slideDistance }) => {
  const viewport = useThree((state) => state.viewport);
  const cameraControls = useRef();
  const [slide] = useAtom(slideAtom);
  const lastSlide = useRef(0);

  const { dollyDistance } = useControls({
    dollyDistance: {
      value: 10,
      min: 0,
      max: 50,
    },
  });

  const moveToSlide = async () => {
    await cameraControls.current.setLookAt(
      lastSlide.current * (viewport.width + slideDistance),
      3,
      dollyDistance,
      lastSlide.current * (viewport.width + slideDistance),
      0,
      0,
      true
    );
    await cameraControls.current.setLookAt(
      (slide + 1) * (viewport.width + slideDistance),
      1,
      dollyDistance,
      slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );

    await cameraControls.current.setLookAt(
      slide * (viewport.width + slideDistance),
      0,
      5,
      slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );
  };

  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      cameraControls.current.setLookAt(
        slide * (viewport.width + slideDistance),
        0,
        5,
        slide * (viewport.width + slideDistance),
        0,
        0
      );
    }, 200);
    return () => clearTimeout(resetTimeout);
  }, [viewport]);

  useEffect(() => {
    if (lastSlide.current === slide) {
      return;
    }
    moveToSlide();
    lastSlide.current = slide;
  }, [slide]);

  return (
    <CameraControls
      ref={cameraControls}
      touches={{ one: 0, two: 0, three: 0 }}
      mouseButtons={{ left: 0, middle: 0, right: 0 }}
    />
  );
};

export const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const { slideDistance } = useControls({
    slideDistance: {
      value: 1,
      min: 0,
      max: 10,
    },
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment preset={"city"} />
      <CameraHandler slideDistance={slideDistance} />
      <group>
        <mesh position-y={viewport.height / 2 + 1.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial color={"#f9c0ff"} speed={3} />
        </mesh>
        <mesh
          position-x={viewport.width + slideDistance}
          position-y={viewport.height / 2 + 1.5}
        >
          <boxGeometry />
          <MeshDistortMaterial color={"#c0ffe1"} speed={3} />
        </mesh>
        <Dodecahedron
          position-x={2 * (viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 1.5}
        >
          <MeshDistortMaterial color={"#ffdec0"} speed={3} />
        </Dodecahedron>
        <mesh
          position-x={3 * (viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 1.5}
        >
          <boxGeometry />
          <MeshDistortMaterial color={"#ffcc00"} speed={3} />
        </mesh>
      </group>
      <Grid
        position-y={-viewport.height / 2}
        sectionSize={1}
        sectionColor={"purple"}
        sectionThickness={1}
        cellSize={0.5}
        cellColor={"#6f6f6f"}
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
      />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture attach="map">
            <Caso1 />
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
      <mesh position={[viewport.width + slideDistance, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture attach="map">
            <Caso2 />
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
      <mesh position={[2 * (viewport.width + slideDistance), 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture attach="map">
            <Caso3 />
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
      <mesh position={[3 * (viewport.width + slideDistance), 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture attach="map">
            <Caso4 />
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
    </>
  );
};
