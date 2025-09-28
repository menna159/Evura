import React, { useState } from 'react';
import './SignInDialog/signIn.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../redux/userRedux/userSlice';
import ConfirmDialog from '../../../core/ConfirmDialog/confirmDialog';
import { Link } from 'react-router-dom';
// import { clearUser } from '../../../redux/userRedux/userSlice';

const DropDownList = ({ onSignInClick , onSignUpClick,onClose }) => {
  // const [creating,setCreating]=useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
      const { id, name,token } = useSelector((state) => state.user);
      const dispatch=useDispatch();
  const {t,i18n}=useTranslation();
 const handleLogOut = () => {
  dispatch(clearUser());
  setShowLogoutConfirm(false);
    if (onClose) onClose();
  };
  

  return (
    <div className="signin-dropdown  bg-light shadow rounded">
      <p className="mb-1 fw-bold">{name===''||name==undefined ?t("Hello, Beautiful"):`${t('Hello, ')} ${name}`}</p>
      

{name===''||name==undefined?<><p className="text-muted">{t("Sign in for free shipping on all orders")}</p>
  <div className="d-flex justify-content-center gap-2 mb-3">
        <button className="btn btn-dark buttonrounded" onClick={onSignInClick}>
          {t("sign In")}
        </button>
        <button className="btn btn-outline-dark buttonrounded" onClick={onSignUpClick}>
          {t("Create Account")}
        </button>
      </div>
      </>
:<></>}    
      <hr />
      <div className="mb-3">
        <p className="mb-1 fw-semibold">{t('Beauty preference')}</p>
        <p className="text-secondary mb-0">{t('Complete to see your personalized recommendations')}</p>
      </div>

      <hr />
      <div className="mb-3">
        <p className="mb-1 fw-semibold">{t('Beauty Insider Summary')}</p>
        <p className="text-secondary mb-0">{t('View activity, savings, benefits')}</p>
      </div>

      <hr />
      <div className="mb-3">
        <p className="mb-1 fw-semibold">{t('Rewards Bazaar')}</p>
        <p className="text-secondary mb-0">{t('Redeem items, samples, and more')}</p>
      </div>

      
     { name !== '' &&name!=undefined &&(
  <div className="mb-0">
    <hr />
     <Link to="/clientOrders" className="btn btn-outline-dark buttonrounded w-100 mb-2" onClick={onClose}>
            {t("My Orders")}
          </Link>
    <button className="btn btn-dark buttonrounded" onClick={()=>setShowLogoutConfirm(true)}>
      {t("Log Out")}
    </button>
    
  </div>
)}{showLogoutConfirm&&
    <ConfirmDialog
  show={showLogoutConfirm}
  onHide={() => setShowLogoutConfirm(false)}
  onConfirm={handleLogOut}
  title="Logout"
  message="Are you sure you want to logout?"
/>}
    </div>
  );
};

export default DropDownList;
