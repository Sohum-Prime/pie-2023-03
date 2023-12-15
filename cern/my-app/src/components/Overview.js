import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Overview() {
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

    const images = [
        '/images/10 Photo Booth.jpg', // Replace with actual image paths
        '/images/20 Stairs.jpg',
        '/images/30 Water Fountains.jpg',
        '/images/40 Tubes.jpg',
        '/images/50 Drill Presses.jpg',
        '/images/60 Printers.jpg'
    ];

    const budgetItems = [
        { name: 'Fast Motors (600 RPM @ 12V)', qtyPerPkg: 1, pkg: 6, unitCost: 8.99, totalCost: 53.94 },
        { name: 'Slow Motors (104 RPM @ 12V)', qtyPerPkg: 3, pkg: 2, unitCost: 9.99, totalCost: 19.98 },
        { name: 'Baubles', qtyPerPkg: 10, pkg: 1, unitCost: 19.99, totalCost: 19.99 },
        { name: 'H-Bridges (L9110S)', qtyPerPkg: 5, pkg: 1, unitCost: 7.79, totalCost: 7.79 },
        { name: 'Screws (M3x5)', qtyPerPkg: 750, pkg: 1, unitCost: 9.59, totalCost: 9.59 },
        { name: 'Digikey Parts Order', qtyPerPkg: 3, pkg: 1, unitCost: 88.28, totalCost: 88.28 },
        { name: 'JLCPCB Boards Order', qtyPerPkg: 5, pkg: 1, unitCost: 9.8, totalCost: 9.8 },
        { name: 'Pin Headers (2.54mm)', qtyPerPkg: 20, pkg: 1, unitCost: 10.61, totalCost: 10.61 },
        { name: 'JST-XH Connectors', qtyPerPkg: 100, pkg: 1, unitCost: 8.49, totalCost: 8.49 },
        { name: 'Batteries (1S 3000mAh)', qtyPerPkg: 4, pkg: 1, unitCost: 28.86, totalCost: 28.86 },
        { name: 'Adafruit Wireless Coil Set', qtyPerPkg: 1, pkg: 1, unitCost: 14.3, totalCost: 14.3 },
        { name: 'ESP32-WROOM DevKit', qtyPerPkg: 3, pkg: 1, unitCost: 17.99, totalCost: 17.99 },
        { name: 'IMU (GY-521; MPU6050)', qtyPerPkg: 3, pkg: 1, unitCost: 9.99, totalCost: 9.99 },
        { name: 'Metal Balls (D0.5" Steel)', qtyPerPkg: '-', pkg: 48, unitCost: 0.14, totalCost: 6.72 },
        { name: 'Misc. Electrical', qtyPerPkg: '-', pkg: 1, unitCost: 5, totalCost: 5 }
    ];

    return (
        <div className="main-content" style={{ maxWidth: '70%', margin: 'auto' }}>
            <h1>Overview</h1>
            <p style={{ textAlign: 'justify' }}>Normal Spheros can cost upwards of $180. We wanted to design and build a budget Sphero with the main features of the real one. Some features we aimed to include were: two-axis control, Bluetooth compatibility, inductive charging, and smooth driving. We managed to get the unit cost down to $85 with all of these features implemented. We implemented a custom frame design, custom PCB, and custom control firmware/software.</p>

            <Slider {...carouselSettings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
                    </div>
                ))}
            </Slider>

            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <h2>System Architecture</h2>
                <img src="/images/70 System Diagram.png" alt="System Diagram" style={{ maxWidth: '60%', height: 'auto' }} />
                <p style={{ maxWidth: '80%', margin: 'auto' }}>Description of the system architecture...</p>
            </div>

            <h2>Budget Overview</h2>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', border: `1px solid var(--accent)`, marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: `1px solid var(--accent)`, padding: '8px' }}>Item</th>
                        <th style={{ border: `1px solid var(--accent)`, padding: '8px' }}>Qty/Pkg</th>
                        <th style={{ border: `1px solid var(--accent)`, padding: '8px' }}>Pkg</th>
                        <th style={{ border: `1px solid var(--accent)`, padding: '8px' }}>Unit Cost</th>
                        <th style={{ border: `1px solid var(--accent)`, padding: '8px' }}>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {budgetItems.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: `1px solid var(--accent)`, padding: '8px' }}>{item.name}</td>
                            <td style={{ border: `1px solid var(--accent)`, padding: '8px' }}>{item.qtyPerPkg}</td>
                            <td style={{ border: `1px solid var(--accent)`, padding: '8px' }}>{item.pkg}</td>
                            <td style={{ border: `1px solid var(--accent)`, padding: '8px' }}>${item.unitCost.toFixed(2)}</td>
                            <td style={{ border: `1px solid var(--accent)`, padding: '8px' }}>${item.totalCost.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Overview;
