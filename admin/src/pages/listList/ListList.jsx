import './listList.css'
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { deleteList, getLists } from '../../context/listContext/apiCalls';
import { ListContext } from '../../context/listContext/ListContext';


export default function ListList() {
    const { lists, dispatch } = useContext(ListContext);

    useEffect(() => {
      getLists(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
      deleteList(id, dispatch);
  };

  //  console.log(lists)

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "type", headerName: "Type", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/list/" + params.row._id} state={{ lists: params.row }}>
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
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={11}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  )
}
