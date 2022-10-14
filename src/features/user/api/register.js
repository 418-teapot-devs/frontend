export const register = (values) => {
  const params = [
    `username=${encodeURIComponent(values.username)}`,
    `e_mail=${encodeURIComponent(values.email)}`,
    `password=${encodeURIComponent(values.password)}`
  ].join('&')

  const data = new FormData()
  data.append("avatar", "")

  return fetch(`http://localhost:8000/users/?${params}`,
    {
      method: "POST",
      headers: {
        "accept": 'application/json',
      },
      body: data
    }
  )
}
