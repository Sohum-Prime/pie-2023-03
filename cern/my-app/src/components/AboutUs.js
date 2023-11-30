import React from "react";
import TeamMember from "./TeamMember"; // Make sure the path is correct

function AboutUs() {
    // Replace with actual data and image paths
    const teamMembers = [
        {
            name: "Sohum K",
            major: "E:Robo",
            interests: "Robotics, AI",
            role: "Jack of all GOATs",
            picture: "/images/sohum.png", // Replace with actual image path
            email: "sohumk@example.com",
            linkedin: "https://www.linkedin.com/in/sohumk",
            github: "https://github.com/sohumk"
        },
        {
            name: "Kevin L",
            major: "ECE:Quantum",
            interests: "Quantum Computing, Controls",
            role: "Controls and Physics",
            picture: "/images/kevin.png", // Replace with actual image path
            email: "kevinl@example.com",
            linkedin: "https://www.linkedin.com/in/kevinl",
            github: "https://github.com/kevinl"
        },
        {
            name: "Venkadesh E",
            major: "ECE",
            interests: "Induction, Deduction",
            role: "Induction and Deduction",
            picture: "/images/venkadesh.png", // Replace with actual image path
            email: "venkadeshe@example.com",
            linkedin: "https://www.linkedin.com/in/venkadeshe",
            github: "https://github.com/venkadeshe"
        },
        {
            name: "Angela H",
            major: "ME",
            interests: "Mechanics, Motor Design",
            role: "Nuts Bolts and Motors, ME: Oh My!",
            picture: "/images/angela.png", // Replace with actual image path
            email: "angelah@example.com",
            linkedin: "https://www.linkedin.com/in/angelah",
            github: "https://github.com/angelah"
        },
        {
            name: "Ari B",
            major: "E:IDK",
            interests: "Electronics, PCB Design",
            role: "Team Lead - Electronics and PCB",
            picture: "/images/ari.png", // Replace with actual image path
            email: "arib@example.com",
            linkedin: "https://www.linkedin.com/in/arib",
            github: "https://github.com/arib"
        }
    ];

    return (
        <div className="main-content" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {teamMembers.map(member => (
                <TeamMember key={member.name} {...member} />
            ))}
        </div>
    );
}

export default AboutUs;