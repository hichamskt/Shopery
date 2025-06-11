import "./App.css";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardProducts from "./pages/DashboardProducts";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Descriptions from "./components/Descriptions/Descriptions";
import AdditionalInformation from "./components/AdditionalInformation/AdditionalInformation";
import CustomerFeedback from "./components/CustomerFeedback/CustomerFeedback";
import RequireAuth from "./auth/RequireAuth";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";

import Account from "./pages/Account";
import UserDashboard from "./pages/UserDashboard";
import Settings from "./pages/Settings";
import { useState } from "react";
import Toast from "./components/Toast/Toast";
import OrderHistory from "./pages/OrderHistory";
import WishList from "./pages/WishList";

function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
const [showToast, setShowToast] = useState(false);
const [message, setMessage] = useState('');

  const handleShowToast = () => setShowToast(true);
  const handleCloseToast = () => setShowToast(false);

  
  return (
    <div className="App">
       {showToast && (
        
      <Toast message={message} onClose={handleCloseToast} duration={2000} />
      )}
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/faqs" element={<Faqs />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>

          <Route path="/product/:productid" element={<ProductDetails />}>
            <Route index element={<Descriptions />} />

            <Route path="additionalinfo" element={<AdditionalInformation />} />
            <Route path="customerfeedback" element={<CustomerFeedback />} />
          </Route>

          <Route path="*" element={<ErrorPage />}></Route>

          {/* <Route element={<RequireAuth />}>
          <Route path="account" element={<UserDashboard />}>
          </Route>
          
          </Route> */}
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="/account/settings" element={<Settings setMessage={setMessage} setShowToast={setShowToast} />} />
            <Route path="/account/orderhistory"  element={<OrderHistory/>}  />
            <Route path="/account/wishlist"  element={<WishList />}  />
            {/* <Route path="dashboard" element={
            <UserDashboard />} /> */}

            
          </Route>

          {/* dashboard */}
          <Route
            path="dashboard/products"
            element={<DashboardProducts />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
