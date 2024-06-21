import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext/UserContext';
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);


  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteUser(id, dispatch);
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Avatar className="userListImg" src={params.row.avatar || "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"} alt=""/>
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 120,
    },
    


    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}