import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [searchText, setSearchText] = useState ("");
  const [playerData, setPlayerData] = useState ({});
  const API_KEY=  "RGAPI-6453d0f0-1d35-4e8e-9cf3-66d58cf8fa0b";
  console.log(searchText)
    let APICallString="https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText+"?api_key="+API_KEY;
    console.log(APICallString)
    axios.get(APICallString)
    .then((response)=>{
      console.log(response.data)
    })
    .catch((error)=> console.log(error))
   }

  return (
    <div className="App">
      
       <div className= "container">
          <h5>League of Legends Player Searcher</h5>
          <input type = "text" onChange={e => setSearchText(e.target.value)}></input>
          <button onClick={e => searchForPlayer(e)}>Search For Player</button>
        </div>
    </div>
  );




export default App;
