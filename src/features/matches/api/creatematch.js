export const creatematch = (values, token) => {
  return fetch("http://127.0.0.1:8000/matches/created/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      name: values.name,
      name_robot: values.robot_name,
      max_players: values.max_players,
      min_players: values.min_players,
      rounds: values.rounds,
      games: values.games,
      password: values.password,
    }),
  })
}
