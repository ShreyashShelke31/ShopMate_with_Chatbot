import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>🛒 ShopMate</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/chat" style={styles.link}>Chatbot</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#1976d2",
    color: "white"
  },
  logo: { margin: 0 },
  links: { display: "flex", gap: "15px" },
  link: { color: "white", textDecoration: "none", fontWeight: "bold" }
};

export default Navbar;
