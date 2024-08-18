import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("auth/login", user);
        if (res.data.isAdmin) {
            dispatch(loginSuccess(res.data));
            return null; // No error
        } else {
            dispatch(loginFailure());
            return "Not an admin";
        }
    } catch (err) {
        dispatch(loginFailure());
        return "Invalid email or password"; // Return error message
    }
}
