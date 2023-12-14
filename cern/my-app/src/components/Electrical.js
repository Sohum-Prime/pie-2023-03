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
            For Sprint 1 we breadboarded major systems (IMU, ESP-32, h-bridge, inverter) for our first prototype. Based on these tests, we created a PCB schematic that was sent off to fabrication in Sprint 2. The PCB miniaturized the system, allowed for less hassle with wiring, and let us have more functionality. From right to left in the picture below, the design has a full-bridge rectifier and voltage doubler circuit for the inductive charging rectification. It then has a linear regulator for regulating the voltage down to 5V for the LiPo charger. The ground of the main system is isolated via a series of MOSFETs to prevent floating voltage from feeding forward through the ESP32 GPIO protection circuitry. Having the MOSFETs on separate grounds decouples their behavior while allowing for the desired behavior of a tilt switch being able to initially turn power on to the system and then the ESP32 trigger pin going HIGH to maintain power to the system until shut off when the pin is returned to the LOW state. The use of tilt switches was to retain simplicity and also to prevent parasitic power drain by alternative systems like a low-power Bluetooth chip or a Hall effect sensor and a magnet in the charging base. Finally, a 3.3V regulator powers the main computing and sensing circuitry.
            `,
            imageUrl: '/images/Charging KiCAD Schematic.png' // Replace with actual image path
        },
        {
            content: `
            <p>In the below image, the ESP32 is connected to all the peripherals: motor controllers, IMUs, LEDs, a voltage divider for battery readings, and a tilt switch for detecting when the Sphero is tilted to initiate a shutdown timer. Every single available pin is used on the ESP32 chip, which proves to be an interesting dilemma because some pins are used for strapping in the boot sequence and therefore must be in certain states at boot. Some pins cannot be used entirely for digital I/O such as the hardware Serial and the external flash pins labeled SDx. Despite these downsides, the ESP32 is used because we had DevKit boards on-hand for Sprint 1 testing, and the board has fast compute and Bluetooth and WiFi capabilities, which makes it perfect for this application.</p>
            <p>There are four pins: VP, VN, 34, and 35, which do not have output capabilities and also lack pull-up/down resistors. These are used for the voltage reading, tilt switch reading, and the two fault pins for the motor controller, which are the only four non-output functions of the board. The pull resistors are added because the fault pins have no internal resistors.</p> 
            <p>Most other GPIO pins are standard, except for 14, 12, 5, 0, 2, and 15. These pins perform various functions from strapping to bootlogging. Pin 14 is a boot pin that streams the bootlog and returns to a HIGH state. As such, it is connected to the motor controller because its sleep pin prevents this pin’s state changes from driving any circuitry. Pin 12 must be LOW for the boot sequence and therefore is connected to the motor driver which has internal pull-down resistors on its inputs, which guarantees this state. Pin 5 must be HIGH for the boot sequence, so it is connected to the LEDs which are common anode and therefore guarantee that pin’s state. Pin 0 must change states between booting and flashing, so it is left disconnected in order to accommodate the possibility of a WiFi bootloader. Pin 2 must be LOW for boot so like pin 12 it is connected to the motor driver. Finally, pin 15 like pin 5 must remain HIGH for the boot sequence so it is connected to the LEDs. Appropriate capacitors and resistors were chosen per the datasheets for the components and pull resistors were standardized to 10k to limit part count.</p>
                    `,
            imageUrl: '/images/ESP32 KiCAD Schematic.png' // Replace with actual image path
        },
        {
            content: `
            The layout of the PCB was miniaturized as much as possible. Since this was Ari’s first time making a PCB, he added many test points, expecting something to go wrong — it worked on the first try. There were a lot of errors he caught in its design before he sent it out for fabrication from improper footprints, to bad pin mappings, to bad nets — all good learnings about what needs to be triple-checked. Some components were constrained location-wise. For instance, the tilt switches tilt side-to-side and therefore have to be in that orientation to prevent false actuations from forward/backwards pitching of the Sphero. The smoothing capacitors had to be as close to their respective chips as possible. And finally, the space under the ESP32 and IMU breakouts was used for components to save on board area. We added various power headers to allow for us to jump power to different parts of the circuit and bypass components. The top plane is at VBAT and is powered through the 3A fuse whereas the bottom plane is GND. 
            `,
            imageUrl: '/images/Red PCB KiCAD.png' // Replace with actual image path
        },
        {
            content: `
            Ari spent a lot of time arranging components to minimize the breaks in the ground plane, and wherever it had a break he made up for it through bridges on both planes to create more ground pathways following major power rails. The final board size is just shy of 60x70mm. The square shape allowed for the best packing, whereas a circle would have been larger as a result of the worse layout characteristics.            `,
            imageUrl: '/images/Blue PCB KiCAD.png' // Replace with actual image path
        },
        {
            title: 'Sprint 2',
            content: `
                <p>We populated the PCB and tested induction coils. Despite some issues with the coils, we managed to integrate them into the prototype. The PCBs were populated using a manual pick and place machine and a reflow oven. Challenges included sourcing components and shipping delays from DigiKey, yet the PCB was fully functional on the first try. This process was a learning experience in using solder paste, pick and place machines, and reflowing.</p>
            `,
            imageUrl: '/images/ESP32 KiCAD Schematic.png' // Replace with actual image path
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
