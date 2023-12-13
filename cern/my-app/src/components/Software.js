import React from "react";
import SprintReview from './SprintReview'; // Import the SprintReview component

function Software() {
    const sprintReviews = [
        {
            title: 'Sprint 1',
            content: `
                <p>The code for sprint 1 represents the initial iteration of the control system for the robot using an ESP32 microcontroller. In this early stage, the primary focus is on establishing basic functionality and communication between the ESP32 and a paired device over Bluetooth. The code implements fundamental motor control and sensor interaction to enable the robot to respond to directional commands sent from a Bash terminal to the specified Bluetooth MAC address.</p>
                
                <p>However, being a first iteration, the code exhibits certain limitations and areas for potential improvement. The inclusion of blocking delays, limited error handling, and the absence of input validation highlight aspects that can be refined in subsequent iterations. These improvements are crucial for enhancing the overall reliability, responsiveness, and robustness of the robot control system.</p>
                
                <p>As development progresses, future iterations may incorporate additional features, optimizations, and refinements to address these initial challenges. The iterative nature of software development allows for continuous enhancement based on feedback, testing, and evolving requirements. Therefore, this initial implementation serves as a foundational step towards achieving a more sophisticated and feature-rich robot control system.</p>
            `,
            imageUrl: '/path-to-sprint1-software-image.jpg' // Replace with actual image path
        },
        {
            title: 'Sprint 2',
            content: `
                <p>For this sprint, the robot control system consists of two sets of code designed to work in tandem. The first set, written in C++, runs on the microcontroller, transforming it into a robot capable of motorized movement and controlled via Bluetooth. The code includes BluetoothSerial communication and motor control logic for both forward and turning movements.</p>
        
                <p>The second set of code, written in Python, serves as a remote control interface for the robot. Using the Pygame library, this script captures keypresses on a computer and translates them into control signals for the robot. It establishes a Bluetooth serial connection with the ESP32, allowing the user to remotely control the robot's movements by pressing 'W', 'S', 'A', or 'D' keys. Notable improvements in this Python script include a graphical user interface displaying real-time control information, a cleaner shutdown process upon closing the Pygame window, and a more sophisticated control mechanism that enables gradual increments and decrements of control signals based on keypress duration.</p>
        
                <p>The Python script utilizes the 'open_serial_port' function to establish a Bluetooth connection with the ESP32 using the MAC address of the ESP and an open radio frequency communication port. It continuously sends control signals, based on keypresses, over the Bluetooth serial connection. This second set of code significantly enhances the user interface for controlling the robot, providing a more intuitive and responsive means of steering and maneuvering the robot remotely.</p>
        
                <p>One significant challenge encountered during the development of the robot control system was managing the ESP32 serial buffer when communicating with the Python script over Bluetooth. The ESP32's serial buffer has a limited capacity, and sending data too quickly could potentially lead to buffer overflow issues. To address this challenge, a careful balance had to be struck in the C++ code running on the ESP32. The rate at which motor commands were sent over the Bluetooth serial connection had to be controlled in Python to prevent overflowing the serial buffer. Implementing these measures required a trade-off between the responsiveness of the robot's movements and the risk of buffer overflow. This challenge underscores the intricacies involved in maintaining effective communication between different components in embedded systems, particularly when dealing with limited resources such as serial buffers on microcontrollers like the ESP32.</p>
            `,
            imageUrl: '/path-to-sprint2-software-image.jpg' // Replace with actual image path
        },
        {
            title: 'Sprint 3',
            content: `
                <p>A notable addition in the Python code is the LED code control section. The code now responds to numeric keys (0-9) for triggering specific LED color codes, providing a more visual and interactive user interface. Additionally, real-time battery voltage reading was incorporated into the code, offering users immediate feedback on the robot's power level.</p>
        
                <p>The Python code introduces a novel functionality to address motor control nuances. Specifically, a slowdown mechanism was incorporated to govern the behavior of the motors when the 'W' or 'S' key is released. This feature aims to enhance user experience and control precision by gradually slowing down the motors instead of abruptly stopping them. The concept is implemented using timers and conditional statements, ensuring a smoother response when users release the forward ('W') or backward ('S') keys.</p>
        
                <p>The slowdown function is designed to progressively decrease the motor power when either the 'W' or 'S' key is released, gradually bringing the robot to a halt. This contributes to more refined and nuanced control, particularly useful in scenarios where abrupt stops might impact the robot's x-axis stability. The implementation involves tracking the time since the key release and incrementally reducing the motor power at regular intervals, creating a deceleration effect.</p>
        
                <p>The introduction of extensive LED control features stands out in the new design. The robot incorporates LEDs on two sets, and these LEDs are manipulated based on various conditions. The LEDs provide visual feedback to the user, indicating the tilt state, specific control commands, and even LED color codes triggered by numeric keys. This addition enhances the user experience and makes the robot's behavior more communicative.</p>
        
                <p>Integration of the MPU6050 IMU is a notable feature, providing accelerometer data ('accelY_G'). This data is utilized to dynamically adjust the turning power based on the robot's tilt, leading to more responsive and adaptive control. Furthermore, the code includes mechanisms for real-time battery voltage monitoring, enhancing user awareness of the robot's power status.</p>
        
                <p>The Ansatz in the provided C++ code for the MPU6050 sensor reveals a deliberate strategy to address a specific challenge associated with the robot's dynamics—specifically, the rapid sinusoidal oscillations. The rapid oscillations, induced by external factors or inherent characteristics of the robot, pose a challenge to the responsiveness of the turning motors. The linear Ansatz offers a simplified and computationally efficient way to respond to these oscillations, allowing the turning motors to make quick adjustments based on a linear approximation of the robot's orientation.</p>
        
                <p>The power management and shutdown sequence were refined, introducing a tilt switch and a timer ('IDLE_MAX'). The robot now initiates a shutdown sequence if it remains tilted for a specified duration or if no drive input is received for an extended period, contributing to improved safety and energy efficiency.</p>
        
                <p>Collectively, these changes transform the robot into a more versatile and user-friendly platform, with enhanced control features, interactive LED feedback, and improved sensor integration.</p>
            `,
            imageUrl: '/path-to-sprint3-software-image.jpg' // Replace with actual image path
        },
        // Add more sprints as needed
    ];

    return (
        <div className="main-content">
            <h1>Software</h1>
            <p>Insights into the software development for motor control, gyroscope data handling, and Bluetooth communication.</p>
            {sprintReviews.map(sprint => (
                <SprintReview key={sprint.title} {...sprint} />
            ))}
        </div>
    );
}

export default Software;
