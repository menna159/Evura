import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './Screens/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer/Footer';
import ProductDetails from './Screens/ProductDetails/ProductDetails';
import Header from './Screens/Home/HeaderSection/Header';
import { SecondHeader } from './Screens/Home/SecondHeader';
import SignInDialog from './Screens/Home/components/signInDialog';
// import Cart from './Screens/cart/Cart';
import Checkout from './Screens/Check-out/Checkout';
import LovesScreen from './loves';
import Cart from './Screens/cart/Cart';

function AppContent() {
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

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
      {location.pathname !== '/Checkout' && (
        <>
          <Header onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
          <SecondHeader />
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
