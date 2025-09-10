// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav style={styles.navbar}>
//       <h2 style={styles.logo}>🛒 ShopMate</h2>
//       <div style={styles.links}>
//         <Link to="/" style={styles.link}>Products</Link>
//         <Link to="/cart" style={styles.link}>Cart</Link>
//         <Link to="/chat" style={styles.link}>Chatbot</Link>
//       </div>
//     </nav>
//   );
// }

// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     background: "#1976d2",
//     color: "white"
//   },
//   logo: { margin: 0 },
//   links: { display: "flex", gap: "15px" },
//   link: { color: "white", textDecoration: "none", fontWeight: "bold" }
// };

// export default Navbar;
// src/Components/Navbar.js
// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Navbar = () => {
//   const { cart } = useContext(AppContext);
//   return (
//     <nav style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//         <Link to="/" style={{ textDecoration: "none", fontWeight: 700, fontSize: 18, color: "#111827" }}>
//           MyEcom
//         </Link>
//       </div>

//       <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//         <Link to="/cart" style={{ textDecoration: "none" }}>
//           Cart ({cart.length})
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#1E3A8A", // Change this to any color you like
        padding: "10px 20px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          padding: 0,
          color: "white",
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
            ShopMate
          </Link>
        </li>
        <div style={{ display: "flex", gap: "20px" }}>
          <li>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
              Cart
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;


