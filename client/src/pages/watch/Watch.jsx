import './watch.scss'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Watch() {
  const location = useLocation(); //useLocation is a hook from react-router-dom that returns the location object that represents the current URL.
  const movie = location.state.movie;

  // useEffect(()=>{    
  //    console.log("location",location);  
  //  },[]);

  return (
    <div className='watch'>

      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon/>
          Home
        </div>
      </Link>

      <video 
        src={movie.video}
        className="video" 
        autoPlay progress controls
      />
    </div>
   
  )
}
