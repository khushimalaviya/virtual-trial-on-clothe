// src/components/TryOn3DView.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane, useTexture } from "@react-three/drei";

export const TryOn3DView = ({ imageUrl }) => {
  const texture = useTexture(imageUrl);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[1, 1, 1]} />
        <OrbitControls enableZoom={true} />

        {/* Render Image as 3D Plane */}
        <Plane args={[2, 3]}>
          <meshStandardMaterial map={texture} side={2} />
        </Plane>
      </Canvas>
    </div>
  );
};

// export default TryOn3DView;
