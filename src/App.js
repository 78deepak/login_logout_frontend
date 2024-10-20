
import './App.css';
import Signup from './pages/Signup';
import Login, { BioContext } from './pages/Login';
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
// import { BioContext } from './pages/Login';
// import { BioProvider } from './pages/Login';
import Header from './component/Header';
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
        <Route path="/login" element={<Login/>}/>
        <Route path="/addimg" element={<AddImg/>}/>
        <Route path="/allpost" element={<PrivateRoute element={<AllPost/>}/>}/>

      </Routes>
     
    </div>
  );
}

export default App;
