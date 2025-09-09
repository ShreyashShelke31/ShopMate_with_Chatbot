// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Chatbot from "./Components/Chatbot";  // 👈 Import our new Chatbot component

// const API_BASE = "http://127.0.0.1:8000";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "" });
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const sessionId = "default";

//   useEffect(() => {
//     fetchProducts();
//     fetchCart();
//     fetchHistory();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/products`);
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch products from backend. Is the backend running?");
//     }
//   };

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/cart`);
//       setCart(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addToCart = async (id) => {
//     try {
//       const res = await axios.post(`${API_BASE}/cart/${id}`);
//       setCart(res.data.cart);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add to cart");
//     }
//   };

//   const addProduct = async () => {
//     if (!newProduct.name || !newProduct.price) return alert("Enter name and price");
//     try {
//       const payload = { name: newProduct.name, price: parseFloat(newProduct.price) };
//       const res = await axios.post(`${API_BASE}/products`, payload);
//       setProducts(prev => [...prev, res.data]);
//       setNewProduct({ name: "", price: "" });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add product");
//     }
//   };

//   const clearCart = async () => {
//     try {
//       await axios.delete(`${API_BASE}/cart`);
//       setCart([]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/chat/history?session=${sessionId}`);
//       setMessages(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input) return;
//     const userMsg = { role: "user", message: input, ts: Date.now()/1000 };
//     setMessages(prev => [...prev, userMsg]);
//     try {
//       const res = await axios.post(`${API_BASE}/chat`, { message: input, session: sessionId });
//       const botReply = res.data.reply;
//       setMessages(prev => [...prev, { role: "bot", message: botReply, ts: Date.now()/1000 }]);
//       // refresh full history from server
//       fetchHistory();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send message to chatbot. Is the backend running?");
//     }
//     setInput("");
//   };

//   return (
//     <div className="container">
//       <h1>🛒 Ecommerce + Chatbot Demo</h1>

//       <section className="panel">
//         <h2>Products</h2>
//         <div className="products">
//           {products.map(p => (
//             <div key={p.id} className="product">
//               <div><strong>{p.name}</strong></div>
//               <div>₹{p.price}</div>
//               <button onClick={() => addToCart(p.id)}>Add to cart</button>
//             </div>
//           ))}
//         </div>

//         <div className="add-product">
//           <h3>Add Product</h3>
//           <input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
//           <input placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
//           <button onClick={addProduct}>Add</button>
//         </div>
//       </section>

//       <section className="panel">
//         <h2>Cart</h2>
//         <div>
//           {cart.length === 0 && <div>Cart is empty</div>}
//           {cart.map((c, i) => (
//             <div key={i} className="cart-item">
//               {c.name} - ₹{c.price}
//             </div>
//           ))}
//         </div>
//         <button onClick={clearCart}>Clear cart</button>
//       </section>
// {/* 
//       <section className="panel chat-panel">
//         <h2>💬 Chatbot</h2>
//         <div className="chat-window">
//           {messages.map((m, i) => (
//             <div key={i} className={m.role === "user" ? "chat-row user" : "chat-row bot"}>
//               <div className="bubble">{m.message}</div>
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask something..." />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </section> */}
//        <section className="panel chat-panel">
//         {/* <h2>💬 Chatbot</h2> */}
//         <Chatbot />  
//       </section>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Chatbot from "./Components/Chatbot";
import { CartProvider } from "./Components/CartContext"; // Import the Cart Context

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;


