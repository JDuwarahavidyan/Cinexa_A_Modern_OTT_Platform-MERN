import React from './sidebar.css'
import LineStyleIcon from '@mui/icons-material/LineStyle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to='/' className='link'>
              <li className="sidebarListItem ">
                <LineStyleIcon className='sidebarIcon'/>
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <TimelineIcon className='sidebarIcon'/>
              Analytics
            </li>

            <li className="sidebarListItem">
              <TrendingUpIcon className='sidebarIcon'/>
              Sales
            </li>

          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className='link'>
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className='link'>
              <li className="sidebarListItem">
                <PlayCircleOutlineIcon className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className='link'>
              <li className="sidebarListItem">
                <ListIcon className="sidebarIcon" />
                Lists
              </li>
            </Link>
           
          </ul>
        </div>
      </div>
    </div>
  )
}
