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

function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/faqs" element={<Faqs />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/shop" element={<Shop />}></Route>

          <Route path="/product/:productid" element={<ProductDetails />}>
            <Route index element={<Descriptions />} />

            <Route path="additionalinfo" element={<AdditionalInformation />} />
            <Route path="customerfeedback" element={<CustomerFeedback />} />
          </Route>

          <Route path="*" element={<ErrorPage />}></Route>

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
