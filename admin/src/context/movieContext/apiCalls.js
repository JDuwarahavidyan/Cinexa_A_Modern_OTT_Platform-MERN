import axios from "axios";
import { 
    getMoviesStart,
    getMoviesSuccess,
    getMoviesFailure,  
    deleteMovieStart,
    deleteMovieSuccess,
    deleteMovieFailure,
    createMovieStart,
    createMovieSuccess,
    createMovieFailure,
    updateMovieStart,
    updateMovieSuccess,
    updateMovieFailure
} from "./MovieAction"


// GET MOVIES
export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
      const res = await axios.get("/movies", {
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(getMoviesSuccess(res.data));
    } catch (err) {
      dispatch(getMoviesFailure());
    }
};
  
// CREATE MOVIE
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post("/movies", movie, {
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(createMovieSuccess(res.data));
    } catch (err) {
      dispatch(createMovieFailure());
    }
};

// UPDATE MOVIE
export const updateMovie = async (id, movie, dispatch) => {
  dispatch(updateMovieStart());
  try {
      const res = await axios.put(`/movies/${id}`, movie, {
          headers: {
              authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
      });
      dispatch(updateMovieSuccess(res.data));
  } catch (err) {
      dispatch(updateMovieFailure(err.message)); // Pass error message to updateMovieFailure
  }
};

// DELETE MOVIE
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("/movies/" + id, {
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(deleteMovieSuccess(id));
    } catch (err) {
      dispatch(deleteMovieFailure());
    }
};
