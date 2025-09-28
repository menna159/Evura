import api, { absoluteUrl } from "../../api/client";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Cart.css";
import i18n from "../../i18n";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { token } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [t] = useTranslation();
  const hasFetched = useRef(false);
  const [totalPrice,setTotalPrice]=useState(0);
  // Fetch Cart Data
  useEffect(() => {
    const fetchUserCart = async () => {
      if (hasFetched.current) return; 
      hasFetched.current = true;

      try {
        const response = await api.get(
          "/Cart/GetUserCart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data.items || []);

         
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      }
    };

    fetchUserCart();
  }, [token]);

  // Delete All Items
  const handleDeleteAll = async () => {
    try {
      await api.delete("/Cart/clearCart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(t("Cart cleared successfully"));
      setData([]); // update UI instantly
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      }
    }
  };
const handleDeleteItem = async (id) => {
  try {
    await api.delete(`/Cart/removeFromCart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success(t("Product deleted successfully"));
    // Update UI instantly
    setData((prev) => prev.filter((item) => item.id !== id));
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
    }
  }
};
   const formatPrice = (value) => {
  const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
  }).format(value);

  return `${formattedNumber} ${t("EGP")}`;
};
useEffect(() => {
  const sum = data.reduce((acc, product) => acc + product.totalPrice, 0);
  setTotalPrice(sum);
}, [data]);
    const handleUpdateQuantity = async (id, quantity) => {
  try {
  let response= await api.put(
      `/Cart/updateCartItem?itemId=${id}&newQuantity=${quantity}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
     
    // Update UI instantly
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity, totalPrice: (item.totalPrice / item.quantity) * quantity } : item
      )
    );

    toast.success(t("Quantity updated successfully"));
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data);
    }
  }
};

  return (
    <div className="container-fluid p-4">
      {/* Title */}
      <h2 className="mb-3 text-center">
        {t("Shipping and Delivery Basket (")} {data.length}{" )"}
      </h2>

      {/* Subtitle */}
      <div className="mb-4 text-center ">
        <h4>{t("Get it shipped")}</h4>
      </div>
       
              
      {data.length > 0 ? (
        <>
         <button
    className={`btn btn-danger mb-5 d-flex align-items-center gap-2 px-3 py-2 rounded-4 shadow-sm `}
    onClick={handleDeleteAll}
  >
    <FaTrash /> {t("Delete All")}
  </button>
           
        <div className="row">
          {/* Left side: Products */}
          <div className="col-lg-8 col-12 mb-4 position-relative">
            {/* Delete All Button */}


            {data.map((item, index) => (
  <div
    key={index}
    className="card p-3 d-flex flex-column flex-md-row gap-3 mb-3 shadow-sm border-0 rounded-3"
  >
    <img
      src={item.productColorPhotoUrl ? absoluteUrl(item.productColorPhotoUrl) :item.productPhotoUrl?absoluteUrl(item.productPhotoUrl): "/placeholder.png"}
      alt="Product"
      className="cart-product-img"
    />

    <div className="flex-grow-1 d-flex flex-column justify-content-between">
      <div>
        <h5 className="fw-semibold">{item.productNameEn}</h5>
        <p className="text-muted small">{item.productNotesEn}</p>

        <div className="d-flex gap-2 small mb-1">
          <strong>{t("Size")}:</strong>
          <span>{i18n.language === 'en' ? item.productSizeNameEn : item.productSizeNameAr}</span>
        </div>

        <div className="d-flex gap-2 small">
          <strong>{t("Price")}:</strong>
          <span className="text-success fw-bold">{formatPrice(item.totalPrice)}</span>
        </div>
      </div>

      {/* Quantity Select */}
      <div >
        <select
          className="form-select form-select-sm w-auto rounded-pill"
          value={item.quantity}
          onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Delete item button */}
    <button
      className="btn btn-outline-danger rounded-circle shadow-sm ms-auto"
      onClick={() => handleDeleteItem(item.id)}
    >
      <FaTrash />
    </button>
  </div>
))}
          </div>

          {/* Right side: Summary */}
          <div className="col-lg-4 col-12 mb-4">
            <div className="card p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">{t("Estimated Total")}</h5>
                <div>
                  <p className="mb-0  d-inline me-2">
                    {formatPrice(totalPrice)}
                  </p>
                  {/* <p className="mb-0 d-inline">$1022.80</p> */}
                </div>
              </div>

              <p className="text-muted mb-4">
                {t("Shipping and taxes calculated during checkout")}.
              </p>

              <button
                onClick={() => navigate("/Checkout")}
                className="btn w-100 custom-button checkout-btn"
              >
                {t("Checkout")}
              </button>
            </div>
          </div>
        </div>
        </>
      ) : (
        <h3 className="text-center">{t("No Products found")}</h3>
      )}
    </div>
  );
};

export default Cart;
