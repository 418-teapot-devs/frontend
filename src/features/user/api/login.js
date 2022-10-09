// A mock function to mimic making an async request for data
export const login = (username, password) => {
  if (username === "username") {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lcmFuIiwiaWF0IjoxNTE2MjM5MDIyfQ.7WITXmWLfys6E9A3W6lRW014Q1uynm5FcoAFSRhavIA",
            profile: {
              username: "John Doeran",
              email: "john.doeran@email.com",
              avatar_url: "url",
            },
            status: 200,
          }),
        500
      )
    )
  } else if (username === "error") {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            message: "El usuario no existe o la contraseña no es válida",
            status: 400,
          }),
        500
      )
    )
  }

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          message: "Error en el servidor, intente más tarde",
          status: 500,
        }),
      500
    )
  )
}
