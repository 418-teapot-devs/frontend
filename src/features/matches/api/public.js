import { useState } from "react"
import { PublicMatches } from "../PublicMatches"

export function ListPublic() {
  function loadListPublic() {
    fetch("http://127.0.0.1:8000/matchs/public", {
      //?????
      method: "GET",
      headers: {
        accept: "application/json",
        // CHANGE TOKEN OR WONT WORK
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dpbiIsInVzZXJuYW1lIjoibG9yYXMyMiIsImV4cCI6MTY2NjU4MzUxMX0.3JgTbi95Gomb_CZyf4eu-X09rp5RU0OdDdXzhuarClY",
      },
    })
      .then((response) => response.json())
      .then((data) => setMatches(data))
  }

  const [matches, setMatches] = useState([])
  //useEffect(() => { loadListCreated() })
  loadListPublic()

  return <PublicMatches matches={matches} />
}
