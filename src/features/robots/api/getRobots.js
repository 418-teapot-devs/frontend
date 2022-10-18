export const getRobots = async (token) => {
  return fetch("http://127.0.0.1:8000/robots", {
    method: "GET",
    headers: {
      accept: "application/json",
      token: token,
    },
  })
}
