// A mock function to mimic making an async request for data
export const uploadBot = async (values) => {
  const params = [`name=${encodeURIComponent(values.name)}`]

  let data = new FormData()
  data.append('code', values.code)
  if (values.avatar) {
    data.append('avatar', values.avatar)
  }

  return fetch(`http://localhost:8000/robots/?${params}`,
    {
      method: "POST",
      headers: {
        "accept": 'application/json',
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dpbiIsInVzZXJuYW1lIjoic3VzYW5hIiwiZXhwIjoxNjY2NjMwNzEwfQ.zL7TjJVEOYH4drSrgXy8vHj4AvbdCQjaB0HWxRDodAo"
      },
      // TODO: add token validation
      body: data
    }
  )
}

