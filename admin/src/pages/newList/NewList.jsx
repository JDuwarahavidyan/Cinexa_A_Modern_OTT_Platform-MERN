import React from 'react'
import './newList.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useContext, useEffect } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { ListContext } from '../../context/listContext/ListContext';
import { getMovies } from '../../context/movieContext/apiCalls';
import { createList } from '../../context/listContext/apiCalls';
import { useNavigate  } from 'react-router-dom';




export default function NewList() {
  const [type, setType] = useState(''); // Separate state for type
  const [content, setContent] = useState([]); // Separate state for content
  const [list, setList] = useState({ title: '', genre: '', type: '', content: [] });
  const navigate = useNavigate();

  const { dispatch } = useContext(ListContext); 
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext); 

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setType(value);
    setList((prevList) => ({ ...prevList, type: value }));
  };

  const handleContentChange = (event) => {
    const { value } = event.target;
    setContent(value);
    setList((prevList) => ({ ...prevList, content: value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setList((prevList) => ({ ...prevList, [name]: value }));
  };

  // console.log(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    navigate("/lists");
  
  };

  return (
    <div className="newProduct">
    <h1 className="addProductTitle">New List</h1>
    <form className="addProductForm">

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
          <TextField 
            className="newProductItem" 
            id="outlined-basic" 
            size="small" 
            label="Genre" 
            variant="outlined" 
            name='genre' 
            onChange={handleChange}
          />
        </div>

      <div className="addProductItem">
          <FormControl fullWidth>
          <InputLabel size="small" className='selectlabel' id="demo-simple-select-label">Type</InputLabel>
              <Select 
                name='type'
                className="newUserSelect"
                labelId="demo-simple-select-label"
                id="demo-simple-select isSeries"
                value={type}
                label="Type"
                onChange={handleTypeChange}
              >
                  <MenuItem value={"movie"}>Movie</MenuItem>
                  <MenuItem value={"series"}>Series</MenuItem>

              </Select>
          </FormControl>
      </div>



      <div className="addProductItem">
        <FormControl fullWidth>
          <InputLabel size="small" className='selectlabel' id="demo-simple-select-label">Content</InputLabel>
          <Select multiple
            name='content'
            className="newUserSelect"
            labelId="demo-simple-select-label"
            id="demo-simple-select isSeries"
            value={content} 
            label="Content"
            onChange={handleContentChange}
          >
            {movies.map((movie) => (
              <MenuItem key={movie._id} value={movie._id}>{movie.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

    </form>
    <button className="addCreateButton" onClick={handleSubmit}>Create</button>
  </div>
  )
}
