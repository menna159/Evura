import React from 'react';

const Checkout = () => {
  return (
    <div className="container py-4">
      {/* Header */}
      <h1 className="text-center fw-bold">EVURA</h1>
      <hr />

      {/* Checkout Title */}
      <div className="text-center mb-4">
        <h2>Checkout</h2>
        <hr className="w-25 mx-auto" />
      </div>

      {/* Form and Summary */}
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <h4 className="mb-3">Shipping Address</h4>

          {/* Form Fields */}
          <div className="mb-4">
            <div className="row g-2">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <input
              type="email"
              className="form-control mt-3"
              placeholder="Email Address"
            />
            <input
              type="password"
              className="form-control mt-3"
              placeholder="Password (6 to 12 characters)"
            />
            <input
              type="tel"
              className="form-control mt-3"
              placeholder="Phone Number"
            />
          </div>

          {/* Order Summary */}
          <div className="card p-3 mb-4">
            <div className="d-flex justify-content-between">
              <span className="fw-semibold">Merchandise Subtotal</span>
              <span>$1024.00</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span className="text-muted">Shipping</span>
              <span className="text-muted">Calculated at checkout</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>$1024.00</strong>
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn btn-dark w-100 py-3 rounded-pill">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
