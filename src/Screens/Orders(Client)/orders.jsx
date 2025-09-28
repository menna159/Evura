// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/client";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Orders = () => {
  const { token } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [statuses, setStatuses] = useState({}); // store all statuses in a map
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get("/Order/GetAll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token){ 
      fetchOrders();
      fetchOrdersStatus();
    }
  }, [token]);

  const formatPrice = (value) => {
    const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
    return new Intl.NumberFormat(locale).format(value) + " " + t("EGP");
  };
    const fetchOrdersStatus = async () => {
    try {
      const response = await api.get("/Order/GetAllOrdersStatus", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Convert array → map { id: {nameAr, nameEn} }
      const map = {};
      response.data.forEach((s) => {
        map[s.id] = s;
      });
      setStatuses(map);
    } catch (err) {
      console.error(err);
    }
  };
  const getStatusName = (id) => {
    if (!statuses[id]) return id; // fallback
    return i18n.language === "ar"
      ? statuses[id].nameAr
      : statuses[id].nameEn;
  };
    const getBadgeColor = (statusId) => {
if (!statuses[statusId]) return "bg-secondary";

  const statusEn = statuses[statusId].nameEn;
  const map = {
    Pending: "bg-warning text-dark",
    Accepted: "bg-success",
    Rejected: "bg-danger",
    Preparing: "bg-primary",
    Shipping: "bg-info text-dark",
    Delivered: "bg-success-subtle text-success-emphasis",
  };

  return map[statusEn] || "bg-secondary";
};
  if (loading) return <p className="text-center py-5">{t("Loading...")}</p>;
  if(!token) return <p className="text-center py-5 fw-bold fs-3">You must Login!</p>
  if (!orders.length) {
    return (
      <div className="container text-center py-5">
        <h3>{t("No orders yet")}</h3>
        <p>{t("Start shopping and place your first order!")}</p>
        <Link to="/" className="btn btn-primary">
          {t("Continue Shopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">{t("My Orders")}</h2>
      <div className="list-group">
         {orders.map((order) => (
            <div key={order.id} className="mb-5 border rounded p-3 shadow-sm">
              <h4>Order #{order.id}</h4>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>User:</strong> {order.userName}
              </p>
              <p>
                <strong>Phone:</strong> {order.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Total Price:</strong> {formatPrice(order.totalPrice)}
              </p>
              <p>
                <strong >Status:</strong>{" "}
              <span className={`badge ${getBadgeColor(order.orderStatusId)}`}>{getStatusName(order.orderStatusId)}</span>  
              </p>

              <h5 className="mt-3">Products:</h5>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderProducts.map((p) => (
                      <tr key={p.id}>
                        <td>{p.productName}</td>
                        <td>{p.productColorName}</td>
                        <td>{p.productSizeName}</td>
                        <td>{p.quantity}</td>
                        <td>{formatPrice(p.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
