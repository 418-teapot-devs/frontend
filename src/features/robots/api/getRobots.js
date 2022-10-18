export const getRobots = async (token) => {
  return fetch("http://localhost:8000/robots", {
    headers: {
      accept: "application/json",
      token: token,
    },
  })
}
