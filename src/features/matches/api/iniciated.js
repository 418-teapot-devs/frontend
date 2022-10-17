import { useState } from "react"
import { IniciatedMatches } from "../IniciatedMatches"

export function ListIniciated() {
    function loadListIniciated() {
        fetch("http://127.0.0.1:8000/matches/iniciated", {
             method: "GET",
             headers: {
                 "accept": "application/json",
                 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dpbiIsInVzZXJuYW1lIjoibGVvdG9ycmVzIiwiZXhwIjoxNjY2NTkxNDEyfQ.6b1m3lvRDf6ryVFrocqWuqliZf0NZTiaWhdcGQ7ERxk"
             }
        })
        .then(response => response.json())
        .then(data => setMatches(data))
    }

    const [matches, setMatches] = useState([])
    //useEffect(() => { loadListIniciated() })
    loadListIniciated()

    return <IniciatedMatches matches={matches}/>
}