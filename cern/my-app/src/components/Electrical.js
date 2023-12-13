import React, { Suspense } from "react";
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import PCBModel from './PCBModel'; // Adjust the path as needed
import SprintReview from './SprintReview'; // Import the SprintReview component

function Electrical() {
    const sprintReviews = [
        {
            title: 'Sprint 1',
            content: `
                <p>For Sprint 1, we breadboarded major systems (IMU, ESP-32, h-bridge, inverter) for our first prototype. Based on these tests, we created a PCB schematic that was sent off to fabrication in Sprint 2. The PCB miniaturized the system, allowed for less hassle with wiring, and let us have more functionality. The design includes a full-bridge rectifier and voltage doubler circuit for inductive charging rectification, a linear regulator, and a series of MOSFETs for ground isolation. The MOSFETs decouple their behavior while allowing for the desired behavior of a tilt switch to initially turn the power on to the system.</p>
    
                <p>The ESP32 is connected to all peripherals, utilizing every available pin. This included addressing challenges with pins used for strapping in the boot sequence and ensuring proper boot conditions. The layout was miniaturized as much as possible, with attention to component placement, minimization of breaks in the ground plane, and efficient use of board area.</p>
            `,
            imageUrl: '/path-to-sprint1-electrical-image.jpg' // Replace with actual image path
        },
        {
            title: 'Sprint 2',
            content: `
                <p>We populated the PCB and tested induction coils. Despite some issues with the coils, we managed to integrate them into the prototype. The PCBs were populated using a manual pick and place machine and a reflow oven. Challenges included sourcing components and shipping delays from DigiKey, yet the PCB was fully functional on the first try. This process was a learning experience in using solder paste, pick and place machines, and reflowing.</p>
            `,
            imageUrl: '/path-to-sprint2-electrical-image.jpg' // Replace with actual image path
        },
        {
            title: 'Sprint 3',
            content: `
                <p>We integrated coils into the final prototype, with the limitation of a slower charging rate. The final coils use a ZVS driver with protection circuitry on the MOSFET switching elements. Despite challenges with power transfer due to a low coupling coefficient, we effectively transferred voltage. We made two more PCBs of the same design for the three robots. The voltage doubler was deemed unnecessary as a higher voltage was conducive to more energy received on the receiving coil.</p>
            `,
            imageUrl: '/path-to-sprint3-electrical-image.jpg' // Replace with actual image path
        }
        // Add more sprints as needed
    ];

    return (
        <div className="main-content">
            <h1>Electrical</h1>
            <p>Details on the PCB development, breadboard prototyping, and electronic systems...</p>
            <div style={{ height: '500px', width: '100%' }}>
                <Canvas camera={{ position: [2, 2, -90] }}>
                    <ambientLight intensity={0.9} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Suspense fallback={null}>
                        <PCBModel />
                    </Suspense>
                    <OrbitControls />
                </Canvas>
            </div>
            {sprintReviews.map(sprint => (
                <SprintReview key={sprint.title} {...sprint} />
            ))}
        </div>
    );
}

export default Electrical;


// import React, { Suspense } from "react";
// import { Canvas } from 'react-three-fiber';
// import { OrbitControls } from '@react-three/drei';
// import PCBModel from './PCBModel'; // Adjust the path as needed

// function Electrical() {
//     return (
//         <div className="main-content">
//             <h1>Electrical</h1>
//             <p>Details on the PCB development, breadboard prototyping, and electronic systems...</p>
//             <div style={{ height: '500px', width: '100%' }}>
//                 <Canvas camera={{ position: [2, 2, -90] }}>
//                     <ambientLight intensity={0.9} />
//                     <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//                     <pointLight position={[-10, -10, -10]} />
//                     <Suspense fallback={null}>
//                         <PCBModel />
//                     </Suspense>
//                     <OrbitControls />
//                 </Canvas>
//             </div>
//         </div>
//     );
// }

// export default Electrical;
