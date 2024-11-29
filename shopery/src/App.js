
import './App.css';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Faqs from './pages/Faqs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';


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
    <Route path="*" element={<ErrorPage />}></Route>
    </Routes>

    </BrowserRouter>
     
    </div>

     
  );
}

export default App;
