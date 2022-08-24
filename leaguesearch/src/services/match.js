import axios from "axios";

const API_KEY=  "RGAPI-c6ef3ac7-151b-4dca-a485-eb46a631d7ff";
let url = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
const get = (puuid) =>{
    
    let APICallString = url +puuid +"/ids"

    axios.get(APICallString).then (response => console.log(response))
}

export default { get };