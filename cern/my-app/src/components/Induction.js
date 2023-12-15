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
            content: `<p>We tried to test if inductive charging was feasible for us using a pair of LC circuits, particularly in regards to making our own coils. This was done by using the function generator and some coils that were wound somewhat haphazardly but with an attempt to keep the windings and surface area of the coils the same. To the coil, we attached capacitors in parallel, with the other coil pair also receiving capacitors with the same capacitance. 
            
            <p>This creates a pair of LC circuits. LC circuits act as the electrical equivalent of tuning forks. Like physical tuning forks, putting two LC circuits next to each other causes them both to resonate, if at least one has alternating current traveling through it at its resonant frequency. For wireless power transfer, there are 4 main topologies of the LC circuits of the transmitting and receiving ends: series-series, series-parallel, parallel-series, and parallel-parallel. Topologies with a series transmitting LC circuit tend to require a higher amplitude AC current to function than parallel transmitting LC circuits. Topologies with a parallel receiving circuit tend to output a higher amplitude AC current compared to series receiving circuits. Because we were concerned about the voltage transfer between the transmitting and receiving circuits at the time, we chose a parallel-parallel topology.
            (in the picture below, from top left, clockwise: parallel-series, series-parallel, parallel-parallel, series-series)
            
            <p>We tested the working theory for this pair of LC circuits by hooking up one to a function generator in parallel and another to an oscilloscope in parallel. We saw some power transfer, so we decided to continue with inductive charging. We took a pause on developing this more to work on breadboarding other subsystems of our spherical robot, such as the gyroscope, H-bridges, and a clock circuit. An H-bridge is formed by four switching components (often MOSFETs) and used to switch a higher power supply from a lower one using a PWM signal. H-bridges can be used as inverters (a type of circuit that converts a DC power source to an AC power source). Below is an example H-bridge circuit:
            
            <p>H-bridges can be made in such a way that they can control inductive loads safely. Inductors convert current into a magnetic field. This magnetic field is what allows them to transfer power wirelessly. Unfortunately, when an inductor no longer receives current, the magnetic field collapses and sends a lot of current into the circuit for a brief amount of time. This can fry sensitive components. We planned to use an H-bridge as an inverter to drive our transmitting circuit (one of the LC circuits we made at the top).
            
            <p>We also made a clock circuit. This was to generate the PWM signal needed for the H-bridge. We used a fairly standard Pierce oscillator to generate the signal. We learned that the rule of thumb for wireless charging seemed to be that a higher frequency would transmit power more effectively, and using components from the ECE stockroom on Olin’s campus, it was fairly easy to build a >1 MHz oscillator. We planned to adjust the resonant frequency of our LC circuit pair to somewhere in the >1 MHz range, using the knowledge that the resonant frequency of an LC circuit is f = 1/(2π × √(L*C)), where L is the inductance and C is the capacitance.
            
            <p>We decided to put a full bridge rectifier for the LC receiving circuit on the PCB. We decided that we would use a voltage doubler after the rectifier in order to boost the voltage on the receiving end because we expected significant losses in transmission and diode losses. </p>`,
            images: ['/path-to-sprint1-image1.jpg', '/path-to-sprint1-image2.jpg'], // Replace with actual image paths
        },
        {
            title: "Sprint 2",
            content: `<p>We created a pair of transmitting and receiving coils, using a more purposeful winding method that ensured the coils were as consistent as we could make them. The transmitting coil had a center tap in order to test different possible transmitting circuit designs in case it was necessary to do so. We determined the resonant frequency for our circuit by measuring the resistance of the circuit using a function generator and oscilloscope at various frequencies. Since the LC circuit acts as a resistor when at resonance, we can determine the resonant frequency of our coils through using a capacitor and finding what frequency gives the highest amplitude when both an oscilloscope and frequency generator are placed in series with the LC circuit. If we use a capacitor of known value, we can then solve for inductance through the formula (f = 1/(2π × √(L*C))). We found about 83 uH of inductance for both the transmitting and receiving coils. We decided to keep the resonant frequency of our LC circuit low at 14.2 kHz, because we could hear if the coils were working (due to coil whine) and this helped greatly when trying to diagnose issues with inductive power transfer.

            <p>We tested transmitting and receiving power using H-bridges that we originally bought for the motors, using a function generator to provide the PWM signal to the H-bridge, the output of which we would use to drive the transmitting LC circuit. This ended up frying one of our H-bridges. We then tried to use a NPN transistor in a class A power amplifier configuration. We got some voltage out on the receiving coil, though the circuit was highly inefficient and kept drawing too much current out of our power supply.
            
            <p>Through trial and error, we found that the circuit below happened to work and was relatively efficient:
            
            <p>We were unsure of how the circuit functioned at the time, and this combined with mistakes in probing the circuit led us to hold off on integrating wireless power transfer until Sprint 3. </p>`,
            images: ['/path-to-sprint2-image1.jpg'], // Replace with actual image paths
        },
        {
            title: "Sprint 3",
            content: `<p>Through research, we found that the circuit experimented with in Sprint 2 was a special case of a Royer oscillator. We decided to investigate using a related circuit, a zero voltage switching (ZVS) driver. A ZVS driver works by using a parallel LC circuit to charge and discharge a normally off switching element. When voltage builds up on one side of the LC circuit, it causes a switching element on the other side to turn on and sink current. This decreases the voltage on that side and increases it on the other side, which switches on the switching element on the original side. Power is sourced from the center tap. The power source often has an inductor in series to smooth the current draw of the circuit. We also added a diode to the power source to help protect the power supply further. The final circuit uses a ZVS driver with protection on the MOSFET switching elements. We found that 13v Zener diodes for protecting the gate of the MOSFET balanced power transfer and efficiency the best, though usually a ZVS driver has more circuitry (voltage dividers, extra silicon diodes, etc.) that protect the gates.

            <p>We tested the system and found that it generated a high amplitude AC signal that was around 28v peak to peak on our transmitting coil, even though we were feeding in the circuit with 5v. 
            On the output end, we received a signal that was around 18v peak to peak (with no load attached). Since the linear regulator on the PCB is only rated up to 20v, we decided that we could only feed in 5v to our transmitting current safely, in the case that there was no current draw at the receiving end.
            We knew that we can quite effectively transfer voltage, but still had to test power transfer through testing current (since P=IV). We know that our battery charges at 4.2v. We tested the current that we could draw through the wireless charging system by probing test points on our PCB with a discharged battery attached alongside the transmitting and receiving end. We saw around 10 mA of current passing through the battery. This means that we are transferring around 0.042 watts, which is very poor.
            
            <p>We decided to continue integrating our coils into the final prototype. Our coils had the limitation of slower charging rate, but sufficed for a demonstration of functionality. We transferred our circuit to perfboard. The main limitation of power transfer results from a low coupling coefficient that prevents current from being effectively transferred. 
            
            We have been modeling the transmitting and receiving inductor as a transformer. Transformers have a property that is referred to as the coupling coefficient, which ranges from 0 to 1. The greater the coupling coefficient, the greater the change in current of one inductor propagates to the other inductor. Since we are transferring AC voltage across the inductors, the coupling coefficient matters greatly in transferring not only voltage, but also power. This coupling coefficient relates to roughly how much of a magnetic field the two inductors share. For wireless power transfer, a common technique is to use ferrite plates on the inductors to shape the magnetic fields towards each other. Still, wireless power transfer commonly has a coupling coefficient of around 0.10 - 0.20. For real world transformers (which are wound together around a single ferrite core), the coupling coefficient is closer to 0.95 - 0.99.
            
            <p>Increasing frequency also tends to help the performance of the wireless power transfer system, up to a point. The issue with increasing frequency are losses due to the skin effect, which are mitigated in commercial wireless power transfer systems using Litz wire. Though we found some of it at Olin, we had a very hard time winding it into a consistent coil.
            
            The voltage doubler on the PCB was also deemed unnecessary because a higher voltage was conducive to more energy received on the receiving coil, which was beneficial. We did not get to test this in depth before demo day, however.
            
            There are also issues with using a ZVS driver and our transmitting coil. Our transmitting coil was oscillating at a higher frequency with the ZVS driver, which differs from the receiving coil’s resonant frequency of 14.2 kHz. We think this is because only half of the coil is switching at a time (due to receiving power from the center tap), though it may also be from other inductive effects that arise when the coils are placed together. </p>`,
            images: ['/path-to-sprint3-image1.jpg', '/path-to-sprint3-image2.jpg'], // Replace with actual image paths
        },
    ];

    return (
        <div className="main-content" style={{ maxWidth: '70%', margin: 'auto' }}>
            <h1>Induction Charger Development</h1>
            {sprintContents.map((sprint, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    <h2>{sprint.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: sprint.content }} />
                    <Slider {...carouselSettings}>
                        {sprint.images.map((image, idx) => (
                            <div key={idx}>
                                <img src={image} alt={`Sprint ${index + 1} Image ${idx + 1}`} style={{ width: '100%', height: 'auto' }} />
                            </div>
                        ))}
                    </Slider>
                </div>
            ))}
        </div>
    );
}

export default Induction;
