export const creatematch = (values) => {
  return fetch('http://127.0.0.1:8000/matches/created',
    {
      method: "POST",
      headers: {
        "accept": 'application/json',
        "Content-Type": "application/json",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dpbiIsInVzZXJuYW1lIjoibHVlbWUiLCJleHAiOjE2NjY2NDUxMzF9.t2gVGcd9Ha-9rEpUZGfFoixbZ99ultxWqupc6w_8jb0"
      },
      body: JSON.stringify(
        {
          "name": values.name,
          "name_robot": values.robot_name,
          "max_players": values.max_players,
          "min_players": values.min_players,
          "rounds": values.rounds,
          "games": values.games,
          "password": values.password
        }
      )
    })
}