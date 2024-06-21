import './productList.css'
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";


export default function ProductList() {
    // const [data, setData] = useState(productRows);
    const { movies, dispatch } = useContext(MovieContext);

    useEffect(() => {
      getMovies(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
      // setData(data.filter((item) => item.id !== id));
      deleteMovie(id, dispatch);
  };

  // console.log(movies)

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },

    {
      field: "movie",
      headerName: "Movie",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 150 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movie/" + params.row._id} state={{ movies: params.row }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='productList'>
        <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  )
}
