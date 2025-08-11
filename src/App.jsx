
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCart from './components/productCart'
import SuperProduct from './components/superProduct'
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import Register from './pages/registerPage';
import Admin from './pages/adminPage';
import TestPage from './pages/testPage';
import { Toaster } from 'react-hot-toast';





function App() {
 

  return (
    
    <BrowserRouter>
      <div className="h-screen w-full bg-amber-200  flex justify-center items-center">
        <Toaster position='top-right'/>

        <Routes >
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/test" element={<TestPage/>}/>


        </Routes>
      </div>
    </BrowserRouter>
       
    
  );
}

export default App
