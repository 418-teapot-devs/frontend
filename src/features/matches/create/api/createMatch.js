export const createMatch = (values, token) => {
  return (fetch("http://127.0.0.1:8000/matches/", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      name: values.name,
      robot_id: values.robot_id,
      max_players: values.max_players,
      min_players: values.min_players,
      rounds: values.rounds,
      games: values.games,
      password: values.password,
    }),
  })
)}