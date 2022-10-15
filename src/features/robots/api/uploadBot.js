// A mock function to mimic making an async request for data
export const uploadBot = (values) => {
  const params = [`name=${encodeURIComponent(values.name)}`]

  const code = new FormData()
  code.append('code', values.code)

  const avatar = new FormData()
  avatar.append('avatar', values.avatar)

  return fetch(`http://localhost:8000/robots/?${params}`,
    {
      method: "POST",
      headers: {
        "accept": 'application/json',
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dpbiIsInVzZXJuYW1lIjoibGVvdG9ycmVzIiwiZXhwIjoxNjY2NDcxMjI3fQ.tpVb6b7PSVJgSYiYuu8FwOYoBaoiwUEGvKI3h6u-3kQ"
      },
      // TODO: add token validation
      body: {code, avatar}
    }
  )
}

