import React from 'react';
import './signIn.css';

const DropDownList = ({ onSignInClick , onSignUpClick }) => {
  // const [creating,setCreating]=useState(false)
  return (
    <div className="signin-dropdown  bg-light shadow rounded">
      <p className="mb-1 fw-bold">Good Morning Beautiful</p>
      <p className="text-muted">Sign in for free shipping on all orders</p>

      <div className="d-flex justify-content-center gap-2 mb-3">
        <button className="btn btn-dark buttonrounded" onClick={onSignInClick}>
          Sign In
        </button>
        <button className="btn btn-outline-dark buttonrounded" onClick={onSignUpClick}>
          Create Account
        </button>
      </div>

      <hr />
      <div className="mb-3">
        <p className="mb-1 fw-semibold">Beautiful Preferences</p>
        <p className="text-secondary mb-0">Complete to see your personalized recommendations</p>
      </div>

      <hr />
      <div className="mb-3">
        <p className="mb-1 fw-semibold">Beauty Insider Summary</p>
        <p className="text-secondary mb-0">View activity, savings, benefits</p>
      </div>

      <hr />
      <div className="mb-3">
        <p className="mb-1 fw-semibold">Rewards Bazaar</p>
        <p className="text-secondary mb-0">Redeem items, samples, and more</p>
      </div>

      <hr />
      <div className="mb-0">
        <p className="mb-1 fw-semibold">Beauty Insider Challenges</p>
        <p className="text-secondary mb-0">Earn points when you complete tasks</p>
      </div>
    </div>
  );
};

export default DropDownList;
