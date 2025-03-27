import React, { useState, useEffect } from "react";
import { getTextbooks } from "../services/apiService";
import UploadTextbook from "../components/UploadTextbook";
import DownloadTextbook from "../components/DownloadTextbook";
import "../styles.css";

const TextbookMarketplace = () => {
  const [syllabusScheme, setSyllabusScheme] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [textbooks, setTextbooks] = useState([]);

  const departmentSubjects = {
    "Common": {
      "1": ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"],
      "2": ["Applied Chemistry", "Applied Physics", "Mathematics 1", "Mathematics 2"]
    },
    "Aerospace Engineering": {
      "3": ["Aerodynamics-I", "Aircraft Materials and Processes", "Mechanics of Materials", "Thermodynamics", "Mathematics-III"],
      "4": ["Aerodynamics-II", "Aircraft Propulsion", "Flight Mechanics-I", "Structures and Materials", "Mathematics-IV"],
      "5": ["Aircraft Structures-I", "Gas Dynamics", "Flight Mechanics-II", "Control Engineering"],
      "6": ["Aircraft Structures-II", "Computational Fluid Dynamics", "Avionics", "Aircraft Design-I"],
      "7": ["MDNI Project"],
      "8": ["Internship"]
    },
    "Artificial Intelligence & Machine Learning": {
      "3": ["Data Structures and Applications", "Object-Oriented Programming with Java", "Discrete Mathematics", "Digital System Design", "Mathematics-III"],
      "4": ["Design and Analysis of Algorithms", "Database Management Systems", "Operating Systems", "Software Engineering", "Mathematics-IV"],
      "5": ["Artificial Intelligence", "Machine Learning", "Data Mining", "Computer Networks"],
      "6": ["Deep Learning", "Natural Language Processing", "Big Data Analytics", "Cloud Computing"],
      "7": ["MDNI Project"],
      "8": ["Internship"]
    },
    "Computer Science and Engineering": {
      "3": ["Data Structures and Applications", "Analog and Digital Electronics", "Computer Organization", "Object-Oriented Programming with Java", "Discrete Mathematical Structures"],
      "4": ["Design and Analysis of Algorithms", "Microcontroller and Embedded Systems", "Operating Systems", "Software Engineering", "Probability and Statistics"],
      "5": ["Database Management Systems", "Computer Networks", "Automata Theory and Computability", "Unix Programming"],
      "6": ["System Software", "Web Technology and its Applications", "Advanced Computer Architecture"],
      "7": ["MDNI Project"],
      "8": ["Internship"]
    },
    "Electronics & Communication Engineering": {
      "3": ["Network Analysis", "Digital Electronics", "Signals & Systems", "Electronic Circuits", "Engineering Electromagnetics"],
      "4": ["Analog & Digital Communication", "Microcontrollers & Embedded Systems", "Control Systems", "VLSI Design", "Digital Signal Processing"],
      "5": ["Antennas & Microwave Engineering", "Wireless Communication", "Optical Communication", "Artificial Intelligence in Communication", "Internet of Things"],
      "6": ["Robotics & Automation", "Radar & Satellite Communication", "Embedded Systems & IoT", "Biomedical Instrumentation", "Machine Learning for Signal Processing"],
      "7": ["MDNI Project"],
      "8": ["Internship"]
    },
    "Mechanical Engineering": {
      "3": ["Mechanics of Materials", "Thermodynamics", "Fluid Mechanics", "Manufacturing Process - I", "Kinematics of Machines"],
      "4": ["Heat & Mass Transfer", "Dynamics of Machines", "Manufacturing Process - II", "Mechanical Measurements & Instrumentation", "Applied Thermodynamics"],
      "5": ["Design of Machine Elements", "Energy Conversion Systems", "Finite Element Analysis", "Industrial Engineering & Management", "Refrigeration & Air Conditioning"],
      "6": ["CAD/CAM & Automation", "Computational Fluid Dynamics", "Robotics & Mechatronics", "Additive Manufacturing", "Automobile Engineering"],
      "7": ["MDNI Project"],
      "8": ["Internship"]
    },
    "Information Science & Engineering": {
      "3": ["Data Structures and Applications", "Digital Logic Design", "Operating Systems", "Regression in Data Science"],
      "4": ["Computer Organization & Architecture", "Database Management Systems", "Design and Analysis of Algorithms", "Advanced Java Programming"],
      "5": ["Artificial Intelligence & Machine Learning", "Automata and Compiler Design", "Research Methodology and APR"],
      "6": ["Big Data Analytics", "Full-Stack Development", "Software Engineering and Testing", "Data Warehousing and Data Mining"],
      "7": ["MDNI Project"],
      "8": ["Internship"]
    }
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    setSubject("");
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  useEffect(() => {
    if (syllabusScheme && college && department && semester && subject) {
      fetch(
        `/api/textbooks?syllabusScheme=${syllabusScheme}&college=${college}&department=${department}&semester=${semester}&subject=${subject}`
      )
        .then((res) => res.json())
        .then((data) => setTextbooks(data))
        .catch((err) => console.error("Error fetching textbooks:", err));
    }
  }, [syllabusScheme, college, department, semester, subject]);

  return (
    <div className="container">
      {/* Other UI elements remain the same */}
    </div>
  );
};

export default TextbookMarketplace;
