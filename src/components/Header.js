
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Header = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
//     setUser(null);
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const headerStyle = {
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     padding: "15px 0",
//     textAlign: "center",
//   };

//   const h1Style = {
//     fontSize: "2.5rem",
//     marginBottom: "10px",
//   };

//   const navStyle = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//   };

//   const linkStyle = {
//     textDecoration: "none",
//     backgroundColor: "#fff",
//     color: "#4CAF50",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     fontSize: "1rem",
//     cursor: "pointer",
//     transition: "background-color 0.3s, color 0.3s",
//   };

//   const buttonStyle = {
//     ...linkStyle, // Reuse the same styles as links
//   };

//   return (
//     <header style={headerStyle}>
//       <h1 style={h1Style}>Library Management</h1>
//       <nav style={navStyle}>
//         {user ? (
//           <>
//             <Link to="/" style={linkStyle}>Home</Link>
//             <Link to="/my-textbooks" style={linkStyle}>My Textbooks</Link>
//             {/* <Link to="/upload" style={linkStyle}>Upload</Link> */}
//             <button onClick={handleLogout} style={buttonStyle}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" style={linkStyle}>Login</Link>
//             <Link to="/register" style={linkStyle}>Register</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// const Footer = () => {
//   const footerStyle = {
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     textAlign: "center",
//     padding: "20px 0",
//     position: "relative",
//     bottom: "0",
//     width: "100%",
//   };

//   const pStyle = {
//     margin: "0",
//     fontSize: "1rem",
//   };

//   return (
//     <footer style={footerStyle}>
//       <p style={pStyle}>&copy; 2025 Library Management. All rights reserved.</p>
//     </footer>
//   );
// };

// export { Header, Footer };
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const headerStyles = {
  header: {
    backgroundColor: "#00264d",
    color: "white",
    padding: "1.5rem 3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  h1: {
    margin: 0,
    fontSize: "2.2rem",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    backgroundColor: "#0066cc",
    transition: "all 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#004d99",
  },
  button: {
    backgroundColor: "#cc0000",
    border: "none",
    color: "white",
    fontSize: "1.1rem",
    fontWeight: "600",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#00264d",
    color: "white",
    marginTop: "2rem",
  }
};

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header style={headerStyles.header}>
      <h1 style={headerStyles.h1}>Library Management</h1>
      <nav style={headerStyles.nav}>
        {user ? (
          <>
            <Link to="/" style={headerStyles.link}>🏠 Home</Link>
            <Link to="/my-textbooks" style={headerStyles.link}>📚 My Textbooks</Link>
            <button onClick={handleLogout} style={headerStyles.button}>🚪 Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={headerStyles.link}>🔐 Login</Link>
            <Link to="/register" style={headerStyles.link}>📝 Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer style={headerStyles.footer}>
    <p>&copy; 2025 Library Management. All rights reserved.</p>
  </footer>
);

export { Header, Footer };