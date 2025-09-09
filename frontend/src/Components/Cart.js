// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000";

// function Cart() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/cart`);
//       setCart(res.data);
//     } catch (err) {
//       console.error(err);
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

//   return (
//     <section className="panel">
//       <h2>Cart</h2>
//       <div>
//         {cart.length === 0 && <div>Cart is empty</div>}
//         {cart.map((c, i) => (
//           <div key={i} className="cart-item">
//             {c.name} - ₹{c.price}
//           </div>
//         ))}
//       </div>
//       <button onClick={clearCart}>Clear cart</button>
//     </section>
//   );
// }

// export default Cart;
import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.length
    ? cart.reduce((total, item) => total + item.price, 0)
    : 0;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Shopping Cart ({cart.length})</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                gap: "15px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "16px", margin: 0 }}>{item.title}</h3>
                <p style={{ fontWeight: "bold", margin: "5px 0" }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 style={{ textAlign: "right", marginTop: "20px" }}>
            Total: ${totalPrice.toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Cart;


