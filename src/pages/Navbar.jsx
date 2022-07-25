import React,{useState,useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const ResponsiveNavBar = () => {
  const navigate = useNavigate();
  const {authState,setAuthState} = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = () =>{
    axios.get("http://localhost:3001/Auth/logout",{withCredentials:true}).then((res) => {
      console.log(res);
        setAuthState({username:"",id:0 ,status:false,disable:true})
        navigate('/')
  })};
  return (
    <div className='bg-[#CF7C84] pt-4'>
      <div className='hidden md:flex'>
        <div className='font-bold text-3xl ml-2'>LOGO
          </div>
    {!authState.status ?(
      <Link className='ml-auto mr-10 font-bold text-2xl text-[#A00A0A]' to={'/login'}>
              Login
  </Link>):(
          <><Link className='ml-auto mr-2 font-bold text-2xl text-[#A00A0A] hover:text-[#4f0404]' to={'/profile'}>
          <div>Manage Profile</div>
          </Link>
  <div className=' mr-2 font-bold text-2xl text-[#A00A0A]'>
    Welcome {authState.username}
    <button className='mx-4 hover:text-[#4f0404]' onClick={logout}>Logout</button>
 </div></>
  )
  }
  </div>
  <div className='font-bold text-3xl ml-2 md:hidden float-left'>LOGO
          </div>
    <button
    type="button"
    aria-label="Toggle mobile menu"
    onClick={() => setMenuOpen(!menuOpen)}
    className="float-right rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
    >
    <MenuAlt4Svg menuOpen={menuOpen} />
  </button>
<div className="py-4">
  {menuOpen && (
    <MobileMenu className="ease-linear">
  <div>
  {!authState.status ?(
    <Link className='ml-auto mr-10 font-bold text-2xl text-[#A00A0A]' to={'/login'}>
              Login
</Link>):(<><Link className='ml-auto mr-2 font-bold text-2xl text-[#A00A0A] hover:text-[#4f0404]' to={'/profile'}>
          <div>Manage Profile</div>
          </Link>
  <div className=' mr-2 font-bold text-2xl text-[#A00A0A]'>
    Welcome {authState.username}<br />
    <button className='mx-4 mt-2 hover:text-[#4f0404]' onClick={logout}>Logout</button>
 </div></>
  )
}
</div>
        </MobileMenu>
 )}
 </div>
    </div>
  );
};
const MobileMenu = ({ children }) => (
  <nav className="ease-in-out p-4 flex flex-col space-y-3 md:hidden">
    {children}
  </nav>
);

const MenuAlt4Svg = ({ menuOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`transition duration-100 ease h-8 w-8 ${
      menuOpen ? "transform rotate-90" : ""
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
