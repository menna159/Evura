// src/pages/OrderFailed.jsx
import React from "react";
import { Link } from "react-router-dom";

const OrderFailed = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="text-danger">❌ Order Failed</h1>
      <p className="mt-3">Something went wrong while placing your order.</p>
      <Link to="/Checkout" className="btn btn-warning mt-4">
        Try Again
      </Link>
    </div>
  );
};

export default OrderFailed;
