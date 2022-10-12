// A mock function to mimic making an async request for data
export const login = (username, password) => {
  return fetch("http://127.0.0.1:8000/users/login", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
}
