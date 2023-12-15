import React from "react";
import SprintReview from './SprintReview'; // Import the SprintReview component


//-----------------------------------COPIED FROM SOFTWARE--------------------------------------

function Software() {
    const sprintReviews = [
        {
            title: 'Sprint 1',
            content: `
            The code for Sprint 1 represents the initial iteration of the control system for the robot using an ESP32 microcontroller. In this early stage, the primary focus is on establishing basic functionality and communication between the ESP32 and a paired device over Bluetooth. The code implements fundamental motor control and sensor interaction to enable the robot to respond to directional commands sent from a Bash terminal to the specified Bluetooth MAC address.                
            `,
            imageUrl: '/images/450 MAC Address.png', // Embedded
            imageUrl: '/images/460 Arduino Test Driving Bluetooth Code.png' // Embedded
        },
        {
            content: `
            <p>However, being a first iteration, the code exhibits certain limitations and areas for potential improvement. The inclusion of blocking delays, limited error handling, and the absence of input validation highlight aspects that can be refined in subsequent iterations. These improvements are crucial for enhancing the overall reliability, responsiveness, and robustness of the robot control system.</p>
            <p>As development progresses, future iterations may incorporate additional features, optimizations, and refinements to address these initial challenges. The iterative nature of software development allows for continuous enhancement based on feedback, testing, and evolving requirements. Therefore, this initial implementation serves as a foundational step towards achieving a more sophisticated and feature-rich robot control system.</p>
                        `,
        },
        {
            title: 'Sprint 2',
            content: `
            For this sprint, the robot control system consists of two sets of code designed to work in tandem. The firmware set, written in C++, runs on the microcontroller, transforming it into a robot capable of motorized movement and controlled via Bluetooth. The code includes BluetoothSerial communication, motor control logic for both forward and turning movements.
            `,
            imageUrl: '/images/470 Arduino Motor Control Code.png' // Embedded
        },
        {
            content: `
            One significant challenge encountered during the development of the robot control system was managing the ESP32 serial buffer when communicating with the Python script over Bluetooth. The ESP32's serial buffer has a limited capacity, and sending data too quickly could potentially lead to buffer overflow issues. Buffer overflow occurs when data is being sent or received at a faster rate than it can be processed, resulting in the loss of information.
            `,
            imageUrl: '/images/480 BT Connectivity Flowchart.png' // Embedded
        },
        {
            content: `
            <p>To address this challenge, a careful balance had to be struck in the C++ code running on the ESP32. This meant introducing delays or pacing mechanisms in the code to ensure that data was transmitted at a rate that the ESP32's serial buffer could handle without loss.</p>
            <p>Implementing these measures required a trade-off between the responsiveness of the robot's movements and the risk of buffer overflow. This challenge underscores the intricacies involved in maintaining effective communication between different components in embedded systems, particularly when dealing with limited resources such as serial buffers on microcontrollers like the ESP32.</p>            
            `,
        },
        {
            title: 'Sprint 3',
            content: `
            Previously, when the forward or reverse keys were released. The robot would have oscillation in the axis of drive which was the y-axis. This is because of the sudden change of velocity that would cause the robot center of mass to pull the Sphero when the spherical shell has stopped which causes it to experience oscillation. This would severely hinder the amount of turning the robot could do in the z-axis which was more significant. The stability of the y-axis isn’t as relevant since the robot is bound to oscillate in the direction of drive. Knowing this, we knew that we needed to slow down the motors before stopping. Since the change in velocity could be linear to reduce the oscillation, we wanted to find out the maximum deceleration of the motor to make the robot stop as quickly as possible without the oscillation. We found that decreasing the PWM Duty cycle by approximately 15% per second was a good value to stabilize the robot in the z-axis.
            `,
            imageUrl: '/images/490 Robot Coordinate Axes.jpg' // Embedded
        },
        {
            content: `
            <p>The slowdown function is designed to progressively decrease the motor power when the user releases the drive keys, gradually bringing the robot to a halt. This contributes to more refined and nuanced control, particularly useful in scenarios where abrupt stops might impact the robot's x-axis stability. The implementation involves tracking the time since the key release and incrementally reducing the motor power at regular intervals, creating a deceleration effect.</p>
            <p>Integration of the MPU6050 IMU is a notable feature, providing accelerometer data ("accelY_G"). This data is utilized to dynamically adjust the turning power based on the robot's tilt, leading to more responsive and adaptive control. Furthermore, the code includes mechanisms for real-time battery voltage monitoring, enhancing user awareness of the robot's power status.</p>
                        `,
            imageUrl: '/images/500 Arduino IMU Code.png' // Embedded
        },
        {
            content: `
            <p>The Ansatz in the provided C++ code for the MPU6050 sensor reveals a deliberate strategy to address a specific challenge associated with the robot's dynamics—specifically, the rapid sinusoidal oscillations. The term "Ansatz" in this context denotes a preliminary assumption or approach, often used in physics and engineering to simplify a complex problem. In this case, the Ansatz involves making a linear approximation to adjust the robot's orientation, acknowledging that the rapid oscillations may exceed the compensatory speed of the turning motors.</p>
            <p>The way we employ this Ansatz is through the following method. If we assume the frame of reference is the center of the robot, we can express the acceleration the robot experiences in a matrix that is skew symmetric which accounts for any orientation the robot may be in. Using this matrix, we can find the eigenvalues of this matrix which will correspond to the motion the robot will experience.</p>
                        `,
            imageUrl: '/images/510 Matrix Math.png' // Embedded
        },
        {
            content: `
            We can then calculate the characteristic polynomial to find the eigenvalues of this matrix. Doing this will provide us with three eigenvalues. One that is guaranteed to be zero, while the other two are complex numbers equal to the total acceleration of the robot which are conjugates of each other.
                        `,
            imageUrl: '/images/520 Determinant Math.png' // Embedded
        },
        {
            content: `
            The acceleration is modeled by the function Zeta. Raising each eigenvalue by e will provide the equation of acceleration for the robot. This implies that without any external forces, the Sphero will exhibit a behavior similar to a simple harmonic oscillator which is an underdamped system. It also means that the acceleration is a superposition of sinusoidal functions of the same frequency in the x, y, and z direction. This severely affects the robot’s overall driving capabilities. The rapid oscillations, induced by external factors or inherent characteristics of the robot, pose a challenge to the responsiveness of the turning motors. As stated before, the turning motors will face some oscillation frequencies that cannot keep up with the speed of the oscillation. For that reason, since we know that the system exhibits a sinusoidal behavior. We can take multiple measurements of a gyroscope and do a small angle approximation of the sinusoid to calculate the current acceleration. 
            `,
            imageUrl: '/images/530 Cosine Wave.gif' // Embedded
        },
        {
            content: `
            Using that calculated factor, we essentially do a Taylor series approximation of the sinusoid to quickly get a tangent line. Using that tangent line, we negate the slope to dampen the oscillation in a quick approximation metric that allows us to dampen the oscillation relatively quickly.
            `,
            imageUrl: '/images/540 Cosine Math.png' // Embedded
        },
        {
            content: `
            <p>The linear Ansatz offers a simplified and computationally efficient way to respond to these oscillations. Instead of attempting to precisely match the sinusoidal patterns, the code makes a linear guess or approximation to adjust the orientation of the robot. This approach is pragmatic, as achieving precise compensation for rapid oscillations might be computationally intensive and impractical in real-time control scenarios.</p>
            <p>By employing a linear Ansatz, the code aims to strike a balance between responsiveness and computational efficiency. It allows the turning motors to make quick adjustments based on a linear approximation of the robot's orientation, providing a practical solution to cope with the challenges posed by rapid sinusoidal oscillations. This strategic choice reflects the engineering trade-offs often made in robotics, where computational resources, response time, and real-world dynamics need to be carefully considered.</p>
            <p>In summary, the linear Ansatz in our firmware acknowledges the challenge posed by the rapid oscillations of the robot and responds with a simplified, linear approximation to adjust the orientation. This approach reflects a practical and strategic choice, balancing the need for responsiveness with computational efficiency in the context of real-time control.</p>
                        `,
            imageUrl: '/images/550 Control Feedback Flowchart.png' // Embedded
        },
        {
            content: `
            The power management and shutdown sequence were refined, introducing a tilt switch and a timer ("IDLE_MAX"). The robot now initiates a shutdown sequence if it remains tilted for a specified duration or if no drive input is received for an extended period, contributing to improved safety and energy efficiency.
                        `,
            imageUrl: '/images/560 Final Firmware Control Flowchart.png' // Embedded
        },
        // Add more sprints as needed
    ];

    return (
        <div className="main-content">
            <h1>Firmware</h1>
            <p>Insights into the software development for motor control, gyroscope data handling, and Bluetooth communication.</p>
            {sprintReviews.map(sprint => (
                <SprintReview key={sprint.title} {...sprint} />
            ))}
        </div>
    );
}

export default Software;
