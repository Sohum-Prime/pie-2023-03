import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/Home';
import Team from './components/Team';
import Mechanical from './components/Mechanical';
import Electrical from './components/Electrical';
import Software from './components/Software';
import Overview from "./components/Overview";
import Induction from "./components/Induction";
import Firmware from './components/Firmware';
import './stylesheets/styles.css';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme); // Save theme preference
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Router>
      <nav style={{ position: 'relative' }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/overview">Overview</Link> |{" "}
        <Link to="/mechanical">Mechanical</Link> |{" "}
        <Link to="/electrical">Electrical</Link> |{" "}
        <Link to="/induction">Induction</Link> |{" "}
        <Link to="/software">Software</Link> |{" "}
        <Link to="/firmware">Firmware</Link> |{" "}
        <Link to="/team">Team</Link>
        <div className="theme-switch-wrapper">
          <label className="theme-switch" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
            <div className="slider round"></div>
          </label>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mechanical" element={<Mechanical />} />
        <Route path="/electrical" element={<Electrical />} />
        <Route path="/software" element={<Software />} />
        <Route path="/team" element={<Team />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/induction" element={<Induction />} />
        <Route path="/firmware" element={<Firmware />} />
      </Routes>
    </Router>
  );
}

export default App;




// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Home from './components/Home';
// import AboutUs from './components/AboutUs';
// import Mechanical from './components/Mechanical';
// import Electrical from './components/Electrical';
// import Software from './components/Software';
// import './stylesheets/styles.css';

// function App() {
//   const [theme, setTheme] = useState('dark');

//   useEffect(() => {
//     const storedTheme = localStorage.getItem('theme') || 'light';
//     setTheme(storedTheme);
//     document.documentElement.setAttribute('data-theme', storedTheme);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     localStorage.setItem('theme', newTheme); // Save theme preference
//     setTheme(newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//   };

//   return (
//     <Router>
//       <nav style={{ position: 'relative' }}>
//         <Link to="/">Home</Link> |{" "}
//         <Link to="/mechanical">Mechanical</Link> |{" "}
//         <Link to="/electrical">Electrical</Link> |{" "}
//         <Link to="/software">Software</Link> |{" "}
//         <Link to="/about-us">About Us</Link>
//         <div className="theme-switch-wrapper">
//           <label className="theme-switch" htmlFor="checkbox">
//             <input type="checkbox" id="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
//             <div className="slider round"></div>
//           </label>
//         </div>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/mechanical" element={<Mechanical />} />
//         <Route path="/electrical" element={<Electrical />} />
//         <Route path="/software" element={<Software />} />
//         <Route path="/about-us" element={<AboutUs />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;