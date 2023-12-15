import React, { Suspense } from "react";
import Slider from "react-slick";
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import PCBModel from './PCBModel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    centerPadding: '50px',
};

const sprintReviews = [
    {
        title: 'Sprint 1',
        blocks: [
            {
                content: `For Sprint 1 we breadboarded major systems (IMU, ESP-32, h-bridge, inverter) for our first prototype. Based on these tests, we created a PCB schematic that was sent off to fabrication in Sprint 2. The PCB miniaturized the system, allowed for less hassle with wiring, and let us have more functionality. From right to left in the picture below, the design has a full-bridge rectifier and voltage doubler circuit for the inductive charging rectification. It then has a linear regulator for regulating the voltage down to 5V for the LiPo charger. The ground of the main system is isolated via a series of MOSFETs to prevent floating voltage from feeding forward through the ESP32 GPIO protection circuitry. Having the MOSFETs on separate grounds decouples their behavior while allowing for the desired behavior of a tilt switch being able to initially turn power on to the system and then the ESP32 trigger pin going HIGH to maintain power to the system until shut off when the pin is returned to the LOW state. The use of tilt switches was to retain simplicity and also to prevent parasitic power drain by alternative systems like a low-power Bluetooth chip or a Hall effect sensor and a magnet in the charging base. Finally, a 3.3V regulator powers the main computing and sensing circuitry.
                `,
                imageUrl: '/images/280 Charging KiCAD Schematic.png'
            },
            {
                content: `
                <p>In the below image, the ESP32 is connected to all the peripherals: motor controllers, IMUs, LEDs, a voltage divider for battery readings, and a tilt switch for detecting when the Sphero is tilted to initiate a shutdown timer. Every single available pin is used on the ESP32 chip, which proves to be an interesting dilemma because some pins are used for strapping in the boot sequence and therefore must be in certain states at boot. Some pins cannot be used entirely for digital I/O such as the hardware Serial and the external flash pins labeled SDx. Despite these downsides, the ESP32 is used because we had DevKit boards on-hand for Sprint 1 testing, and the board has fast compute and Bluetooth and WiFi capabilities, which makes it perfect for this application.</p>
                <p>There are four pins: VP, VN, 34, and 35, which do not have output capabilities and also lack pull-up/down resistors. These are used for the voltage reading, tilt switch reading, and the two fault pins for the motor controller, which are the only four non-output functions of the board. The pull resistors are added because the fault pins have no internal resistors.</p> 
                <p>Most other GPIO pins are standard, except for 14, 12, 5, 0, 2, and 15. These pins perform various functions from strapping to bootlogging. Pin 14 is a boot pin that streams the bootlog and returns to a HIGH state. As such, it is connected to the motor controller because its sleep pin prevents this pin’s state changes from driving any circuitry. Pin 12 must be LOW for the boot sequence and therefore is connected to the motor driver which has internal pull-down resistors on its inputs, which guarantees this state. Pin 5 must be HIGH for the boot sequence, so it is connected to the LEDs which are common anode and therefore guarantee that pin’s state. Pin 0 must change states between booting and flashing, so it is left disconnected in order to accommodate the possibility of a WiFi bootloader. Pin 2 must be LOW for boot so like pin 12 it is connected to the motor driver. Finally, pin 15 like pin 5 must remain HIGH for the boot sequence so it is connected to the LEDs. Appropriate capacitors and resistors were chosen per the datasheets for the components and pull resistors were standardized to 10k to limit part count.</p>
                        `,
                imageUrl: '/images/290 ESP32 KiCAD Schematic.png', // Embedded
            },
            {
                content: `
                The layout of the PCB was miniaturized as much as possible. Since this was Ari’s first time making a PCB, he added many test points, expecting something to go wrong — it worked on the first try. There were a lot of errors he caught in its design before he sent it out for fabrication from improper footprints, to bad pin mappings, to bad nets — all good learnings about what needs to be triple-checked. Some components were constrained location-wise. For instance, the tilt switches tilt side-to-side and therefore have to be in that orientation to prevent false actuations from forward/backwards pitching of the Sphero. The smoothing capacitors had to be as close to their respective chips as possible. And finally, the space under the ESP32 and IMU breakouts was used for components to save on board area. We added various power headers to allow for us to jump power to different parts of the circuit and bypass components. The top plane is at VBAT and is powered through the 3A fuse whereas the bottom plane is GND. 
                `,
                imageUrl: '/images/300 Red PCB KiCAD.png', // Embedded
            },
            {
                content: `
                Ari spent a lot of time arranging components to minimize the breaks in the ground plane, and wherever it had a break he made up for it through bridges on both planes to create more ground pathways following major power rails. The final board size is just shy of 60x70mm. The square shape allowed for the best packing, whereas a circle would have been larger as a result of the worse layout characteristics.            `,
                imageUrl: '/images/310 Blue PCB KiCAD.png', // Embedded
            },
            // Additional blocks for Sprint 1
        ]
    },
    {
        title: 'Sprint 2',
        blocks: [
            {
                content: `<p>The PCBs were populated using the help of a manual pick and place machine and a reflow oven and integrated into the prototype. There were some issues with sourcing the components and delays with shipping from our component provider, DigiKey. We managed to still complete the PCB on time for integration. The PCB was fully-functional on the first try. This was Ari’s first time populating a PCB, so he learned a lot about using solder paste, pick and place machines, and reflowing. He also learned about what the markings on the PCB footprints symbolize in order to orient components.</p>
                `,
                images: [ // An array of images for the carousel
                    '/images/320 Blank PCB In Hand.jpg',
                    '/images/330 PCB With SMD Components.jpg',
                    '/images/340 PCB Blueground.jpg',
                    '/images/350 PCB With Capacitors.jpg',
                    '/images/360 Ari Pick n Placing.jpg'
                ]
            },
        ]
    },
    {
        title: 'Sprint 3',
        blocks: [
            {
                content: `FWe made two more PCBs, of the same design for the three robots.                `,
            },
        ]
    },
];

function Electrical() {
    return (
        <div className="main-content" style={{ maxWidth: '70%', margin: '0 auto' }}>
            <h1>Electrical</h1>
            <p>Details on the PCB development, from breadboard prototyping to board population</p>
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
            {sprintReviews.map((sprint, index) => (
                <div key={index} style={{ border: '1px solid var(--accent)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                    <h2>{sprint.title}</h2>
                    {sprint.blocks.map((block, idx) => (
                        <div key={idx}>
                            <div dangerouslySetInnerHTML={{ __html: block.content }} style={{ textAlign: 'justify' }} />
                            {Array.isArray(block.images) ? (
                                <Slider {...carouselSettings}>
                                    {block.images.map((img, slideIndex) => (
                                        <div key={slideIndex} style={{ textAlign: 'center' }}>
                                            <img src={img} alt={`Slide ${slideIndex}`} style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }} />
                                        </div>
                                    ))}
                                </Slider>
                            ) : block.imageUrl && (
                                <div style={{ textAlign: 'center' }}>
                                    <img src={block.imageUrl} alt={`Block Image ${idx}`} style={{ maxWidth: '60%', height: 'auto', margin: '20px 0' }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Electrical;

// function Electrical() {
//     return (
//         <div className="main-content" style={{ maxWidth: '70%', margin: '0 auto' }}>
//             <h1>Electrical</h1>
//             <p>Details on the PCB development, from breadboard prototyping to board population</p>
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
//             {sprintReviews.map((sprint, index) => (
//                 <div key={index} style={{ border: '1px solid var(--accent)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
//                     <h2>{sprint.title}</h2>
//                     {sprint.blocks.map((block, idx) => (
//                         <div key={idx}>
//                             <div dangerouslySetInnerHTML={{ __html: block.content }} style={{ textAlign: 'justify' }} />
//                             {block.imageUrl && (
//                                 <div style={{ textAlign: 'center' }}>
//                                     <img src={block.imageUrl} alt={`Sprint Image ${index}-${idx}`} style={{ maxWidth: '60%', height: 'auto', margin: '20px 0' }} />
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Electrical;

// function Electrical() {
//     return (
//         <div className="main-content" style={{ maxWidth: '70%', margin: '0 auto' }}>
//             <h1>Electrical</h1>
//             <p>Details on the PCB development, from breadboard prototyping to board population</p>
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
//             {sprintReviews.map((sprint, index) => (
//                 <div key={index} style={{ border: '1px solid gray', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
//                     <h2>{sprint.title}</h2>
//                     <div dangerouslySetInnerHTML={{ __html: sprint.content }} style={{ textAlign: 'left' }} />
//                     {sprint.images ? (
//                         <div style={{ textAlign: 'center' }}>
//                             <Slider {...carouselSettings}>
//                                 {sprint.images.map((img, idx) => (
//                                     <div key={idx} style={{ textAlign: 'center' }}>
//                                         <img src={img} alt={`Slide ${idx}`} style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }} />
//                                     </div>
//                                 ))}
//                             </Slider>
//                         </div>
//                     ) : sprint.imageUrl && (
//                         <div style={{ textAlign: 'center' }}>
//                             <img src={sprint.imageUrl} alt={sprint.title} style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }} />
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Electrical;