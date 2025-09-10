
// // export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Products from "./Components/Products";
// import Cart from "./Components/Cart";
// import Chatbot from "./Components/Chatbot";
// import { CartProvider } from "./Components/CartContext"; // Import the Cart Context

// function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <Navbar />
//         <div className="container">
//           <Routes>
//             <Route path="/" element={<Products />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/chat" element={<Chatbot />} />
//           </Routes>
//         </div>
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;

// src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Products from "./Components/Products";
// import Cart from "./Components/Cart";
// import ChatbotPanel from "./Components/ChatbotPanel";
// import { AppProvider } from "./context/AppContext";

// function App() {
//   return (
//     <AppProvider>
//       <Router>
//         <Navbar />
//         <div style={{ padding: 16 }}>
//           <Routes>
//             <Route path="/" element={<Products />} />
//             <Route path="/cart" element={<Cart />} />
//           </Routes>
//         </div>

//         {/* Chatbot always available as side panel */}
//         <ChatbotPanel />
//       </Router>
//     </AppProvider>
//   );
// }

// export default App;



// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import ChatbotPanel from "./Components/ChatbotPanel";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Components/Login";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Navbar />
          <div style={{ padding: 16 }}>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <ChatbotPanel />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
