import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import api from "../../api/client";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const [t] = useTranslation();
  const { token } = useSelector((state) => state.user); 
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔹 Fetch Cart
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await api.get("/Cart/GetUserCart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setCart(response.data.items || []);
      } catch (error) {
        toast.error(error.response?.data || "Failed to load cart");
      }
    };
    fetchUserCart();
  }, [token]);

  // 🔹 Calculate total
  useEffect(() => {
    const sum = cart.reduce((acc, product) => acc + product.totalPrice, 0);
    setTotalPrice(sum);
  }, [cart]);

  // 🔹 Submit order
  const onSubmit = async (data) => {
    const orderData = {
      deliveryFee: 0,
      paymentMethod,
      phoneNumber: data.phoneNumber,
      shippingAddress: data.shippingAddress,
      orderProducts: cart.map((item) => ({
        quantity: item.quantity,
        productId: item.productId,
        productSizeId: item.productSizeId,
        productColorId: item.productColorId,
      })),
    };

    try {
      const response = await api.post("/Order/AddOrder", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/orderSuccess");
    } catch (error) {
      navigate("/orderFailed");
      toast.error(error.response?.data || "Failed to place order");
    }
  };

  return (
    <div className="container py-4">
      <Link to="/" className="logo text-decoration-none text-center">
        <h1 className="m-0">EVURA</h1>
      </Link>
      <hr />

      <div className="text-center mb-4">
        <h2>Checkout</h2>
        <hr className="w-25 mx-auto" />
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h4 className="mb-3">Shipping Address</h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {/* Address */}
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Address"
                {...register("shippingAddress", {
                  required: "Address is required",
                  minLength: { value: 5, message: "Address must be at least 5 characters" },
                })}
              />
              {errors.shippingAddress && (
                <p className="text-danger">{errors.shippingAddress.message}</p>
              )}

              {/* Phone */}
              <input
                type="tel"
                className="form-control mt-3"
                placeholder="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                  minLength: { value: 11, message: "Phone must be 11 digits" },
                  maxLength: { value: 15, message: "Phone too long" },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-danger">{errors.phoneNumber.message}</p>
              )}
            </div>

            <h5>Payment Method:</h5>
            <div className="m-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="cash"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="cash">
                  Cash on Delivery
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="paymob"
                  value="Paymob"
                  disabled
                />
                <label className="form-check-label" htmlFor="paymob">
                  Paymob
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card p-3 mb-4">
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">Merchandise Subtotal</span>
                <span>{totalPrice} {t("EGP")}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className="text-muted">Shipping</span>
                <span className="text-muted">Calculated at checkout</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>{totalPrice} {t("EGP")}</strong>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-3 rounded-pill"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
