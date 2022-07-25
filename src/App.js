import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router , Routes , Route }from 'react-router-dom';
import Home from './pages/Home';
import { AuthContext } from './pages/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { ResponsiveNavBar } from "./pages/Navbar";
function App() {
  const [authState,setAuthState] = useState({username:"",id:0 ,status:false,disable:true});
useEffect(()=>{
axios.post("http://localhost:3001/Auth/auth").then((response) => {
    console.log("user logged in");
    if(response.status===401){
        setAuthState({...authState,status:false})
        setAuthState({...authState,disable:true})
    }
    else{
        setAuthState({
            username:response.data.username,
            id:response.data.id,
            status:true,
            disable:false
        })
    }

})},[])
  return (
    <div className="App">
    <AuthContext.Provider value={{authState,setAuthState}}>
    <Router>
     <ResponsiveNavBar />
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Login" element={<Login />}/>
    <Route path="/Register" element={<Register />}/>
    <Route path="/Profile" element={<Profile />}/>
    </Routes>
    </Router>
  </AuthContext.Provider>
    </div>
  );
}

export default App;
