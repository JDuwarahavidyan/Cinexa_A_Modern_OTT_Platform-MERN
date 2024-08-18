import { useEffect } from 'react'
import { useState } from 'react'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import Navbar from '../../components/navbar/Navbar'
//axios are used to fetch the api and proxy is used in package.json to avoid cors error
import axios from "axios";


import './home.scss'

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() =>{
    const getRandomLsits = async ()=>{
      try{
        const query = `/lists${type ? `?type=${type}` : ''}${type && genre ? '&' : ''}${genre ? `genre=${genre}` : ''}`;
        const res = await axios.get(query, {
          headers: {
            authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });

        if (res.data.length === 0) {
          alert('No movies found in the selected genre. Please select another genre.');
          e.preventDefault();
        }
        // console.log(res)
        
        setLists(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getRandomLsits();
  }, [type,genre]
);
  return (
    <div className='home'>
      <Navbar/>
      <Featured type={type} setGenre={setGenre}/>

      {lists.map((list) => (
        <List key={list._id} list={list}/>
      ))}

    
    </div>
  )
}

export default Home

