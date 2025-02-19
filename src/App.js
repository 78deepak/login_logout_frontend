
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import {Navigate} from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import  { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import AddPost from './pages/AddPost';
import AddImg from './pages/AddImg';
import AllPost from './pages/AllPost';
import VerifyOTP from './component/VerifyOTP';
import Header from './component/Header';
import Contact from './component/Contact.js';
import AboutUs from './component/AboutUs.js';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
   
    <div className="App">
       <ToastContainer />
       <Header isAuthenticated={isAuthenticated} setIsAuthenticated ={setIsAuthenticated} />
       <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
       <Routes>
       <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
        <Route path="/addpost" element={<PrivateRoute element={<AddPost/>}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/addimg" element={<AddImg/>}/>
        <Route path="/allpost" element={<PrivateRoute element={<AllPost/>}/>}/>
        <Route path="/AboutUs" element ={<AboutUs/>}/>
        <Route path="/contact" element ={<Contact/>}/>


      </Routes>
     
    </div>
  );
}

export default App;
