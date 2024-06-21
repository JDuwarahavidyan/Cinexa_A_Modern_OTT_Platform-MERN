import React from "react";
import { Link } from 'react-router-dom'
import './list.css'
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import PublishIcon from '@mui/icons-material/Publish';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";




export default function List() {

    const location = useLocation();
    const list = location.state.lists;

    useEffect(()=>{    
             console.log("location",location);  
           },[]);

    // const [active, setActive] = React.useState('');
    // const handleChangeActive = (event) => {
    //     setActive(event.target.value);
    // };

    // updateMovie(movie._id, movie);

  return (
    <div className='product'>
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to='/newList'>
        <button className="productAddButton">Create</button>
        </Link>
      </div>

      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                
                <span className="productName">{list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">ID:  </span>
                      <span className="productInfoValue">{list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Genre:</span>
                      <span className="productInfoValue">{list.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Type:</span>
                      <span className="productInfoValue">{list.type}</span>
                  </div>
    
              </div>
          </div>
      </div>

      <div className="productBottom">
          <form className="productForm">
                <div className="productFormLeft">
                    <h2>Update the movie {list.title}</h2>
                    <div className="productUpdateItem">
                        <TextField type="text"  id="outlined-basic" size="small" label="List Title" variant="outlined" />
                    </div>

                    <div className="productUpdateItem">
                        <TextField type="text"  id="outlined-basic" size="small" label="List Type" variant="outlined" />
                    </div>

                    <div className="productUpdateItem">
                        <TextField type="text"  id="outlined-basic" size="small" label="Genre" variant="outlined" />
                    </div>
                    

                    {/* <div className="productUpdateItem">
                        <FormControl  fullWidth>
                            <InputLabel  size="small" className='selectlabel' id="demo-simple-select-label">In Stock</InputLabel>
                                <Select
                                    className="newUserSelect"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select idStock"
                                    value={stock}
                                    label="In Stock"
                                    onChange={handleChangeStock}
                                    >

                                    <MenuItem value={"yes"}>Yes</MenuItem>
                                    <MenuItem value={"no"}>No</MenuItem>
                                </Select>

                        </FormControl>
                        </div>
                        <div className="productUpdateItem">
                            <FormControl fullWidth>
                            <InputLabel size="small" className='selectlabel' id="demo-simple-select-label">Active</InputLabel>
                                <Select
                                    className="newUserSelect"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select active"
                                    value={active}
                                    label="In Stock"
                                    onChange={handleChangeActive}
                                >
                                    <MenuItem value={"yes"}>Yes</MenuItem>
                                    <MenuItem value={"no"}>No</MenuItem>
                                </Select>
                        </FormControl>
                    </div> */}

                </div>

                <div className="productFormRight">
                  
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  )
}
