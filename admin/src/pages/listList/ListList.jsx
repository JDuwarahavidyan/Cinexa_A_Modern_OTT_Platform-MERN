import './listList.css';
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { deleteList, getLists } from '../../context/listContext/apiCalls';
import { ListContext } from '../../context/listContext/ListContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function ListList() {
    const { lists, dispatch } = useContext(ListContext);
    const [open, setOpen] = useState(false);
    const [selectedListId, setSelectedListId] = useState(null);

    useEffect(() => {
      getLists(dispatch);
      console.log(lists);
    }, [dispatch]);

    const handleDelete = () => {
      deleteList(selectedListId, dispatch);
      handleClose();
      window.location.reload();
    };

    const handleClickOpen = (id) => {
      setSelectedListId(id);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

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
                onClick={() => handleClickOpen(params.row._id)}
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this list?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
