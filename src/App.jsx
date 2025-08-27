
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/loginPage';
import Register from './pages/registerPage';
import Admin from './pages/adminPage';
import TestPage from './pages/testPage';
import { Toaster } from 'react-hot-toast';
import ClientWebPage from './pages/client/clientPage';





function App() {
 

  return (
    
    <BrowserRouter>
      <div className="h-screen w-full   flex justify-center items-center ">
        <Toaster position='top-right'/>

        <Routes >
         
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/test" element={<TestPage/>}/>
          <Route path="/*" element={<ClientWebPage></ClientWebPage>}></Route>


        </Routes>
      </div>
    </BrowserRouter>
       
    
  );
}

export default App
