import React, { Suspense } from 'react';
import { useLoader } from 'react-three-fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function PCBModel() {
    const materials = useLoader(MTLLoader, '/pcb.mtl');
    const obj = useLoader(OBJLoader, '/pcb.obj', (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    return obj ? <primitive object={obj} /> : null;
}

export default PCBModel;
