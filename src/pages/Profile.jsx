import React,{useContext,useState} from 'react'
import { AuthContext } from './AuthContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function Profile() {
  const {authState,setAuthState} = useContext(AuthContext);
  const navigate = useNavigate();
  const [oldPassword,setOldPassword] =useState("");
  const [newPassword,setNewPassword] =useState("");
  const [username,setNewUsername] =useState("");
  const changePassword = () =>{
    axios.put("http://localhost:3001/Auth/changepassword",{oldPassword:oldPassword,newPassword:newPassword,UserId:authState.id}).then((res)=>{
     console.log(res.data); 
    if(res.data.error){
        alert(res.data.error);
      }
      else{
      window.alert("Re-login to continue");
      axios.get("http://localhost:3001/Auth/logout",{withCredentials:true}).then((res) => {
        console.log(res);
        setAuthState({username:"",id:0 ,status:false,disable:true})
        navigate('/');
      })
    }})}
  const changeUsername = () =>{
    axios.put("http://localhost:3001/Auth/changeusername",{oldPassword:oldPassword,username:username,UserId:authState.id}).then((res)=>{
    if(res.data.error){
        alert(res.data.error);
      }
      else{
        window.alert("Re-login to continue");
        axios.get("http://localhost:3001/Auth/logout",{withCredentials:true}).then((res) => {
          console.log(res);
            setAuthState({username:"",id:0 ,status:false,disable:true})
            navigate('/')
      })
      }
  })}
  
  return (
    <>
    <div className='font-bold text-3xl'>Profile Page</div>
    <div className='flex flex-col'>
    <h1 className='text-2xl font-bold'>Change Username</h1>
      <div className='flex flex-col mx-auto'>
    <input onChange={(event)=>{setOldPassword(event.target.value)}} className='border-2' type="text" placeholder='Password' />
    <input onChange={(event)=>{setNewUsername(event.target.value)}} className='border-2' type="text" placeholder='New Username' />
    <button onClick={changeUsername} className='border-2 border-black bg-gray-200'>Save Changes</button>
    </div>
      <div className='flex flex-col mx-auto'>
    <h1 className='text-2xl font-bold'>Change Password</h1>
    <input onChange={(event)=>{setOldPassword(event.target.value)}} className='border-2' type="text" placeholder='Old Password' />
    <input onChange={(event)=>{setNewPassword(event.target.value)}} className='border-2' type="text" placeholder='New Password' />
    <button onClick={changePassword} className='border-2 border-black bg-gray-200'>Save Changes</button>
    </div>
    </div>
  </>
  )
}

export default Profile