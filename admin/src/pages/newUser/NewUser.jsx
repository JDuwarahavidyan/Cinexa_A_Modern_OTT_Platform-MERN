import React from "react";
import "./newUser.css";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function NewUser() {
    const [active, setActve] = React.useState('');

    const handleChange = (event) => {
        setActve(event.target.value);
    };
  return (
  
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">

        <div className="newUserItem">
            <TextField className="newUserItem" id="outlined-basic" size="small" label="Username" variant="outlined" />
        </div>
        <div className="newUserItem">
            <TextField className="newUserItem" id="outlined-basic" size="small" label="Full Name" variant="outlined" />
        </div>
        <div className="newUserItem">
          <TextField className="newUserItem" id="outlined-basic" size="small" type="email" label="Email" variant="outlined" />
        </div>
        <div className="newUserItem">
            <TextField className="newUserItem" id="outlined-basic" size="small" type="password" label="Password" variant="outlined" />
        </div>
        <div className="newUserItem">
          <TextField className="newUserItem" id="outlined-basic" size="small" type="text" label="Phone" variant="outlined" />
        </div>
        <div className="newUserItem">
          <TextField className="newUserItem" id="outlined-basic" size="small" type="text" label="Address" variant="outlined" />
        </div>

        <div className="newUserItem">
            <FormControl>
                <FormLabel size="small" id="demo-row-radio-buttons-group-label" className="radiobtn" >Gender</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <div className="newUserGender">
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </div>

                </RadioGroup>
            </FormControl>
        </div>

        
        <div className="newUserItem">
            <FormControl fullWidth>
            <InputLabel size="small" className='selectlabel' id="demo-simple-select-label">Active</InputLabel>
                <Select
                    className="newUserSelect"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={active}
                    label="Active"
                    onChange={handleChange}
                >
                    <MenuItem value={"yes"}>Yes</MenuItem>
                    <MenuItem value={"no"}>No</MenuItem>

                </Select>
            </FormControl>
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}