import React from "react";
import SprintReview from './SprintReview'; // Import the SprintReview component

function Software() {
    const sprintReviews = [
        {
            title: 'Sprint 2',
            content: `
            Our software, written in Python, serves as a remote control interface for the robot. Using the Pygame library, this script captures keypresses on a computer and translates them into control signals for the robot. It establishes a Bluetooth serial connection with the ESP32, allowing the user to remotely control the robot's movements by pressing 'W', 'S', 'A', or 'D' keys. Notable improvements in this Python script include a graphical user interface displaying real-time control information, a cleaner shutdown process upon closing the Pygame window, and a more sophisticated control mechanism that enables gradual increments and decrements of control signals based on keypress duration. The rate at which motor commands were sent over the Bluetooth serial connection had to be controlled in Python to prevent overflowing the serial buffer. This is how we were able to connect the firmware to the software.
            `,
            imageUrl: '/images/570 Python WASD Code.png' // Embedded
        },
        {
            content: `
            The Python script utilizes the "open_serial_port" function to establish a Bluetooth connection with the ESP32 using the MAC address of the ESP and an open radio frequency communication port. It continuously sends control signals, based on keypresses, over the Bluetooth serial connection. The software significantly enhances the user interface for controlling the robot, providing a more intuitive and responsive means of steering and maneuvering the robot remotely. Together, these sets of code represent a comprehensive control system for the robot, addressing limitations of the initial iteration and offering a more sophisticated and user-friendly remote control experience. The improvements in the second iteration contribute to a more robust and versatile robotic control system, allowing for a smoother and more interactive user experience.
            `,
            imageUrl: '/images/580 Yellow GUI.png' // Embedded
        },
        {
            title: 'Sprint 3',
            content: `
            A notable addition in the software is the LED code control section. The code now responds to numeric keys (0-9) for triggering specific LED color codes, providing a more visual and interactive user interface. Additionally, real-time battery voltage reading was incorporated into the code, offering users immediate feedback on the robot's power level.
            `,
            imageUrl: '/images/590 LED Control Code.png' // Embedded
        },
        {
            content: `
            <p>Furthermore, the software introduces a novel functionality to address motor control nuances. Specifically, a slowdown mechanism was incorporated to govern the behavior of the motors when the 'W' or 'S' key is released. This feature aims to enhance user experience and control precision by gradually slowing down the motors instead of abruptly stopping them. The concept is implemented using timers and conditional statements, ensuring a smoother response when users release the forward ('W') or backward ('S') keys.</p>
            <p>The battery voltage is read from the serial port and displayed in the console. This feature provides real-time feedback on the battery status, enhancing user awareness of the robot's power level. This allows for the robot to be powered off either manually via the control interface, or automatically if the robot’s voltage is under 3.1 V.</p>
            <p>This enhancement showcases a focus on optimizing the robot's control dynamics, demonstrating a commitment to user-friendly and responsive motor control. The introduction of the slowdown function adds a layer of sophistication to the code, addressing the subtleties of motor behavior during user interactions and ultimately improving the overall controllability of the robot.</p>
            <p>The introduction of extensive LED control features stands out in the new design. The robot incorporates LEDs on two sets, and these LEDs are manipulated based on various conditions. The LEDs provide visual feedback to the user, indicating the tilt state, specific control commands, and even LED color codes triggered by numeric keys. This addition enhances the user experience and makes the robot's behavior more communicative.</p>
            <p>Collectively, these changes transform the robot into a more versatile and user-friendly platform, with enhanced control features, interactive LED feedback, and improved sensor integration.</p>
            `,
            imageUrl: '/images/600 Final Software and Firmware Architecture.png' // Embedded
        },
        // Add more sprints as needed
    ];

    return (
        <div className="main-content" style={{ maxWidth: '70%', margin: 'auto' }}>
            <h1>Software</h1>
            <p>Insights into the software development for motor control, gyroscope data handling, and Bluetooth communication.</p>
            {sprintReviews.map((sprint, index) => (
                <div key={index} style={{ border: '1px solid var(--accent)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                    <h2>{sprint.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: sprint.content }} style={{ textAlign: 'justify' }} />
                    <div style={{ textAlign: 'center' }}>
                        <img src={sprint.imageUrl} alt={`Sprint ${index + 2} Image`} style={{ maxWidth: '60%', height: 'auto', margin: '20px 0' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Software;
