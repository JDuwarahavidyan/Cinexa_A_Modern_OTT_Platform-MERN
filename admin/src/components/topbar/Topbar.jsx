import React, { useContext } from 'react';
import './topbar.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/AuthActions';
import { useEffect } from 'react';
import { getUsers } from '../../context/userContext/apiCalls';




export default function Topbar() {
    const {dispatch } = useContext(AuthContext);





    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to={"/"} className='link'>
                        <span className="logo">Cinexa Admin</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <Badge badgeContent={1} color="primary">
                            <NotificationsIcon color='black'/>
                        </Badge>
                    </div>

                    <div className="topbarIconContainer">
                        <SettingsIcon/>
                    </div>
                    <div className="topAvatar">
                        <Stack direction="row" spacing={1}>
                            <Avatar alt="Avatar" src= {"https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"} 
                            sx={{ width: 35, height: 35 }} />
                        </Stack>
                    </div>   
                    <div className="profile">
                        <KeyboardArrowDownIcon className="icon"/>
                        <div className="options">
                            <span>Settings</span>
                            <Link to={"/login"}>
                                <span onClick={()=>dispatch(logout())}>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
