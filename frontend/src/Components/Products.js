// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "" });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/products`);
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch products from backend.");
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

//   return (
//     <section className="panel">
//       <h2>Products</h2>
//       <div className="products">
//         {products.map(p => (
//           <div key={p.id} className="product">
//             <div><strong>{p.name}</strong></div>
//             <div>₹{p.price}</div>
//           </div>
//         ))}
//       </div>

//       <div className="add-product">
//         <h3>Add Product</h3>
//         <input
//           placeholder="Name"
//           value={newProduct.name}
//           onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
//         />
//         <input
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
//         />
//         <button onClick={addProduct}>Add</button>
//       </div>
//     </section>
//   );
// }

// export default Products;
// import React, { useEffect, useState, useContext } from "react";
// import { CartContext } from "./CartContext";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [popup, setPopup] = useState(null); // For showing popup
//   const { cart, addToCart } = useContext(CartContext);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     setPopup(`${product.title} added to cart!`);
//     setTimeout(() => setPopup(null), 2000); // popup disappears after 2s
//   };

//   // Check if product is already in cart
//   const isInCart = (productId) => {
//     return cart.some((item) => item.id === productId);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Products</h2>

//       {/* Popup notification */}
//       {popup && (
//         <div
//           style={{
//             position: "fixed",
//             top: "20px",
//             right: "20px",
//             backgroundColor: "#28a745",
//             color: "#fff",
//             padding: "10px 20px",
//             borderRadius: "8px",
//             zIndex: 1000,
//           }}
//         >
//           {popup}
//         </div>
//       )}

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {products.map((product) => (
//           <div
//             key={product.id}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               padding: "10px",
//               width: "200px",
//               textAlign: "center",
//             }}
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               style={{ width: "100px", height: "100px", objectFit: "contain" }}
//             />
//             <h3 style={{ fontSize: "16px" }}>{product.title}</h3>
//             <p style={{ fontWeight: "bold" }}>${product.price}</p>
//             <button
//               onClick={() => handleAddToCart(product)}
//               disabled={isInCart(product.id)}
//               style={{
//                 padding: "5px 10px",
//                 backgroundColor: isInCart(product.id) ? "#6c757d" : "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: isInCart(product.id) ? "not-allowed" : "pointer",
//               }}
//             >
//               {isInCart(product.id) ? "Added" : "Add to Cart"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

// src/Components/Products.js
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Products = () => {
  const { products, addToCart, cart } = useContext(AppContext);
  const [toast, setToast] = useState(null);

  const handleAdd = (product) => {
    const ok = addToCart(product);
    setToast(ok ? `${product.title} added to cart` : "Product already in cart");
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Products</h2>
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            background: "#22c55e",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 8,
            zIndex: 9999,
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          }}
        >
          {toast}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 12,
        }}
      >
        {products.map((p) => {
          const already = cart.some((c) => c.id === p.id);
          return (
            <div
              key={p.id}
              style={{
                border: "1px solid #e5e7eb",
                padding: 12,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#fff",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{ height: 140, objectFit: "contain", marginBottom: 8 }}
              />
              <h4 style={{ fontSize: 14, margin: "6px 0", textAlign: "center" }}>{p.title}</h4>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>${p.price}</div>
              <button
                onClick={() => handleAdd(p)}
                disabled={already}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 6,
                  border: "none",
                  cursor: already ? "not-allowed" : "pointer",
                  background: already ? "#9ca3af" : "#f59e0b",
                  color: "#fff",
                }}
              >
                {already ? "Added" : "Add to cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;




