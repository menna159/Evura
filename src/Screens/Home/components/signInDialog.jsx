import React, { useEffect, useState } from 'react';
import './signIn.css';

const SignInDialog = ({ visible, onClose,isCreating: initialIsCreating }) => {
  const [isCreating, setIsCreating] = useState(initialIsCreating);
  const [continueButt, setContinueButt] = useState(false);
useEffect(() => {
  setIsCreating(initialIsCreating);
  setContinueButt(false);
}, [initialIsCreating, visible]);


  if (!visible) return null;

  return (
    <div className="signinDialog">
      <h4 className="mb-3">{isCreating ? 'Create Account' : 'Sign In'}</h4>

      {!isCreating ? (
        <>
          <p>Sign in or create an account to enjoy FREE standard shipping on all orders</p>
          <input type="email" className="form-control mb-2" placeholder="Email" />
          <input type="password" className="form-control mb-3" placeholder="Password" />
          <p>By clicking “Sign In”, you agree to the TERMS OF USE, and EVURA Privacy Policy</p>
          <button className="btn btn-dark  py-2 buttonrounded mb-3">Sign In</button>
          <hr />
          <p className="fw-bold">New to EVURA?</p>
          <button
            className="btn btn-outline-dark py-2 buttonrounded"
            onClick={() => setIsCreating(true)}
          >
            Create Account
          </button>
        </>
      ) : !continueButt ? (
        <>
          <h5>Beauty Insider</h5>
          <p>Join the Beauty Insider loyalty program. Earn points, get FREE standard shipping, redeem rewards, and more.</p>
          <input type="email" className="form-control mb-2" placeholder="Email" />
          <button
            className="btn btn-dark  py-2 buttonrounded mb-3"
            onClick={() => setContinueButt(true)}
          >
            Continue
          </button>
          <hr />
          <p className="mb-3 fw-bold" style={{ fontSize: '0.9rem' }}>
            Already have an account
          </p>
          <button
            className="btn btn-outline-secondary py-2 buttonrounded"
            onClick={() => setIsCreating(false)}
          >
            Sign In
          </button>
        </>
      ) : (
        <>
          <h5>Beauty Insider</h5>
          <p>Join the Beauty Insider loyalty program. Earn points, get FREE standard shipping, redeem rewards, and more.</p>
          <div className="d-flex flex-row gap-2">
            <input type="text" className="form-control mb-2" placeholder="First Name" />
            <input type="text" className="form-control mb-2" placeholder="Last Name" />
          </div>
          <input type="email" className="form-control mb-2" placeholder="Email Address" />
          <input type="password" className="form-control mb-2" placeholder="Password (6 to 12 characters)" />
          <input type="tel" className="form-control mb-2" placeholder="Phone Number" />
          <button className="btn btn-dark w-100 py-2 buttonrounded mb-3">
            Join Now
          </button>
        </>
      )}

      <button
        className="btn-close position-absolute top-0 end-0 m-3"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default SignInDialog;
