import './widgetLg.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function WidgetLg() {
  const Button = ({ props }) => {
    return <button className={"widgetLgButton " + props}>{props}</button>;
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Other Details</h3>
      <TableContainer className='container' component={Paper}>
        <Table className="widgetLgTable" sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow className="widgetLgTr">
              <TableCell className="widgetLgTh">Customer</TableCell>
              <TableCell className="widgetLgTh">Created At</TableCell>
              <TableCell className="widgetLgTh">Updated At</TableCell>
              <TableCell className="widgetLgTh">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(0, 5).map((user) => (
              <TableRow className="widgetLgTr" key={user._id}>
                <TableCell className="widgetLgUser" component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <Avatar className="widgetLgImg" alt={user.username} src={user.profilePic || "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"} />
                  </Stack>
                  <span className="widgetLgName">{user.username}</span>
                </TableCell>
                <TableCell className="widgetLgDate">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="widgetLgDate">{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell className="widgetLgStatus"><Button props={user.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
