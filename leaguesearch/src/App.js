import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import axios from 'axios';
import IMAGES from './images.js';
import matchQueryService from './services/match.js';
import Sidebar from './components/Sidebar';
import TopbarDefault from './components/TopBarDefault';
import MiddleDefault from './components/MiddleDefault';





function App() {
  const [searchText, setSearchText] = useState ("");
  const [playerData, setPlayerData] = useState ({});
  const [playerTier, setPlayerTier] = useState ("");

  const API_KEY=  "RGAPI-c6ef3ac7-151b-4dca-a485-eb46a631d7ff";
  console.log(searchText)

  //function to search player
  function searchForPlayer(event){
    let APICallString="https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText+"?api_key="+API_KEY;
    console.log(APICallString)
    axios.get(APICallString)
    .then(function(response){

      setPlayerData(response.data)
      
      
      
    }).catch((error)=> console.log(error))
   }

 

   // this function is another api call which takes in the encripted riot id then from it, 
   //will have the string of the rank and print icon associated with it
   function printIconByRank(riotid){
    let APICallString ="https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"+ riotid +"?api_key="+API_KEY
    axios.get(APICallString).then(function(response){

    
      console.log(response.data)

      let sizeOfData = response.data.length
      let hasMatch = false 
      let setIndex = 0

      for (let i = 0; i< sizeOfData; i++){
       
        let responseData = response.data[i]
        console.log("test",responseData.queueType)
      
       if (responseData.queueType == "RANKED_SOLO_5x5"){
        hasMatch = true;
        setIndex = i
        break;
        
       }else{
        hasMatch = false;
        
       }
      
      
      console.log(hasMatch)
      
      
    }
       
        if (hasMatch){

          let respData = response.data[setIndex]
          
           console.log("tier is " +respData.tier + " "+ respData.rank)
           setPlayerTier( respData.tier )
           
          //  console.log(rankIcons (respData.tier))
          //  return rankIcons (respData.tier)
           return;
          // return response.data.tier + response.data.rank
        } else{
          console.log("unranked")
          setPlayerTier("UNRANKED")
        }


    })
   }
  //  function findMatchId(puuid){
  //   matchQueryService.get(puuid)
  //  }
  
  function findMatchId (puuid){
    let url = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
    let APICallString = url +puuid +"/ids?api_key=" + API_KEY
    

    axios.get(APICallString).then (function(response) {
      
      console.log(response)
      for (let i = 0; i < 3; i++){
        console.log(response.data[i])
        loadMatches(response.data[i])
      }
    })
  }

  function loadMatches (matchId){
    let url = "https://americas.api.riotgames.com/lol/match/v5/matches/"
    let APICallString = url +matchId +"?api_key=" + API_KEY

    axios.get(APICallString).then (function(response) {
      console.log(response)

      
    })

  }

   //helper function for sorting the different rank icons
  //  function rankIcons (rankString){
  //   console.log (rankString)
  //   let image =""

  //   switch (rankString){
  //     case 'IRON':
  //       return "./images/Emblem_Iron.png"
  //     case 'BRONZE':
  //       return "./images/Emblem_Bronze.png"
  //     case 'SILVER':
  //       return "./images/Emblem_Silver.png"
  //     case 'GOLD':
  //       return "./images/Emblem_Gold.png"
  //     case 'PLATINUM':
  //       return "./images/Emblem_Platinum.png"
       
  //     case 'DIAMOND':
  //       image =  IMAGES.diamond
  //       break;
      
  //     case 'MASTER':
  //       return "./images/Emblem_Master.png"
  //     case 'GRANDMASTER':
  //       return "./images/Emblem_Grandmaster.png"  
  //     case 'CHALLENGER':
  //       image = IMAGES.challenger
  //       break;

  //   }

  //   return image
    

  //  }



   // just for enter key press
   const handleKeypress = e => {
    
  if (e.key === "Enter") {
    searchForPlayer(e)
    
  }
};

  //  console.log("player data is" ,playerData)
  //  console.log("player rank is" ,playerRank)

  return (
     
<div className ="container">

    
      
        <TopbarDefault/>
       
       

    

    
       <Sidebar/>
    

    <MiddleDefault/>
   
   
          


</div>

/*     
//     <div className="App">
//       <div class = "sidebar"><Sidebar/></div>

      
      
//        <div className= "container">
//           <h5>League of Legends Player Searcher</h5>
          
//           <input type = "text" onChange={e => setSearchText(e.target.value)} onKeyPress={handleKeypress}>
//             </input>
          
         
//           <button onClick={e => searchForPlayer(e)} >Search For Player</button>
//         </div>

//     {JSON.stringify(playerData) != '{}' ?  */

     
// <>

// <p>{playerData.name}</p>
// <p>{playerData.summonerLevel}</p>
// <p>{findMatchId(playerData.puuid)}</p>

// { printIconByRank (playerData.id)}

// <img width = "100" height="100" src ={"http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/"+ playerData.profileIconId +".png"}></img>

// <img width = "100" height="100" src = {IMAGES[playerTier.toLowerCase()]} alt = "icon"></img>
// <p>{playerTier}</p>
// </>

// :

// <><p>No player Data</p></> }

//     </div>
  )}




export default App;