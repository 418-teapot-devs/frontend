export const creatematch = (values) => {

  console.log(values)

  return fetch(`http://localhost:8000/matches/created/`,
    {
      method: "POST",
      headers: {
        "accept": 'application/json',
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dpbiIsInVzZXJuYW1lIjoibGFyYWFpbWVyaSIsImV4cCI6MTY2NjYyOTEyN30.fAQmfzLNEhVLKIErDs-Gs5u1SMRwlHB7iiHjdYApuWg"
      },
      body: JSON.stringify({
          "name": values.name,
          "max_players": values.max_players,
          "min_players": values.min_players,
          "rounds": values.rounds,
          "games": values.games,
          "password": values.password,
          "robot_name": values.robot
      })
    })
}
