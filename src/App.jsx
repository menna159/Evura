import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './Screens/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer/Footer';
import ProductDetails from './Screens/ProductDetails/ProductDetails';
import Header from './Screens/Home/HeaderSection/Main-Header/Header';
import { SecondHeader } from './Screens/Home/HeaderSection/Second-Header/SecondHeader';
import SignInDialog from './Screens/Home/components/SignInDialog/signInDialog';
// import Cart from './Screens/cart/Cart';
import Checkout from './Screens/Check-out/Checkout';
import LovesScreen from './loves';
import Cart from './Screens/cart/Cart';
import Dashboard from './Screens/Dashboard/dashboard';
import CategoryItems from './Screens/Home/components/CategoryItem/CategoryItems';

function AppContent() {
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [categoryItem,setCategoryItem]=useState([]);
  const handleSignInClick = () => {
    setIsCreatingAccount(false);
    setShowDialog(true);
  };

  const handleSignUpClick = () => {
    setIsCreatingAccount(true);
    setShowDialog(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {location.pathname !== '/Checkout'&& location.pathname!=='/Dashboard' && (
        <>
          <Header onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
          <SecondHeader  activeCategory={categoryItem}
  setActiveCategory={setCategoryItem}/>
          {/* <CategoryItems Items={categoryItem}/> */}
          <SignInDialog
            visible={showDialog}
            onClose={() => setShowDialog(false)}
            isCreating={isCreatingAccount}
          />
        </>
      )}

      {/* Main page content */}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Loves" element={<LovesScreen />} />
          <Route path='/Dashboard' element={<Dashboard/>} />
        </Routes>
      </div>

      {location.pathname !== '/Checkout' && <Footer />}
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
