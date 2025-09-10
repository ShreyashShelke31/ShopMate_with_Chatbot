// src/Components/ChatbotPanel.js
import React, { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const initialBotMsg = "Hi — I only respond to app commands. Type `help` to see commands.";

const ChatbotPanel = () => {
  const { products, cart, addToCart, removeFromCart, clearCart, getProductById } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", message: initialBotMsg }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const pushBot = (text) => {
    setMessages((m) => [...m, { role: "bot", message: text }]);
  };

  const pushUser = (text) => {
    setMessages((m) => [...m, { role: "user", message: text }]);
  };

  const runCommand = async (raw) => {
    const cmd = (raw || "").trim();
    const lc = cmd.toLowerCase();

    // Allowed commands:
    // help
    // show products
    // show cart
    // cart total
    // add <id>
    // remove <id>
    // clear cart
    // open cart / go to cart

    if (!lc) return "Please enter a command. Type `help`.";

    if (lc === "help") {
      return (
        "Commands:\n" +
        "- help\n" +
        "- show products (lists id and title, limited)\n" +
        "- show cart (lists titles in cart)\n" +
        "- cart total\n" +
        "- add <product id>\n" +
        "- remove <product id>\n" +
        "- clear cart\n" +
        "- open cart (navigates to cart page)"
      );
    }

    if (lc === "show products") {
      if (!products || products.length === 0) return "No products available.";
      // show first 10 id: title lines
      return products
        .slice(0, 10)
        .map((p) => `${p.id}: ${p.title.length > 60 ? p.title.slice(0, 57) + "..." : p.title}`)
        .join("\n");
    }

    if (lc === "show cart") {
      if (!cart || cart.length === 0) return "Your cart is empty.";
      return cart.map((c) => `${c.id}: ${c.title}`).join("\n");
    }

    if (lc === "cart total") {
      const total = (cart || []).reduce((s, it) => s + (it.price || 0), 0);
      return `Cart total: $${total.toFixed(2)}`;
    }

    if (lc.startsWith("add ")) {
      const part = lc.slice(4).trim();
      const id = part.split(" ")[0];
      const product = getProductById(id);
      if (!product) return `Product with id "${id}" not found.`;
      const ok = addToCart(product);
      return ok ? `✅ Added "${product.title}" to cart.` : `⚠️ "${product.title}" is already in cart.`;
    }

    if (lc.startsWith("remove ")) {
      const part = lc.slice(7).trim();
      const id = part.split(" ")[0];
      const product = getProductById(id) || cart.find((c) => String(c.id) === id);
      if (!product) return `Product with id "${id}" not found in products or cart.`;
      removeFromCart(product.id);
      return `Removed "${product.title}" from cart.`;
    }

    if (lc === "clear cart") {
      clearCart();
      return "Cart cleared.";
    }

    if (lc === "open cart" || lc === "go to cart") {
      navigate("/cart");
      return "Opening cart page...";
    }

    return "❌ Unknown command. Type `help` for available commands.";
  };

  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    pushUser(text);
    setInput("");
    setLoading(true);

    // show typing for a short moment for UX
    setTimeout(async () => {
      try {
        const reply = await runCommand(text);
        pushBot(reply);
      } catch (err) {
        console.error(err);
        pushBot("⚠️ Error executing command.");
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((s) => !s)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 2000,
          padding: "10px 14px",
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          background: "#f59e0b",
          color: "#000",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        }}
        aria-label="Toggle chat"
      >
        💬
      </button>

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          right: open ? 0 : -340,
          top: 0,
          height: "100vh",
          width: 340,
          background: "#fff",
          borderLeft: "1px solid #e6e6e6",
          boxShadow: open ? "-8px 0 30px rgba(0,0,0,0.08)" : "none",
          zIndex: 1999,
          transition: "right 280ms ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 12, borderBottom: "1px solid #f1f1f1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ fontSize: 18 }}>🛒 Nexa</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Shreyash Shelke</div>
          </div>
          <div>
            <button onClick={() => setOpen(false)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
              ✖
            </button>
          </div>
        </div>

        <div style={{ padding: 12, flex: 1, overflowY: "auto", background: "#f9fafb" }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{ marginBottom: 10, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div
                style={{
                  background: m.role === "user" ? "#f59e0b" : "#fff",
                  color: m.role === "user" ? "#000" : "#111827",
                  padding: "8px 10px",
                  borderRadius: 8,
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                  boxShadow: m.role === "bot" ? "0 1px 2px rgba(0,0,0,0.04)" : undefined,
                }}
              >
                {m.message}
              </div>
            </div>
          ))}

          {loading && <div style={{ fontStyle: "italic", color: "#6b7280" }}>Bot is typing...</div>}
          <div ref={chatEndRef} />
        </div>

        <div style={{ padding: 10, borderTop: "1px solid #f1f1f1", display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a command (help)"
            style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb" }}
            aria-label="Chat input"
          />
          <button
            onClick={send}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "none",
              background: "#06b6d4",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>

        <div style={{ padding: 8, textAlign: "center", fontSize: 11, color: "#6b7280" }}>
          Powered by ShopMate Assistant — Shreyash Shelke
        </div>
      </div>
    </>
  );
};

export default ChatbotPanel;
