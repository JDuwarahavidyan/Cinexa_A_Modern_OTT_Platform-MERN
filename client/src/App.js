import { useContext } from 'react';
import './app.scss'
import Home from "./pages/home/Home";
import Login from './pages/login/Login';

import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';

//// installing to react-router-dom to use routing and navigation in our app

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/authContext/AuthContext';


function App() {
  const {user} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {/* exact is to match the path as we use / with movies it will always go to home without exact */}
    
        <Route exact path="/" element={user ? <Home />: <Navigate to="/register"/>} />

        <Route path="/register" element={!user ? <Register />: <Navigate to="/"/>} /> 

        <Route path="/login" element={!user ? <Login />: <Navigate to="/"/>} />  
        
        {
          user && (
            <>
              <Route path="/movies" element={<Home type="movie"/>} />
      
              <Route path="/series" element={<Home type="series"/>} />
              
              <Route path="/watch" element={<Watch />} /> 
            </>
          )
        }

      </Routes>
    </BrowserRouter>
  );
}

export default App;
