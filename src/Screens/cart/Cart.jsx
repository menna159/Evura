import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-3">Shipping and Delivery Basket (1)</h2>

      <div className="mb-4">
        <h4>Get it shipped</h4>
        <hr />
        <p>Beauty Insiders enjoy FREE Standard Shipping on all orders.</p>
        <hr />
      </div>

      <div className="row">
        {/* Product Section */}
        <div className="col-lg-8 col-12 mb-4">
          <div className="card p-3 d-flex flex-column flex-md-row gap-3">
            <img
              src="1.jpg"
              alt="Product"
              style={{
                height: '18rem',
                objectFit: 'cover',
                borderRadius: '0.5rem',
                maxWidth: '100%',
              }}
            />
            <div className="d-flex flex-column justify-content-center">
              <h5>KAYALI</h5>
              <p>UTOPIA VANILLA COCO | 21 Eau De Parfum Intense</p>
              <p className="text-muted">
                SIZE 1.7 oz / 50 mL • ITEM 2441020
              </p>
              <h5>$1000.00</h5>
              <select
                className="form-select w-auto mt-2"
                style={{ borderRadius: '0.5rem' }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="col-lg-4 col-12 mb-4">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Estimated Total</h5>
              <div>
                <p
                  className="mb-0"
                  style={{ textDecoration: 'line-through', display: 'inline', marginRight: 5 }}
                >
                  $1024
                </p>
                <p className="mb-0 d-inline">$1022.80</p>
              </div>
            </div>

            <p className="text-muted mb-4">
              Shipping and taxes calculated during checkout.
            </p>

            <button
              onClick={() => navigate('/Checkout')}
              className="btn w-100"
              style={{
                backgroundColor: '#E50046',
                borderRadius: '2rem',
                color: 'white',
                height: '3.4rem',
                fontWeight: 'bold',
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
