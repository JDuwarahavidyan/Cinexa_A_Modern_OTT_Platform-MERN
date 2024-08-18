import React from 'react'
import './newMovie.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useContext } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import  storage  from '../../firebase';
import { createMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useNavigate  } from 'react-router-dom';


export default function NewMovie() {
  const [active, setActive] = React.useState('');

  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const navigate = useNavigate();
  
  const {dispatch}  = useContext(MovieContext); 


  

  const handleSeries = (event) => {
    setActive(event.target.value);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setMovie({...movie, [event.target.name]: value});
  };
   
  const handleCombinedChange = (event) => {
    handleChange(event);
    handleSeries(event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    navigate('/movies');
  }

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = uploadBytesResumable(ref(storage, `/items/${fileName}`), item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };
    
  
  

  // console.log(movie); //uploading % can be seen in console
  // console.log(img);

  return (
    <div className="newProduct">
    <h1 className="addProductTitle">Create New Movie</h1>
    <form className="addProductForm">

      <div className="addProductItem">
        <label>Image</label>
        <input type="file" id="img" name='img' onChange={e=>setImg(e.target.files[0])}/>
      </div>

      <div className="addProductItem">
        <label>Title Image</label>
        <input type="file" id="imgTitle" name='imgTitle' onChange={e=>setImgTitle(e.target.files[0])}/>
      </div>

      <div className="addProductItem">
        <label>Thumbnail Image</label>
        <input type="file" id="imgSm" name='imgSm' onChange={e=>setImgSm(e.target.files[0])}/>
      </div>

      <div className="addProductItem">
        <TextField 
          className="newProductItem" 
          id="outlined-basic" 
          size="small" 
          label="Title" 
          variant="outlined" 
          name='title' 
          onChange={handleChange}
        />
      </div>
      <div className="addProductItem">
        <TextField className="newProductItem" id="outlined-basic" size="small" label="Description" variant="outlined" name='desc' onChange={handleChange}/>
      </div>

      <div className="addProductItem">
        <TextField  className="newProductItem" id="outlined-basic" size="small" label="Year" variant="outlined" name='year' onChange={handleChange}/>
      </div>

      <div className="addProductItem">
        <TextField className="newProductItem" id="outlined-basic" size="small" label="Genre" variant="outlined" name='genre' onChange={handleChange}/>
      </div>

      <div className="addProductItem">
        <TextField className="newProductItem" id="outlined-basic" size="small" label="Duration" variant="outlined" name='duration' onChange={handleChange}/>
      </div>

      <div className="addProductItem">
        <TextField className="newProductItem" id="outlined-basic" size="small" label="Limit" variant="outlined" name='limit' onChange={handleChange}/>
      </div>

      <div className="addProductItem">
          <FormControl fullWidth>
          <InputLabel size="small" className='selectlabel' id="demo-simple-select-label">Is Series?</InputLabel>
              <Select
                name='isSeries'
                className="newUserSelect"
                labelId="demo-simple-select-label"
                id="demo-simple-select isSeries"
                value={active}
                label="Is Series"
                onChange={handleCombinedChange}
              >
                  <MenuItem value={"false"}>No</MenuItem>
                  <MenuItem value={"true"}>Yes</MenuItem>

              </Select>
          </FormControl>
      </div>

      <div className="addProductItem">
        <label>Trailer</label>
        <input type="file" id="imgSm" name='trailer' onChange={e=>setTrailer(e.target.files[0])}/>
      </div>

      <div className="addProductItem">
        <label>Video</label>
        <input type="file" id="imgSm" name='video' onChange={e=>setVideo(e.target.files[0])}/>
      </div>

      {uploaded === 5 ?(
        <button className="addProductButtonUpdate" onClick={handleSubmit}>Update</button>
      ): (
        <button className="addProductButtonUpload" onClick={handleUpload}>Upload</button>
      )}
      

    </form>
  </div>
  )
}
