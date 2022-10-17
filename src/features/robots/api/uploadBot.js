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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dpbiIsInVzZXJuYW1lIjoicGF1bGFiZXJjb2ZmZiIsImV4cCI6MTY2NjU3OTAyOH0.UI3fWKQRPG3mEJO-lwvPqIx3PvCcYGq37LX4Htu7vzE"
      },
      // TODO: add token validation
      body: data
    }
  )
}

