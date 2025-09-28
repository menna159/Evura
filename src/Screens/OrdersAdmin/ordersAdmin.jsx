import React, { useEffect, useState } from "react";
import api from "../../api/client";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import './ordersAdmin.css'
function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const { i18n, t } = useTranslation();
  const {token}=useSelector(state=>state.user);
  const [statuses, setStatuses] = useState({}); // store all statuses in a map
  const [orderStatus,setOrderStatus]=useState({
    "orderId": 0,
  "statusId": 0
  });

  useEffect(() => {
      fetchOrders();
      
      fetchOrdersStatus();
      
  }, []);
  const fetchOrders=async()=>{
    try {
      const res=await api.get("/Order/AdminGetAll");
      setOrders(res.data); 
           
    } catch (error) {
      if(error.response){
        toast.error(error.response.data);
      }
    }
  }

   const getStatusName = (id) => {
    if (!statuses[id]) return id; // fallback
    return i18n.language === "ar"
      ? statuses[id].nameAr
      : statuses[id].nameEn;
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
     if(err.response){
        toast.error(error.response.data);
      }
    }
  };
  // Use English names (backend is consistent) for mapping colors
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

    const handleUpdateStatus=async()=>{
     try {
      const res=await api.put("/Order/UpdateOrderStatus",
      orderStatus
      );
      fetchOrders(); // ✅ refresh orders
    setOrderStatus({ orderId: 0, statusId: 0 }); 
     } catch (error) {
      if(error.response){
        toast.error(error.response.data);
      }
     }
  } 
  const formatPrice = (value) => {
    const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
    return new Intl.NumberFormat(locale).format(value) + " " + t("EGP");
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📋 {t("Orders")}</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              <p className="d-flex justify-content-between">
                <span>
                <strong >Status:</strong>{" "}
              <span
                className={`badge ${getBadgeColor(
                   order.orderStatusId
                      )}`}
                   >{getStatusName(order.orderStatusId)}</span> 
               </span>
              <button className="btn btn-outline-success"
              onClick={()=>setOrderStatus({...orderStatus,
              orderId:order.id})}>Change Status</button> 
              </p>
            {orderStatus.orderId===order.id&&(
              <div className="mt-2 d-flex flex-column gap-2">
                <div className="d-flex gap-2">{

              Object.values(statuses).map((status,index)=>(
                  <div
                    key={status.id}
                   className={`p-1 border rounded mb-1 pointer ${
                    orderStatus.statusId === status.id ? getBadgeColor(status.id) : ""
                          }`}
                         onClick={() => setOrderStatus({ ...orderStatus, statusId: status.id })}
                  >
                   {i18n.language === "ar" ? status.nameAr : status.nameEn}
                         </div>

            ))
            }</div>
            <button className=" btn btn-outline-success"
            onClick={handleUpdateStatus}>Change</button>
            </div>)
              }
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
}

export default OrdersAdmin;
