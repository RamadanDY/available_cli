import React from 'react'
 import { HiOutlineHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FaRegMessage } from "react-icons/fa6";
 import '../App.css'
import logo from '../assets/culogo.png'
import LogoutButton from "../components/LogoutButton.jsx";
import { useNavigate } from 'react-router-dom';

 
 

const Navbar = () => {
  const navigate = useNavigate();
  const gotobookings = () => {
    navigate("/getbookings")
  }

  const gotoFeedback =() => {
    navigate('/feedbackform')
  }
  const home =() => {
    navigate('/')
  }
  return (
    <div className='navbar flex  items-center justify-between    ' >
      <div className="img-wrapper pl-20 items-center flex-row flex gap-4 cursor-pointer  ">
        <img src={logo} alt="hello" srcset="" />
        <h3 className="texts text-3xl font-extrabold">
          CLHAS
        </h3>
      </div>
      <div className="btn-wrapper flex p-14 flex-row gap-3 "   >
        <div className="p-4  cursor-pointer" onClick={home}>
          <HiOutlineHome size={25}/>
          <p>Home</p>
        </div> 
        <div className="p-4  cursor-pointer" onClick={gotobookings}>
          <HiOutlineHome size={25}/>
          <p>Bookings</p>
        </div> 
        <div className="p-4  cursor-pointer ">
          <CgProfile size={25}/>
          <p>My Profile</p>
        </div> 
        <div className="p-4  cursor-pointer" onClick={gotoFeedback}>  
          <FaRegMessage size={25}/>
          <p>Suggestions</p>
        </div> 
        <LogoutButton />
      </div>
    </div>
 )   
}

export default Navbar
