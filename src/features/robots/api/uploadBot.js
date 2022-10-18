// A mock function to mimic making an async request for data
export const uploadBot = async (values, token) => {
  const params = [`name=${encodeURIComponent(values.name)}`]

  let data = new FormData()
  data.append("code", values.code)
  if (values.avatar) {
    data.append("avatar", values.avatar)
  }

  return fetch(`http://127.0.0.1:8000/robots/?${params}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      token: token,
    },
    body: data,
  })
}
