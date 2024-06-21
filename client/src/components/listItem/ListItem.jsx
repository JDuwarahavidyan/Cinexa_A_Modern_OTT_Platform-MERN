import './listItem.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  if (!movie) {
    return <div className="listItem loading">This takes little time! Thank you for your patience</div>;
  }

  return (
    <div className="listItemContainer">
      <Link to="/watch" state={{ movie: movie }}>
        <div
          className="listItem"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={movie.imgSm} alt={movie.title} />
          {isHovered && (
            <>
              {movie.trailer && <video src={movie.trailer} autoPlay={true} loop />}
              <div className="itemInfo">
                <div className="icons">
                  <PlayArrowIcon className="icon" />
                  <AddIcon className="icon" />
                  <ThumbUpAltOutlinedIcon className="icon" />
                  <ThumbDownAltOutlinedIcon className="icon" />
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration + " |"}</span>
                  <span className="limit">{movie.limit}</span>
                  <span>{" | "+movie.year + " |"}</span>
                  <span className="genre">{movie.genre}</span>
                </div>
                <div className="desc">{movie.desc}</div>
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}