import React from "react";
import { Link } from 'react-router-dom'
import './product.css'
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
import { useEffect, useState, useContext } from "react";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import  storage  from '../../firebase';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialMovie = location.state.movies;
    const [movie, setMovie] = useState(initialMovie);
    const { dispatch } = useContext(MovieContext);
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const [progress, setProgress] = useState(0); // Add progress state
    const [buffer, setBuffer] = useState(0); // Add buffer state
    const [active, setActive] = useState(movie.isSeries ? "true" : "false");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie((prev) => ({ ...prev, [name]: value }));
    };

    const handleSeriesChange = (e) => {
        const { value } = e.target;
        setActive(value);
        setMovie((prev) => ({ ...prev, isSeries: value === "true" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFields = Object.keys(movie).reduce((acc, key) => {
            if (movie[key] !== initialMovie[key]) {
                acc[key] = movie[key];
            }
            return acc;
        }, {});

        // Ensure that if a file is not uploaded, the previous URL is retained
        if (!img) updatedFields.img = movie.img;
        if (!imgTitle) updatedFields.imgTitle = movie.imgTitle;
        if (!imgSm) updatedFields.imgSm = movie.imgSm;
        if (!trailer) updatedFields.trailer = movie.trailer;
        if (!video) updatedFields.video = movie.video;

        updateMovie(movie._id, updatedFields, dispatch);
        navigate('/movies');
    };

    const upload = (items) => {
        let totalBytes = 0;
        let uploadedBytes = 0;

        items.forEach(item => {
            totalBytes += item.file.size;
        });

        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const uploadTask = uploadBytesResumable(ref(storage, `/items/${fileName}`), item.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const itemProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    const itemBuffer = (uploadedBytes / totalBytes) * 100;
                    setProgress(itemProgress);
                    setBuffer(itemBuffer);
                    console.log("Upload is " + itemProgress + "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setMovie((prev) => ({ ...prev, [item.label]: url }));
                        setUploaded((prev) => prev + 1);
                    });
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const items = [
            img ? { file: img, label: "img" } : null,
            imgTitle ? { file: imgTitle, label: "imgTitle" } : null,
            imgSm ? { file: imgSm, label: "imgSm" } : null,
            trailer ? { file: trailer, label: "trailer" } : null,
            video ? { file: video, label: "video" } : null,
        ].filter(item => item !== null);

        if (items.length > 0) {
            upload(items);
        } else {
            setUploaded(5); // Assume all files are uploaded if no new files are selected
        }
    };

    useEffect(() => {
        console.log("location", location);
    }, [location]);

    return (
        <div className='product'>
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to='/newMovie'>
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie.imgSm} alt="" className="productInfoImg" />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleSubmit}>
                    <div className="productFormLeft">
                        <h2>Update the {movie.isSeries? "Series" : "Movie"} {movie.title}</h2>
                        <div className="productUpdateItem">
                            <TextField
                                type="text"
                                id="outlined-basic"
                                size="small"
                                label="Movie Title"
                                name="title"
                                value={movie.title}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="productUpdateItem">
                            <TextField
                                type="text"
                                id="outlined-basic"
                                size="small"
                                label="Description"
                                name="desc"
                                value={movie.desc}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="productUpdateItem">
                            <TextField
                                type="text"
                                id="outlined-basic"
                                size="small"
                                label="Year"
                                name="year"
                                value={movie.year}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="productUpdateItem">
                            <TextField
                                type="text"
                                id="outlined-basic"
                                size="small"
                                label="Genre"
                                name="genre"
                                value={movie.genre}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="productUpdateItem">
                            <TextField
                                type="text"
                                id="outlined-basic"
                                size="small"
                                label="Duration"
                                name="duration"
                                value={movie.duration}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="productUpdateItem">
                            <TextField
                                type="text"
                                id="outlined-basic"
                                size="small"
                                label="Limit"
                                name="limit"
                                value={movie.limit}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="productUpdateItem">
                            <FormControl fullWidth>
                                <InputLabel size="small" className='selectlabel' id="demo-simple-select-label">Is Series?</InputLabel>
                                <Select
                                    name='isSeries'
                                    className="newUserSelect"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={active}
                                    label="Is Series"
                                    onChange={handleSeriesChange}
                                >
                                    <MenuItem value={"false"}>No</MenuItem>
                                    <MenuItem value={"true"}>Yes</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="addProductItem">
                            <label>Trailer</label>
                            <input type="file" id="trailer" name='trailer' onChange={e => setTrailer(e.target.files[0])} />
                            <label>Video</label>
                            <input type="file" id="video" name='video' onChange={e => setVideo(e.target.files[0])} />
                        </div>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <label>Image</label>
                            <img src={movie.img} alt="" className="productUploadImg" />
                            <label htmlFor="img">
                                <PublishIcon className="productUpdateIcon" />
                            </label>
                            <input type="file" id="img" style={{ display: "none" }} onChange={e => setImg(e.target.files[0])} />
                            <label>Image Thumbnail</label>
                            <img src={movie.imgSm} alt="" className="productUploadImgThumbnail" />
                            <label htmlFor="imgSm">
                                <PublishIcon className="productUpdateIcon" />
                            </label>
                            <input type="file" id="imgSm" style={{ display: "none" }} onChange={e => setImgSm(e.target.files[0])} />
                        </div>
                        <div className="productUpload">
                            <label>Image Title</label>
                            <img src={movie.imgTitle} alt="" className="productUploadImgTitle" />
                            <label htmlFor="imgTitle">
                                <PublishIcon className="productUpdateIcon" />
                            </label>
                            <input type="file" id="imgTitle" style={{ display: "none" }} onChange={e => setImgTitle(e.target.files[0])} />
                            {uploaded >= 1 ? (
                                <button className="addProductButtonUpdate" type="submit">Update</button>
                            ) : (
                                <button className="addProductButtonUpload" onClick={handleUpload}>Upload</button>
                            )}
                            {/* Progress bar */}
                            
                        </div>
                    </div>
                    <LinearProgress className="linear" variant="buffer" value={progress} valueBuffer={buffer} />
                </form>
            </div>
        </div>
    );
}