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
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(null); // For showing popup
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setPopup(`${product.title} added to cart!`);
    setTimeout(() => setPopup(null), 2000); // popup disappears after 2s
  };

  // Check if product is already in cart
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {/* Popup notification */}
      {popup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        >
          {popup}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            <h3 style={{ fontSize: "16px" }}>{product.title}</h3>
            <p style={{ fontWeight: "bold" }}>${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={isInCart(product.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: isInCart(product.id) ? "#6c757d" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: isInCart(product.id) ? "not-allowed" : "pointer",
              }}
            >
              {isInCart(product.id) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;



