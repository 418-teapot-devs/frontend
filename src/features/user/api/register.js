export const register = (values) => {
  const params = [
    `username=${encodeURIComponent(values.username)}`,
    `email=${encodeURIComponent(values.email)}`,
    `password=${encodeURIComponent(values.password)}`,
  ].join("&")

  const data = new FormData()
  if (values.avatar) {
    data.append("avatar", values.avatar)
  } else {
    data.append("avatar", "")
  }

  return fetch(`http://127.0.0.1:8000/users/?${params}`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: data,
  })
}
