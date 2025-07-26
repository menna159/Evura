import React, { useState } from 'react';
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { LuShoppingBasket } from "react-icons/lu";
import DropDownList from '../components/dropDown';
import { MdShoppingBasket, MdShoppingCart } from "react-icons/md";
import { MdFace, MdFaceRetouchingNatural } from "react-icons/md";
import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header({ onSignInClick, onSignUpClick }) {
  const [query, setQuery] = useState('');
  const [heartHovered, setHeartHovered] = useState(false);
  const [faceHovered, setFaceHovered] = useState(false);
  const [basketHovered, setBasketHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container mt-3">
      <div className="row align-items-center justify-content-between g-3 flex-wrap">

        {/* Logo */}
        <div className="col-12 col-sm-4 text-center text-sm-start">
          <a href='/' className='logo text-decoration-none'>
            <h1 className="m-0">EVURA</h1>
          </a>
        </div>

        {/* Search Input */}
        <div className="col-12 col-sm-4">
          <input
            className="form-control rounded-pill w-100"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Icons Section */}
        <div className="col-12 col-sm-4 d-flex justify-content-center justify-content-sm-end align-items-center gap-3 position-relative">

          {/* Face Icon and Dropdown */}
          <div
            className="d-flex align-items-center gap-2 position-relative"
           onMouseEnter={() => {
            setFaceHovered(true);             
               setShowDropdown(true);
                  }}

            onMouseLeave={() => {
              setFaceHovered(false);
              setTimeout(() => setShowDropdown(false), 1000);
            }}
            onClick={() => setShowDropdown(true)}
            style={{ cursor: "pointer" }}
          >
            {faceHovered ? (
              <MdFaceRetouchingNatural className="icons" />
            ) : (
              <MdFace className="icons" />
            )}
            <div>
              <p className="mb-0 small">{loggedIn ? "Hello, Menna" : 'Sign In'}</p>
              <small className="text-muted">{loggedIn ? '' : 'For Free Shipping'}</small>
            </div>

            {showDropdown && (

                <DropDownList
                  onSignInClick={() => {
                    onSignInClick();
                    setShowDropdown(false);
                  }}
                  onSignUpClick={() => {
                    onSignUpClick();
                    setShowDropdown(false);
                  }}
                />
             
            )}
          </div>

          {/* Heart Icon */}
          <span
            onClick={() => {
              setHeartHovered(true);
              navigate('/Loves');
            }}
            onMouseLeave={() => setHeartHovered(false)}
            style={{ cursor: 'pointer' }}
          >
            {heartHovered ? (
              <VscHeartFilled className="icons text-danger" />
            ) : (
              <VscHeart className="icons" />
            )}
          </span>

          {/* Basket Icon */}
          <span
            onMouseEnter={() => setBasketHovered(true)}
            onMouseLeave={()=>setBasketHovered(false)}
            onClick={() => navigate('/Cart')}
            style={{ cursor: 'pointer' }}
          >
            {basketHovered ? (
              <MdShoppingCart className="icons" />
            ) : (
              <MdShoppingBasket className="icons" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
