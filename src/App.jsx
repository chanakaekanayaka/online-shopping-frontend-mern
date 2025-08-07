
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCart from './components/productCart'
import SuperProduct from './components/superProduct'
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import Register from './pages/registerPage';
import Admin from './pages/adminPage';





function App() {
 

  return (
    
    <BrowserRouter>
      <div className="h-screen w-full bg-amber-200  flex justify-center items-center">
        <Routes >
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/admin" element={<Admin/>}/>


        </Routes>
      </div>
    </BrowserRouter>
       
    
  );
}

export default App
