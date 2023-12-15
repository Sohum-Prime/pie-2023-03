import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Induction() {
    const carouselSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerPadding: '50px',
    };

    const sprintContents = [
        {
            title: "Sprint 1",
            blocks: [
                {
                    content: `
                        <p>We tried to test if inductive charging was feasible for us using a pair of LC circuits, particularly in regards to making our own coils. This was done by using the function generator and some coils that were wound somewhat haphazardly but with an attempt to keep the windings and surface area of the coils the same. To the coil, we attached capacitors in parallel, with the other coil pair also receiving capacitors with the same capacitance.</p>
                    `,
                    images: [
                        '/images/370 MOSFET Trigger Breadboard.jpg',
                        '/images/380 IMU Breadboard.jpg',
                        '/images/390 Full Breadboard Oscillator.jpg',
                        '/images/400 Two Induction Coils By Themselves.jpg'
                    ]
                },
                {
                    content: `
                        <p>This creates a pair of LC circuits. LC circuits act as the electrical equivalent of tuning forks. Like physical tuning forks, putting two LC circuits next to each other causes them both to resonate, if at least one has alternating current traveling through it at its resonant frequency. We tested the working theory for this pair of LC circuits by hooking up one to a function generator in parallel and another to an oscilloscope in parallel. We saw some power transfer, so we decided to continue with inductive charging.</p>
                    `,
                    imageUrl: '/images/401 Four Times Circuit.png'
                },
                {
                    content: `
                        <p>We took a pause on developing this more to work on breadboarding other subsystems of our spherical robot, such as the gyroscope, H-bridges, and a clock circuit. An H-bridge is formed by four switching components (often MOSFETs) and used to switch a higher power supply from a lower one using a PWM signal. H-bridges can be used as inverters (a type of circuit that converts a DC power source to an AC power source).</p>
                    `,
                    imageUrl: '/images/402 H-Bridge Circuit.png'
                },
                {
                    content: `
                        <p>We also made a clock circuit. This was to generate the PWM signal needed for the H-bridge. We used a fairly standard Pierce oscillator to generate the signal. We planned to adjust the resonant frequency of our LC circuit pair to somewhere in the >1 MHz range, using the knowledge that the resonant frequency of an LC circuit is f = 1/(2π × √(L*C)), where L is the inductance and C is the capacitance.</p>
                        <p>We decided to put a full bridge rectifier for the LC receiving circuit on the PCB. We decided that we would use a voltage doubler after the rectifier in order to boost the voltage on the receiving end because we expected significant losses in transmission and diode losses.</p>
                    `
                }
            ]
        },
        {
            title: "Sprint 2",
            blocks: [
                {
                    content: `
                        <p>We created a pair of transmitting and receiving coils, using a more purposeful winding method that ensured the coils were as consistent as we could make them. The transmitting coil had a center tap for testing different possible transmitting circuit designs. We determined the resonant frequency for our circuit by measuring the resistance using a function generator and oscilloscope at various frequencies. We found about 83 uH of inductance for both the transmitting and receiving coils and decided to keep the resonant frequency of our LC circuit low at 14.2 kHz.</p>
                    `,
                    images: [
                        '/images/370 Transmitting Coil.jpg',
                        '/images/380 Receiving Coil.jpg'
                    ]
                },
                {
                    content: `
                        <p>We tested transmitting and receiving power using H-bridges that we originally bought for the motors. This ended up frying one of our H-bridges. We then tried to use a NPN transistor in a class A power amplifier configuration. We got some voltage out on the receiving coil, though the circuit was highly inefficient and kept drawing too much current out of our power supply.</p>
                        <p>Through trial and error, we found that the circuit below happened to work and was relatively efficient:</p>
                    `,
                    imageUrl: '/images/403 Some Circuit.png'
                },
                {
                    content: `
                        <p>We were unsure of how the circuit functioned at the time, and this combined with mistakes in probing the circuit led us to hold off on integrating wireless power transfer until Sprint 3.</p>
                    `,
                    imageUrl: '/images/410 Final Induction Circuit.jpg'
                }
            ]
        },
        {
            title: "Sprint 3",
            blocks: [
                {
                    content: `
                        <p>Through research, we found that the circuit experimented with in Sprint 2 was a special case of a Royer oscillator. We decided to investigate using a zero voltage switching (ZVS) driver. This driver works by using a parallel LC circuit to charge and discharge a normally off switching element. We also added a diode to the power source to help protect the power supply further. The final coils use a ZVS driver with protection on the MOSFET switching elements.</p>
                    `,
                    imageUrl: '/images/421 Some Circuit.png'
                },
                {
                    content: `
                        <p>We tested the system and found that it generated a high amplitude AC signal that was around 28v peak to peak on our transmitting end. On the output end, we received a signal that was around 18v peak to peak. We also tested power transfer through testing current and saw around 10 mA of current passing through the battery, transferring around 0.042 watts.</p>
                        <p>We decided to continue integrating our coils into the final prototype. We transferred our circuit to perfboard. The main limitation of power transfer results from a low coupling coefficient that prevents current from being effectively transferred.</p>
                    `,
                    images: [
                        '/images/422 Oscilloscope.jpg',
                        '/images/430 EE Proto Room Setup.jpg',
                        '/images/440 EE Proto Room 3 People.jpg'
                    ]
                }
            ]
        }
    ];

    return (
        <div className="main-content" style={{ maxWidth: '70%', margin: 'auto' }}>
            <h1>Induction</h1>
            <p>Development of the inductive charging circuit and base station.</p>
            {sprintContents.map((sprint, index) => (
                <div key={index} style={{ border: '1px solid var(--accent)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                    <h2>{sprint.title}</h2>
                    {sprint.blocks.map((block, idx) => (
                        <div key={idx}>
                            <div dangerouslySetInnerHTML={{ __html: block.content }} style={{ textAlign: 'justify' }} />
                            {block.imageUrl && (
                                <div style={{ textAlign: 'center' }}>
                                    <img src={block.imageUrl} alt={`Sprint ${index + 1} Image ${idx + 1}`} style={{ maxWidth: '60%', height: 'auto', margin: '20px 0' }} />
                                </div>
                            )}
                            {block.images && (
                                <div style={{ textAlign: 'center' }}>
                                    <Slider {...carouselSettings}>
                                        {block.images.map((img, imgIdx) => (
                                            <div key={imgIdx}>
                                                <img src={img} alt={`Sprint ${index + 1} Block ${idx + 1} Image ${imgIdx + 1}`} style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }} />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Induction;
