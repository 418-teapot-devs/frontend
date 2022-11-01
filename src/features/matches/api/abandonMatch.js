export const abandonMatch = async (token) => {
    return fetch("http://127.0.0.1:8000/matches/{match_id}/leave/", {
      method: "PUT",
      headers: {
        accept: "application/json",
        token: token,
      },
    })
  }
  