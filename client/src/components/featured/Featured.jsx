import './featured.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        let res;
        if (type) {
          res = await axios.get(`/movies/random?type=${type}`, {
            headers: {
              authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
        } else {
          const resMovies = await axios.get(`/movies/random?type=movie`, {
            headers: {
              authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          const resSeries = await axios.get(`/movies/random?type=series`, {
            headers: {
              authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          const combined = [...resMovies.data, ...resSeries.data];
          res = { data: combined };
        }
        // Pick a random content from the combined results
        setContent(res.data[Math.floor(Math.random() * res.data.length)]);
      } catch (err) {
        console.log(err);
      }
    };

    getRandomContent();
    const intervalId = setInterval(getRandomContent, 10000); 

    return () => clearInterval(intervalId); 
  }, [type]);

  console.log(content);

  return (
    <div className='featured'>
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
            <option value="">Select a Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="action">Action</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="fantasy">antasy</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}

      {content.img && <img src={content.img} alt="" />}
      <div className="info">
        {content.imgTitle && <img src={content.imgTitle} alt="" />}

        {content.desc && <span className="desc">{content.desc}</span>}
        <div className="buttons">
          <Button className="play" variant="contained" startIcon={<PlayArrowIcon />}>
            Play
          </Button>
          <Button className="more" variant="contained" startIcon={<InfoOutlinedIcon />}>
            Info
          </Button>
        </div>
      </div>
    </div>
  );
}