import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import axios from 'axios';
import ReactDOM from 'react-dom/client';


function App() {
  const [searchText, setSearchText] = useState ("");
  const [playerData, setPlayerData] = useState ({});
  const [playerRank, setPlayerRank] = useState ("");
  const API_KEY=  "RGAPI-1eeda3c6-da03-48ce-a357-889abc6bd632";
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

   //function to print the stuff from data given
   function printFromData(){
    console.log("Agfasdfasdf" , playerData)
     return JSON.stringify(playerData) != '{}' ? 

     
         <>
        
        <p>{playerData.name}</p>
        <p>{playerData.summonerLevel}</p>
        <img width = "100" height="100" src ={"http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/"+ playerData.profileIconId +".png"}></img>
        <img width = "100" height="100" src = {'"'+ printIconByRank (playerData.id)+ '"'} alt = "icon"></img>
        {/* <img width = "100" height="100" src = "images/Emblem_Challenger.png" alt = "icon"></img> */}
        {/* <p>{playerRank}</p> */}
        </>
       
        :

        <><p>No player Data</p></> 
        
         
   }

   // this function is another api call which takes in the encripted riot id then from it, 
   //will have the string of the rank and print icon associated with it
   function printIconByRank(riotid){
    let APICallString ="https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"+ riotid +"?api_key="+API_KEY
    axios.get(APICallString).then(function(response){

     console.log("repopnsecheck", response)
      console.log(response.data)

      let sizeOfData = response.data.length
      let hasMatch = false 

      // for (let i = 0; i< sizeOfData; i++){
      //   console.log("before" , i)
      //   console.log(hasMatch)
      //   let responseData = response.data[i]
      //   console.log("test",responseData.queueType)
      
      //  if (responseData.queueType == "RANKED_SOLO_5x5"){
      //   hasMatch = true;
        
        
      //  }else{
      //   hasMatch = false;
        
      //  }
      //  console.log("after" , i)
      //  console.log(hasMatch)
      // }
      
      
      //  console.log ("test" + hasMatch)
       
      //   if (hasMatch){
          
      //      console.log("tier is " +responseData.tier + " "+ responseData.rank)
      //      setPlayerRank( responseData.tier + " " + responseData.rank)
      //      console.log(rankIcons (responseData.tier))
      //      return rankIcons (responseData.tier)
           
      //     // return response.data.tier + response.data.rank
      //   } else{
      //     setPlayerRank("UNRANKED")
      //   }


//this was my old if statement simplified but a little buggy i think just need that 1 more step
        // for (let i = 0; i< sizeOfData; i++){
        //   let responseData = response.data[i]
        //   console.log(responseData.queueType)
  
        //  if (responseData.queueType == "RANKED_SOLO_5x5"){
        //   console.log("tier is " +responseData.tier + " "+ responseData.rank)
        //   setPlayerRank( responseData.tier + " " + responseData.rank)
        //   return rankIcons (responseData.tier)
         
          
        //  }else{
          
        //   console.log("unranked")
        //  }
        
      
      
      

    })
   }
  

   //helper function for sorting the different rank icons
   function rankIcons (rankString){
    console.log (rankString)

    switch (rankString){
      case 'IRON':
        return "images/Emblem_Iron.png"
      case 'BRONZE':
        return "images/Emblem_Bronze.png"
      case 'SILVER':
        return "images/Emblem_Silver.png"
      case 'GOLD':
        return "images/Emblem_Gold.png"
      case 'PLATINUM':
        return "images/Emblem_Platinum.png"
      
      case 'DIAMOND':
        return "images/Emblem_Diamond.png"
      
      case 'MASTER':
        return "images/Emblem_Master.png"
      case 'GRANDMASTER':
        return "images/Emblem_Grandmaster.png"  
      case 'CHALLENGER':
        return "images/Emblem_Challenger.png" 

    }

    
    

   }



   // just for enter key press
   const handleKeypress = e => {
    
  if (e.key === "Enter") {
    searchForPlayer(e)
    
  }
};

  //  console.log("player data is" ,playerData)
  //  console.log("player rank is" ,playerRank)

  return (
    <div className="App">
      
       <div className= "container">
          <h5>League of Legends Player Searcher</h5>
          <input type = "text" onChange={e => setSearchText(e.target.value)}onKeyPress={handleKeypress}></input>
          <button onClick={e => searchForPlayer(e)} >Search For Player</button>
        </div>

    {JSON.stringify(playerData) != '{}' ? 

     
<>

<p>{playerData.name}</p>
<p>{playerData.summonerLevel}</p>
{printIconByRank (playerData.id)}
<img width = "100" height="100" src ={"http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/"+ playerData.profileIconId +".png"}></img>
{/* <img width = "100" height="100" src = {'"'+ printIconByRank (playerData.id)+ '"'} alt = "icon"></img> */}
{/* <img width = "100" height="100" src = "images/Emblem_Challenger.png" alt = "icon"></img> */}
{/* <p>{playerRank}</p> */}
</>

:

<><p>No player Data</p></> }

    </div>
  )}




export default App;
