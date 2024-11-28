
import './App.css';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';


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
    </Routes>

    </BrowserRouter>
     
    </div>

     
  );
}

export default App;
