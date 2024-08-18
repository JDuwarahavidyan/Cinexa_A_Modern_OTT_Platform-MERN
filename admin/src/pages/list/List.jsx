import React from "react";
import { Link } from 'react-router-dom';
import './list.css';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { useNavigate } from 'react-router-dom';

export default function List() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialList = location.state.lists;
    const [list, setList] = useState(initialList);
    const { dispatch } = useContext(ListContext);
    const [active, setActive] = useState(list.type ? "movie" : "series");

    useEffect(() => {
        console.log("location", location);
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setList((prev) => ({ ...prev, [name]: value }));
    };

    const handleListChange = (e) => {
        const { value } = e.target;
        setActive(value);
        setList((prev) => ({ ...prev, type: value === "movie" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFields = Object.keys(list).reduce((acc, key) => {
            if (list[key] !== initialList[key]) {
                acc[key] = list[key];
            }
            return acc;
        }, {});

        updateList(list._id, updatedFields, dispatch);
        navigate('/lists');
    };

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
                            <span className="productInfoKey">ID:</span>
                            <span className="productInfoValue">{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre:</span>
                            <span className="productInfoValue">{list.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Type:</span>
                            <span className="productInfoValue">{list.type ? "Movie" : "Series"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="productBottom">
                <form className="productForm" onSubmit={handleSubmit}>
                    <div className="productFormLeft">
                        <h2>Update the {list.type ? "Movie" : "Series"} {list.title}</h2>
                        <div className="productUpdateItem">
                            <TextField
                                type="text"
                                id="outlined-basic"
                                size="small"
                                label="List Title"
                                name="title"
                                value={list.title}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="productUpdateItem">
                            <FormControl fullWidth>
                                <InputLabel size="small" className='selectlabel' id="demo-simple-select-label">List Type</InputLabel>
                                <Select
                                    name='type'
                                    className="newUserSelect"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={active}
                                    label="List Type"
                                    onChange={handleListChange}
                                >
                                    <MenuItem value={"movie"}>Movie</MenuItem>
                                    <MenuItem value={"series"}>Series</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="productUpdateItem">
                            <TextField
                                type="text"
                                id="outlined-basic"
                                size="small"
                                label="Genre"
                                name="genre"
                                value={list.genre}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="productFormRight">
                        <button className="productButton" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
