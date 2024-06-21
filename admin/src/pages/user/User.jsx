import './user.css'
import { Stack } from '@mui/material'
import { Avatar } from '@material-ui/core'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import PublishIcon from '@mui/icons-material/Publish';
import { Link } from 'react-router-dom';

export default function User() {

    return (
        

    <div className='user'>
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
            <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
            <div className="userShowTop">
                <Stack direction="row" spacing={2}>
                <Avatar
                    src="https://img.freepik.com/free-photo/portrait-happy-young-man-white-suit-eyeglasses_1142-51365.jpg?t=st=1712994115~exp=1712997715~hmac=e3b20fc36b6f10fa4f5392c7f05a53aef7f72eb7f43012b4ce3619a6ed8da133&w=740"
                    alt=""
                    className="userShowImg"
                />
                </Stack>
                <div className="userShowTopTitle">
                    <span className='userShowUsername'>Mark Zuckerberg</span>
                    <span className='userShowUserTitle'>Premium User</span>
                </div>
            </div>

            <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                    <PermIdentityIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">markzuckerberg99</span>
                </div>

                <div className="userShowInfo">
                    <CalendarTodayIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">27.03.1999</span>
                </div>

                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                    <PhoneAndroidIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">+94 77 989 1954</span>
                </div>

                <div className="userShowInfo">
                    <MailOutlineIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">markzuck99@gmail.com</span>
                </div>

                <div className="userShowInfo">
                    <LocationOnIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">Hapugala, Galle</span>
                </div>
            </div>
        </div>

        <div className="userUpdate">
        <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <TextField  className="userUpdateInput" id="outlined-basic" label="Username" variant="outlined" />
              </div>

              <div className="userUpdateItem">
                <TextField className="userUpdateInput" id="outlined-basic" label="Full Name" variant="outlined" />
              </div>

              <div className="userUpdateItem">
                <TextField className="userUpdateInput" id="outlined-basic" type='email' label="Email" variant="outlined" />
              </div>
              <div className="userUpdateItem">
                <TextField className="userUpdateInput" id="outlined-basic" type='text' label="Phone" variant="outlined" />
              </div>
              <div className="userUpdateItem">
                <TextField className="userUpdateInput" id="outlined-basic" type='text' label="Address" variant="outlined" />
              </div>
              
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
              <Stack direction="row" spacing={2}>
                <Avatar
                    src="https://img.freepik.com/free-photo/portrait-happy-young-man-white-suit-eyeglasses_1142-51365.jpg?t=st=1712994115~exp=1712997715~hmac=e3b20fc36b6f10fa4f5392c7f05a53aef7f72eb7f43012b4ce3619a6ed8da133&w=740"
                    alt=""
                    className="userUpdateImg"
                    
                />
                </Stack>
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
