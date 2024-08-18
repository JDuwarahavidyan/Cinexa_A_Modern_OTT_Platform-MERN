import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/movie";
import NewMovie from "./pages/newMovie/NewMovie";




function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login />: <Navigate to="/"/>} /> 

        {user &&(

          <Route 
            path="/*"
            element={
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Routes>
                  <Route exact path="/" element={user ? <Home />: <Navigate to="/login"/>} />

                  <Route path="/users" element={<UserList />} />
                  <Route path="/user/:userID" element={<User />} />
                  <Route path="/newUser" element={<NewUser />} />

                  <Route path="/movies" element={<MovieList />} />
                  <Route path="/movie/:productID" element={<Movie />} />
                  <Route path="/newMovie" element={<NewMovie />} />

                  <Route path="/lists" element={<ListList />} />
                  <Route path="/list/:listID" element={<List />} />
                  <Route path="/newlist" element={<NewList />} />

                </Routes>
              </div>
            </>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
