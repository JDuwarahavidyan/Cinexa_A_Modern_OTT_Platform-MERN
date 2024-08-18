import "./login.scss";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            login({ email, password }, dispatch);
        } catch (e) { 
            console.log(e);
        }
        
    };


    return (
      <div className="login">
        <div className="top">
            <div className="wrapper">
                <img src="https://raw.githubusercontent.com/DuwarahavidyanJ/images/main/cinexa.png" alt="logo" className="logo" />
            </div>
        </div>

        <div className="container">
            <form>
                <h1>Sign In</h1>
                <TextField 
                    className="inputText" 
                    label="Email" 
                    type="email" 
                    variant="filled" 
                    size="small"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField 
                    className="inputText" 
                    label="Password" 
                    type="password" 
                    variant="filled"
                    size="small" 
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button 
                    className="loginButton"  
                    variant="contained"
                    onClick={handleLogin}
                >Sign In</Button>

                <span>
                    New to CineXa?  
                    <Link to={"/register"}>
                        <b> Sign up now.</b>
                    </Link>
                </span>
                <small>
                    This page is protected by Google reCAPTCHA to ensure you're not a
                    bot. <b>Learn more</b>.
                </small>
            </form>
        </div>
    </div>
  )
}
