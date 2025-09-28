import React, { useEffect, useState } from 'react';
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { LuShoppingBasket } from "react-icons/lu";
import DropDownList from '../../../Screens/Home/components/dropDown';
import { MdShoppingBasket, MdShoppingCart } from "react-icons/md";
import { MdFace, MdFaceRetouchingNatural } from "react-icons/md";
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { useSelector } from 'react-redux';
import api from '../../../api/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
export default function Header({ onSignInClick, onSignUpClick }) {
  const [query, setQuery] = useState('');
  const [heartHovered, setHeartHovered] = useState(false);
  const [faceHovered, setFaceHovered] = useState(false);
  const [basketHovered, setBasketHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const{t,i18n}=useTranslation();
  const navigate = useNavigate();
    const { id, name,token } = useSelector((state) => state.user);
const handleSearch = async (name) => {
  if (!name.trim()) {
    // If search is cleared, go back
    if (window.history.length > 1) {
      navigate(-1); // go back to previous page
    } else {
      navigate('/'); // fallback to home
    }
    return;
  }

  try {
    let res = await api.get(`/Product/Search/${name}`);
    let products = res.data;

    navigate('/CustomProducts', {
      state: {
        products: products,
        categoryName: {
          en: products[0]?.nameEn || "Products",
          ar: products[0]?.nameAr || "المنتجات",
        },
      },
    });
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  }
};

    useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (query.trim() !== "") {
      handleSearch(query);
    }
  }, 1000); 

  return () => clearTimeout(delayDebounce);
}, [query]);

 useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="container mt-3">
  <div className="row align-items-center g-3 flex-wrap">

    {/* Logo */}
    <div className="col-12 col-sm-3 text-center text-sm-start">
      <Link to="/" className="logo text-decoration-none">
    <h1 className="m-0">EVURA</h1>
  </Link>
    </div>

    {/* Search Input */}
    <div className="col-12 col-sm-4">
      <input
        className="form-control rounded-pill w-100"
        type="search"
        placeholder={t("Search by Product")}
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
         onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  }}
      />
    </div>

    {/* Icons + Language */}
    <div className="col-12 col-sm-5 d-flex justify-content-end align-items-center gap-3 flex-wrap">

      {/* Icons */}
      <div className="d-flex align-items-center gap-3">
        {/* Face Icon and Dropdown */}
        <div
          className="signin-container position-relative d-flex align-items-center gap-2"
          onMouseEnter={() => { setFaceHovered(true); setShowDropdown(true); }}
          onMouseLeave={() => { setFaceHovered(false); setTimeout(() => setShowDropdown(false), 1000); }}
          onClick={() => setShowDropdown(true)}
          style={{ cursor: "pointer" }}
        >
          {faceHovered ? <MdFaceRetouchingNatural className="icons" /> : <MdFace className="icons" />}
          <div>
            <p className="mb-0 small">{name!=''&&name!=undefined ? `${t('Hello, ')} ${name}` : t("sign In")} </p>
            <small className="text-muted">{name!='' &&name!=undefined ? '' : t('For Free Shipping')}</small>
          </div>
          {showDropdown && (
            <DropDownList
              onSignInClick={() => { onSignInClick(); setShowDropdown(false); }}
              onSignUpClick={() => { onSignUpClick(); setShowDropdown(false); }}
              onClose={() => setShowDropdown(false)}
            />
          )}
        </div>

        {/* Heart Icon */}
        <span onClick={() => { setHeartHovered(true); navigate('/Favourite'); }}
              onMouseLeave={() => setHeartHovered(false)}
              style={{ cursor: 'pointer' }}>
          {heartHovered ? <VscHeartFilled className="icons text-danger" /> : <VscHeart className="icons" />}
        </span>

        {/* Basket Icon */}
        <span onMouseEnter={() => setBasketHovered(true)}
              onMouseLeave={() => setBasketHovered(false)}
              onClick={() => navigate('/Cart')}
              style={{ cursor: 'pointer' }}>
          {basketHovered ? <MdShoppingCart className="icons" /> : <MdShoppingBasket className="icons" />}
        </span>
      </div>

      {/* Language Switch */}
      <div className="d-flex gap-2">
        <button 
          onClick={() => changeLanguage("en")} 
          className="btn btn-outline-info btn-sm rounded-pill fw-semibold shadow-sm"
        >
          English
        </button>
        <button 
          onClick={() => changeLanguage("ar")} 
          className="btn btn-outline-success btn-sm rounded-pill fw-semibold shadow-sm"
        >
          العربية
        </button>
      </div>

    </div>
  </div>
</div>

  );
}
