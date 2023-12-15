import React, { Suspense, useRef } from 'react';
import Slider from "react-slick";
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import * as THREE from 'three';
import SprintReview from './SprintReview';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Model() {
    const [obj, setObj] = React.useState();

    React.useEffect(() => {
        new MTLLoader()
            .load('/Frame Retooling True Color v7.mtl', (mtlParseResult) => {
                mtlParseResult.preload();
                new OBJLoader()
                    .setMaterials(mtlParseResult)
                    .load('/Frame Retooling True Color v7.obj', (loadedObj) => {
                        setObj(loadedObj);
                    });
            });
    }, []);

    return obj ? <primitive object={obj} /> : null;
}

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

function Mechanical() {
    const controls = useRef();
    const sprintReviews = [
        {
            title: 'Sprint 1',
            blocks: [
                {
                    content: `<p>For Sprint 1, we planned to create a functional proof-of-concept prototype to test the feasibility of full 360-degree motion using 2 fast motors for movement and 2 slow motors for turning. The key aspect of our MVP concept was to enable the ball to move in all directions by rotating itself, while keeping its internal electronics stable and oriented forwards.</p>
                    `,
                    imageUrl: '/images/80 Sprint 1 Sphero.jpg'
                },
                {
                    content: `<p>Our second main priority was to demonstrate a proof of concept in terms of component integration. We aimed to ensure that all necessary electronics could be operationally mounted and fit within our mechanical frame. The design process started with sketching various ideas for motor-powered motion. We eventually settled on a design concept featuring 4 wheels - two wheels angled into the top and bottom of the inside of the sphere, and two wheels angled into the left and right. This configuration was intended to provide angular torque creating pitch-axis rotation for forward/backward movement and yaw-axis rotation for left/right direction. The decision of movement direction was to be controlled by an electrical breadboard determining the motor shaft rotation.</p>
                    `,
                    images: [ // An array of images for the carousel
                        '/images/90 Whiteboard Sketches.jpg',
                        '/images/100 Motor Dimensions Sketch.jpg'
                    ]
                },
                {
                    content: `<p>The initial design phase began in Onshape due to accessibility reasons and later transitioned to Fusion 360, owing to greater team familiarity with this software. We started by selecting and modeling our Off-The-Shelf (OTS) components, including the fast and slow motors, and the plastic bauble. The next step involved designing a frame for laser cutting that would hold the motors in place against the shell in their specific positions. However, we encountered challenges with this approach due to unsuitable tolerances for the laser-cut board. Consequently, we shifted our focus to developing a 3D printed frame. This approach allowed for faster and more flexible iterations and provided more space within the frame's center for the electronics. Our experiments with different infill percentages and frame widths revealed that these variables did not significantly impact performance.</p>
                    `,
                    images: [ // An array of images for the carousel
                        '/images/110 Onshape CAD.png',
                        '/images/120 Laser Cut Board.jpg',
                        '/images/130 Sprint 1 CAD.png',
                        '/images/140 Four Frames.jpg'
                    ]
                },
            ]
        },
        {
            title: 'Sprint 2',
            blocks: [
                {
                    content: `
                        <p>For Sprint 2, we iterated design for and successfully achieved continual wireless robotic motion. We observed the performance of our Sprint 1 prototype, noting that the main mechanical problems were a lot of pitch (wobbliness forward and backward), diagnosed as due to a too-high and unstable center of mass, and a lack of traction with our 3D-printed wheels which would frequently slip against the bauble surface. We accordingly iterated our motor mounting and frame to improve the placement of all the electromechanical components. We also made use of empty space in the bottom half of the sphere to hold 3 0.75”-diameter steel balls to act as a weight to lower the CoM, which worked well in terms of decreasing the amplitude of wobble.</p>
                    `,
                    images: [
                        '/images/150 Stubby Sketches.png',
                        '/images/160 Stubby CAD.png',
                        '/images/170 Three Ball Weight.jpg'
                    ]
                },
                {
                    content: `
                        <p>Sprint 2 also involved a lot of experimentation with assembly techniques and materials. For example, we added cut-out pieces of duro rubber onto the wheels to increase material friction and thus traction, which had a lot of success. We also used small springs cut to size with washers to try pushing the wheels with spring force against the bauble, which improved performance in some cases where slippage was occurring due to tolerances creating an undersized fit, but not uniformly, and which made de- and re-assembly rather mechanically explosive. We additionally tried manually sanding the inside of the bauble (which failed and caused immediate stalling due to the variable friction of manual sanding, as opposed to automated curvature-based sanding which we do not have the resources for), and coating the wheels with a layer of hot glue in place of rubber to increase traction (dubious success; performed better than a non-coated PLA wheel most times, but not as well as the duro layer, and it was also hard to manage a thin-enough uniform-enough coating without creating a cobwebby white glue muck).</p>
                    `,
                    images: [
                        '/images/180 Spring Wheel.jpg',
                        '/images/190 Duro Wheel.jpg',
                        '/images/200 Sanded Ball.jpg',
                        '/images/210 Hot Glue Wheels.jpg'
                    ]
                }
            ]
        },
        {
            title: 'Sprint 3',
            blocks: [
                {
                    content: `
                        <p>For Sprint 3, we worked on refining our design to maximize CERN’s performance. We further iterated on frame tolerances and wheel assembly techniques, looking at practical performance and assembly to determine the right tolerances for various parameters of our design (e.g., the tolerance of the wheel hole around the motor shaft). We also designed and integrated Version 2 of the counterweight/ball-holder to hold 16 0.5”-diameter steel balls in the bottom of CERN instead of 3 0.75”-diameter balls, for roughly 2.4x the mass (same material, same density, ergo scaling volume corresponds to scaling mass). This has demonstrable success in further minimizing wobble.</p>
                    `,
                    images: [
                        '/images/220 Final CAD.png',
                        '/images/230 Mass Comparison.png',
                        '/images/240 Tinfoil Comparison.png'
                    ]
                },
                {
                    content: `
                        <p>We additionally created LED holders that would secure 2 green LEDs acting as both practical power indicators and visual features (the “eyes” of CERN) in specific places against the frame, and maximize and direct the light forward using tinfoil. This also had demonstrable success, as can be seen in the picture comparing the LED light with tinfoil lining in the LED holder to counteract light occlusion as opposed to without tinfoil.</p>
                        <p>The final new mechanical piece we created was an inductive charging base for CERN’s electrical inductive charger. This worked well to hold the charger and make it more ergonomic and ‘customer’-facing (i.e., good to handle, harder to lose).</p>
                    `,
                    images: [
                        '/images/250 Charging Base With Sphero.jpg',
                        '/images/260 Empty Charging Base.jpg',
                        '/images/270 Opened Charging Base.jpg'
                    ]
                }
            ]
        }

        // Add more sprints as needed
    ];

    return (
        <div className="main-content" style={{ maxWidth: '70%', margin: '0 auto' }}>
            <h1>Mechanical</h1>
            <div style={{ height: '600px', width: '100%' }}>
                <Canvas camera={{ position: [3, 3, 2] }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Suspense fallback={null}>
                        <Model />
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
                            {block.images ? (
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

export default Mechanical;
