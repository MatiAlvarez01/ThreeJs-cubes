import React, { useRef, useState } from "react"
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three"

softShadows();

const SpinningMesh = ({position, color, size, speed}) => {

  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.005));

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1]
  })

  return (
    <a.mesh ref={mesh} position={position} castShadow onClick={() => setExpand(!expand)} scale={props.scale}>
      <boxBufferGeometry 
        attach="geometry"
        args={size}
      />
      <MeshWobbleMaterial 
        attach="material"
        color={color}
        speed={speed}
        factor={0.6}
      />
    </a.mesh>
  )
}

function App() {
  return (
    <MainSection>
      <Canvas camera={{position: [-5, 2, 10], fov: 70}} shadows>
        <ambientLight 
          intensity={0.1}
        />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight 
          position={[-10, 0, -20]}
          intensity={0.5}
        />
        <pointLight 
          position={[0, -10, 0]}
          intensity={1.5}
        />
        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeBufferGeometry 
              attach="geometry"
              args={[100, 100]}
            />
            <shadowMaterial 
              attach="material"
              opacity={0.3}
            />
          </mesh>
          <SpinningMesh 
            position={[0, 1, 0]}
            size={[2, 2, 2]}
            color="pink"
            speed={2}
          />
          <SpinningMesh 
            position={[-2, 1, -5]}
            size={[1, 1, 1]}
            color="lightblue"
            speed={6}
          />
          <SpinningMesh 
            position={[5, 1, -2]}
            size={[1, 1, 1]}
            color="lightblue"
            speed={6}
          />
        </group>
        <OrbitControls />
      </Canvas> 
    </MainSection>
  );
}

export default App;

const MainSection = styled.section`
  background-color: #f1f4f1;
  height: 100vh;
  padding: 0;
  margin: 0;
`