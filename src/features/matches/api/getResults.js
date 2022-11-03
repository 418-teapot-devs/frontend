export const getResults = async (token, matchId) => {
    return fetch(`http://localhost:8000/matches/${matchId}/`, {
        method: "GET",
        headers: {
          accept: "application/json",
          token: token},
      })
}