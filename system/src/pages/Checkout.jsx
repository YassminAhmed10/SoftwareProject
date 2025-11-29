import React, { useState } from 'react';
// import Header from '../components/Header'; // 1. Uncomment when teammate finishes Header
// import Footer from '../components/Footer'; // 2. Uncomment when teammate finishes Footer
// import Loader from '../components/Loader'; // 3. Uncomment when teammate finishes Loader

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Logic to send order to .NET backend will go here
    setTimeout(() => {
        alert("Order Placed! (This is a simulation)");
        setLoading(false);
    }, 2000);
  };

  return (
    <div className="checkout-page">
      {/* <Header /> */}
      
      <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Checkout</h1>
        
        {/* Placeholder for the Form - You can move this to a separate component later */}
        <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <section>
                <h3>Shipping Information</h3>
                <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '8px' }} />
                <input type="text" placeholder="Address" required style={{ width: '100%', padding: '8px', marginTop: '10px' }} />
            </section>

            <section>
                <h3>Payment Details</h3>
                <input type="text" placeholder="Card Number" required style={{ width: '100%', padding: '8px' }} />
            </section>

            <button type="submit" style={{ padding: '10px', backgroundColor: 'black', color: 'white', cursor: 'pointer' }}>
                {loading ? "Processing..." : "Place Order"}
            </button>
        </form>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Checkout;