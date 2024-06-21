import React, { useEffect } from 'react'
import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';



function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { dispatch } = useContext(AuthContext);
    

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };




  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
            <div className="left">

                <Link to={"/"} className='link'>
                <img src="https://raw.githubusercontent.com/DuwarahavidyanJ/images/main/cinexa.png" alt="" />
                </Link>

                <Link to={"/"} className='link'>
                    <span>Homepage</span>
                </Link>

                <Link to={"/series"} className='link'>
                    <span className="navbarmainLinks"> Series</span>
                </Link>

                <Link to={"/movies"} className='link'>
                    <span className="navbarmainLinks">Movies</span>
                </Link>

                <span>New and Popular</span>
                <span>My List</span>
            </div>
            <div className="right">
                <SearchIcon className="icon"/>
                <span>KID</span>
                <NotificationsIcon className="icon"/>
                <Avatar className='profileAvatar' alt="" src=  "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" />
                <div className="profile">
                    <KeyboardArrowDownIcon className="icon"/>
                    <div className="options">
                        <span>Settings</span>
                        <span onClick={()=>dispatch(logout())}>Logout</span>
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default Navbar
