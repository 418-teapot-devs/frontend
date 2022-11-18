export const startMatch = async (token, match_id) => {

    return fetch(`http://127.0.0.1:8000/matches/${match_id}/start/`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        token: token,
      },
    })
  }
  