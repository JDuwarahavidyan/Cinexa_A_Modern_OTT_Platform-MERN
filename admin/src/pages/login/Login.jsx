import "./login.scss";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent the page from refreshing
        const errorMsg = await login({ email, password }, dispatch);
        if (errorMsg) {
alert(errorMsg);
        }
    };

    useEffect(() => {  
        localStorage.setItem("user", JSON.stringify({ email, password }));
    }, [email, password]);

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <span className="logo">Cinexa Admin</span>
                </div>
            </div>

            <div className="container">
                <form>
                    <h1>Welcome to Cinexa</h1>
                    {error && <div className="error-alert">{error}</div>}
                    <TextField 
                        className="inputText" 
                        label="Email" 
                        type="email" 
                        variant="filled" 
                        size="small"
                        InputProps={{ disableUnderline: true }}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    />
                    <TextField 
                        className="inputText" 
                        label="Password" 
                        type="password" 
                        variant="filled"
                        size="small" 
                        InputProps={{ disableUnderline: true }}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    />
                    <Button 
                        className="loginButton"  
                        variant="contained"
                        onClick={handleLogin}
                        disabled={isFetching}
                    >Login</Button>
                </form>
            </div>
        </div>
    )
}
