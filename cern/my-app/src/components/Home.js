import React, { useEffect } from "react";

// Inline styles for the home container
const homeStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundImage: 'url(Particle-Accelerator-Aesthetic.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
};

// Inline styles for title and subtitle
const titleStyle = {
    fontSize: '108px', // Example size, adjust as needed
    fontFamily: "'Orbitron', sans-serif" // Futuristic font
};

const subtitleStyle = {
    fontSize: '42px', // Example size, adjust as needed
    fontFamily: "'Orbitron', sans-serif" // Futuristic font
};

function Home() {
    useEffect(() => {
        // Add the 'no-scroll' class to the body when the component mounts
        document.body.classList.add('no-scroll');

        // Remove the 'no-scroll' class when the component unmounts
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div style={homeStyle}>
            <h1 style={titleStyle}>C.E.R.N</h1>
            <h3 style={subtitleStyle}>Centripetal Electronic Robotic Navigator</h3>
            {/* Other content */}
        </div>
    );
}

export default Home;
