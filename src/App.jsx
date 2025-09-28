import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './Screens/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './core/Footer/Footer';
import ProductDetails from './Screens/ProductDetails/ProductDetails';
import Header from './core/HeaderSection/Main-Header/Header';
import { SecondHeader } from './core/HeaderSection/Second-Header/SecondHeader';
import SignInDialog from './Screens/Home/components/SignInDialog/signInDialog';
import Checkout from './Screens/Check-out/Checkout';
import LovesScreen from './Screens/Favourite/favourite';
import Cart from './Screens/cart/Cart';
import Dashboard from './Screens/Dashboard/dashboard';
import CategoryItems from './Screens/Home/components/CategoryItem/CategoryItems';
import './App.css'
// import { getCurrentLang, isCurrentLangRTL } from './core/translate/autoTranslate';
// import LanguageSwitcher from './core/LangSwitcher/LangSwitcher';
import UploadExcelToJson from './uploadFile';
import AddProducts from './Screens/AddProduct/AddProduct';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store} from './redux/store';
import CustomProducts from './Screens/CustomProducts/CustomProducts';
import OrderSuccess from './Screens/orderStatus/orderSuccess/orderSuccess';
import OrderFailed from './Screens/orderStatus/orderFailed/orderFailed';
import ProtectedRoute from './Screens/ProtectedRoute/ProtectedRoute';
import ProductsDashboard from './Screens/ProductsDashboard/productsDashboard';
import CategoriesPanel from './Screens/Cat&sub&Brand/cat-sub-brand';
import Orders from './Screens/Orders(Client)/orders';
import OrdersAdmin from './Screens/OrdersAdmin/ordersAdmin';
function AppContent() {
  
 const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [categoryItem, setCategoryItem] = useState([]);

  const handleSignInClick = () => {
    setIsCreatingAccount(false);
    setShowDialog(true);
  };

  const handleSignUpClick = () => {
    setIsCreatingAccount(true);
    setShowDialog(true);
  };

  const showHeaderFooter = !( location.pathname.startsWith("/Dashboard") ||
  location.pathname.startsWith("/Checkout"));

  return (
    <div className="d-flex flex-column min-vh-100">
      {showHeaderFooter && (
        <>
          <Header onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
          {/* <div className="px-4 py-2 d-flex justify-content-end">
            <LanguageSwitcher />
          </div> */}
          <SecondHeader
            activeCategory={categoryItem}
            setActiveCategory={setCategoryItem}
          />
          <SignInDialog
            visible={showDialog}
            onClose={() => setShowDialog(false)}
            isCreating={isCreatingAccount}
          />
        </>
      )}

      <div className="flex-grow-1 z-1">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/product-details" element={<ProductDetails />} />
  <Route path="/Cart" element={<Cart />} />
  <Route path="/Checkout" element={<Checkout />} />
  <Route path="/Favourite" element={<LovesScreen />} />
  <Route path="/orderSuccess" element={<OrderSuccess />} />
  <Route path="/orderFailed" element={<OrderFailed />} />
  <Route path="/CustomProducts" element={<CustomProducts />} />
  <Route path="/uploadFile" element={<UploadExcelToJson />} />
  <Route path='/clientOrders' element={<Orders/>}/>
  {/* 🔒 Protect Dashboard */}
  <Route
    path="/Dashboard/*"
    element={
      <ProtectedRoute adminOnly={true}>
        <Dashboard />
      </ProtectedRoute>
    }
  >
    <Route path="AddProduct" element={<AddProducts />} />
    <Route path="OrdersAdmin" element={<OrdersAdmin />} />
    <Route path='productsDashboard' element={<ProductsDashboard/>}/>
    <Route path='CategoriesPanel'   element={<CategoriesPanel/>}/>
  </Route> 
</Routes>

      </div>

      {showHeaderFooter && <Footer />}
    </div>
  );
}


function App() {
  // useEffect(() => {
  //   const lang = getCurrentLang();
  //   const dir = isCurrentLangRTL() ? 'rtl' : 'ltr';

  //   document.documentElement.lang = lang;
  //   document.documentElement.dir = dir;
  // }, []);

  return (
    <Router>
      <Provider store={store}> 
      <AppContent />
       <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      </Provider>
    </Router>
  );
}

export default App;
