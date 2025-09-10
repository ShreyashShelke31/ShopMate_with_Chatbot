// src/Components/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "http://127.0.0.1:8000";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
      alert("Registered! You can now log in.");
    } catch (err) {
      alert("Register failed: " + err.message);
    }
  };

  const doLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || JSON.stringify(data));
      // data.access_token contains JWT
      login(data.access_token, { username });
      alert("Login successful");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 420 }}>
      <h3>Login / Register</h3>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={doLogin} style={{ padding: "8px 12px" }}>Login</button>
        <button onClick={register} style={{ padding: "8px 12px" }}>Register</button>
      </div>
    </div>
  );
}
