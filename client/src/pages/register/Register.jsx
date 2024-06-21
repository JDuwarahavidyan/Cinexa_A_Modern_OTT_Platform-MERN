import "./register.scss";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    
    const handleStart = () => {
        setEmail(emailRef.current.value);
    };

    const handleFinish = async (e) => {
        e.preventDefault();
        const newPassword = passwordRef.current.value;
        const newUsername = usernameRef.current.value;

        setPassword(newPassword);
        setUsername(newUsername);

        console.log("Registering user with email:", email, "username:", newUsername, "password:", newPassword);

        try {
            await axios.post("http://localhost:3000/auth/register", {
                email,
                username: newUsername,
                password: newPassword,
            });
            navigate("/login");
        } catch (err) {
            console.log("Error:", err.response ? err.response.data : err.message);
            alert("The Email or Username is already in use!!! Please try again with a different Email or Username");
        }
    };

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img src="https://raw.githubusercontent.com/DuwarahavidyanJ/images/main/cinexa.png" alt="logo" className="logo" />
                    <Link to={"/login"}>
                        <Button className="loginButton" variant="contained">Sign In</Button>
                    </Link>
                </div>
            </div>

            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. </h2>
                <p>Ready to watch? Enter your email to get started.</p>

                {!email ? (
                    <div className="input">
                        <TextField 
                            className="inputText" 
                            label="Email Address" 
                            type="email" 
                            variant="filled" 
                            inputRef={emailRef}
                        />
                        <Button 
                            onClick={handleStart} 
                            className="registerButton"  
                            variant="contained" 
                            endIcon={<ArrowForwardIosIcon />}
                        >
                            Get Started 
                        </Button>
                    </div>
                ) : (
                    <form className="input" onSubmit={handleFinish}>
                        <TextField 
                            className="inputText" 
                            label="Username" 
                            type="text" 
                            variant="filled" 
                            inputRef={usernameRef}
                        />
                        <TextField 
                            className="inputText" 
                            label="Password" 
                            type="password" 
                            variant="filled" 
                            inputRef={passwordRef}
                        />
                        <Button 
                            type="submit"
                            className="registerButton"  
                            variant="contained" 
                            endIcon={<ArrowForwardIosIcon />}
                        >
                            Start
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
