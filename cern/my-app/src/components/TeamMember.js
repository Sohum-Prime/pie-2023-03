import React, { useState } from "react";

function TeamMember({ name, major, interests, role, picture, email, linkedin, github }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const memberStyle = {
        border: `2px solid var(--accent)`,
        margin: '5px',
        padding: '8px',
        borderRadius: '5px',
        transition: 'transform 0.3s ease-in-out',
        cursor: 'pointer',
        width: isExpanded ? '100%' : '18%', // Width remains the same
        height: '90vh', // Height set to 100% of the viewport height
        overflowY: isExpanded ? 'auto' : 'hidden', // Enable scrolling when expanded
        position: 'relative',
        backgroundColor: 'var(--secondary)',
        color: 'var(--text)'
    };

    return (
        <div
            style={memberStyle}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(0.99)'}
        // onClick={() => setIsExpanded(!isExpanded)}
        >
            <img src={picture} alt={name} style={{ width: '100%', borderRadius: '5px', maxHeight: '30vh', objectFit: 'cover' }} />
            <h3>{name}</h3>
            <p><strong>Major:</strong> {major}</p>
            <p><strong>Interests:</strong> {interests}</p>
            <p><strong>Role:</strong> {role}</p>
            {/* <p>
                {email && <a href={`mailto:${email}`}>Email</a>} |
                {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>} |
                {github && <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            </p> */}
            {isExpanded && <div>{/* Additional expanded content here */}</div>}
        </div>
    );
}

export default TeamMember;


// import React, { useState } from "react";

// function TeamMember({ name, major, interests, role, picture, email, linkedin, github }) {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const memberStyle = {
//         border: `2px solid var(--accent)`, // Using accent color for the border
//         margin: '5px',
//         padding: '5px',
//         borderRadius: '5px',
//         transition: 'transform 0.3s ease-in-out',
//         cursor: 'pointer',
//         width: isExpanded ? '100%' : '18%', // Adjusted for 5 elements side by side
//         position: 'relative',
//         backgroundColor: 'var(--secondary)', // Using secondary color for background
//         color: 'var(--text)' // Using text color variable
//     };

//     return (
//         <div
//             style={memberStyle}
//             onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//             onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
//             onClick={() => setIsExpanded(!isExpanded)}
//         >
//             <img src={picture} alt={name} style={{ width: '100%', borderRadius: '5px' }} />
//             <h3>{name}</h3>
//             <p><strong>Major:</strong> {major}</p>
//             <p><strong>Interests:</strong> {interests}</p>
//             <p><strong>Role:</strong> {role}</p>
//             <p>
//                 {email && <a href={`mailto:${email}`}>Email</a>} |
//                 {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>} |
//                 {github && <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>}
//             </p>
//             {isExpanded && <div>{/* Additional expanded content here */}</div>}
//         </div>
//     );
// }

// export default TeamMember;
