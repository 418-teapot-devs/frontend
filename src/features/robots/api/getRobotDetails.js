export const getRobotDetails = async (robotId, token) => {
  const endpoint = `http://127.0.0.1:8000/robots/${robotId}/`
  return fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
      token: token,
    },
  })
}
