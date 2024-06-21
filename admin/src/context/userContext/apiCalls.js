import axios from "axios";
import { 
  getUsersFailure, 
  getUsersStart, 
  getUsersSuccess,
  createUserFailure,
  createUserStart,
  createUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,

} from "./UserAction"


// GET UserS
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};
// CREATE User
export const createUser = async (User, dispatch) => {
    dispatch(createUserStart());
    try {
        const res = await axios.post("/users", User, {
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(createUserSuccess(res.data));
    } catch (err) {
      dispatch(createUserFailure());
    }
};

// UPDATE User
export const updateUser = async (id, User, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put("/users/" + id, User, {
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      dispatch(updateUserFailure());
    }
};


// DELETE User
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("/users/" + id, {
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
};
