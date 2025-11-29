import React, { useState, useEffect } from "react";

const CheckoutForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    paymentMethod: "", // "card" | "paypal" | "cod"
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]); // or get from context/redux

  useEffect(() => {
    // load cart from localStorage / context / API
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Example API call - adapt endpoint & payload to backend
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cart }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Checkout failed");

      // success actions
      localStorage.removeItem("cart"); // clear cart
      // navigate to confirmation page: /order-confirmation/:orderId
      window.location.href = `/order-confirmation/${data.orderId}`;
    } catch (err) {
      alert(err.message || "Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

      <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
        <option value="">Select payment</option>
        <option value="card">Card</option>
        <option value="paypal">PayPal</option>
        <option value="cod">Cash on delivery</option>
      </select>

      {form.paymentMethod === "card" && (
        <div>
          <input name="cardNumber" placeholder="Card number" value={form.cardNumber} onChange={handleChange} />
          <input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} />
          <input name="cvc" placeholder="CVC" value={form.cvc} onChange={handleChange} />
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Place order"}
      </button>
    </form>
  );
};

export default CheckoutForm;
