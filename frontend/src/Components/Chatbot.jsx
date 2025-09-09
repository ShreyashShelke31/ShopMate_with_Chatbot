// src/components/Chatbot.js
// import React, { useEffect, useState } from "react";

// const API_BASE = "http://127.0.0.1:8000";

// function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [sessionId, setSessionId] = useState("default");
//   const [sessions, setSessions] = useState(["default"]);

//   useEffect(() => {
//     fetchHistory();
//   }, [sessionId]);

//   const fetchHistory = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/chat/history?session=${sessionId}`);
//       const data = await res.json();
//       setMessages(data || []);
//     } catch (err) {
//       console.error("Error fetching history:", err);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input) return;
//     const userMsg = { role: "user", message: input, ts: Date.now() / 1000 };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     try {
//       const res = await fetch(`${API_BASE}/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input, session: sessionId }),
//       });
//       const data = await res.json();
//       const botReply = data.reply;
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", message: botReply, ts: Date.now() / 1000 },
//       ]);
//       fetchHistory();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send message to chatbot. Is the backend running?");
//     }
//   };

//   const newChat = () => {
//     const newId = `session_${Date.now()}`;
//     setSessions((prev) => [...prev, newId]);
//     setSessionId(newId);
//     setMessages([]);
//   };

//   return (
//     <section className="panel chat-panel">
//       <h2>💬 Chatbot</h2>

//       {/* Buttons */}
//       <div style={{ marginBottom: "10px" }}>
//         <button onClick={newChat}>+ New Chat</button>
//         <span style={{ marginLeft: "10px", fontWeight: "bold" }}>History</span>
//         <select
//           value={sessionId}
//           onChange={(e) => setSessionId(e.target.value)}
//           style={{ marginLeft: "10px" }}
//         >
//           {sessions.map((s, i) => (
//             <option key={i} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Chat Window (same UI as before) */}
//       <div className="chat-window">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={m.role === "user" ? "chat-row user" : "chat-row bot"}
//           >
//             <div className="bubble">{m.message}</div>
//           </div>
//         ))}
//       </div>

//       {/* Input box (same UI as before) */}
//       <div className="chat-input">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask something..."
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </section>
//   );    
// }

// export default Chatbot;

import React, { useEffect, useState, useRef } from "react";

const API_BASE = "http://127.0.0.1:8000";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("default");
  const [sessions, setSessions] = useState(["default"]);
  const [loading, setLoading] = useState(false); // bot typing indicator
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, [sessionId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/chat/history?session=${sessionId}`);
      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", message: input, ts: Date.now() / 1000 };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, session: sessionId }),
      });
      const data = await res.json();
      const botReply = { role: "bot", message: data.reply, ts: Date.now() / 1000 };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", message: "⚠️ Failed to reach bot. Try again.", ts: Date.now() / 1000 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    const newId = `session_${Date.now()}`;
    setSessions((prev) => [...prev, newId]);
    setSessionId(newId);
    setMessages([]);
  };

  return (
    <section className="panel chat-panel" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>💬 Chatbot</h2>

      {/* Session controls */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={newChat} style={{ marginRight: "10px" }}>
          + New Chat
        </button>
        <span style={{ fontWeight: "bold" }}>History:</span>
        <select
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          {sessions.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Chat window */}
      <div
        className="chat-window"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          minHeight: "400px",
          maxHeight: "400px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px",
                borderRadius: "15px",
                backgroundColor: m.role === "user" ? "#007bff" : "#e4e6eb",
                color: m.role === "user" ? "#fff" : "#000",
                wordBreak: "break-word",
              }}
            >
              {m.message}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ fontStyle: "italic", color: "#555" }}>Bot is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input box */}
      <div
        className="chat-input"
        style={{ marginTop: "10px", display: "flex", gap: "10px" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </section>
  );
}

export default Chatbot;

