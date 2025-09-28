// src/pages/OrderSuccess.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../../api/client";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

const OrderSuccess = () => {
  const { token } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState({}); // store all statuses in a map
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

 

  

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="text-success">✅ Order Placed Successfully!</h1>
        <p className="mt-3">Thank you for shopping with us.</p>
        <div className="d-flex gap-2 justify-content-center">
        <Link to='/clientOrders' className="btn btn-outline-primary mt-3">
           Show my Orders
        </Link>
        <Link to="/" className="btn btn-outline-secondary mt-3">
          Continue Shopping
        </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
