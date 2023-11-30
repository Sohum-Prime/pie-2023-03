import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three'; // Import the Three.js library

function Model() {
    // Load the .obj file
    const obj = useLoader(OBJLoader, '/CERN Robot CAD.obj');

    // Apply a material to each mesh in the .obj model
    obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            // Define material here. You can set color or other material properties.
            child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color('steelblue'), // Replace with any color you like
                // You can add more material properties here, like metalness, roughness, etc.
            });
        }
    });

    return <primitive object={obj} />;
}

function Mechanical() {
    const controls = useRef();

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <div className="main-content">
                <h1>Mechanical</h1>
                <p>Overview of the mechanical design, CAD prototyping, and motor configuration and mounting.</p>
            </div>
            <Canvas camera={{ position: [2, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Suspense fallback={null}>
                    <Model />
                </Suspense>
                <OrbitControls ref={controls} />
            </Canvas>
        </div>
    );
}

export default Mechanical;
