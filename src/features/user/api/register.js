// A mock function to mimic making an async request for data
export const register = (values) => {
    if (values.username === "username") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 200 }), 500 )
      )
    } else if (values.username === "takenUsername") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              message: "El correo electrónico o el nombre de usuario ya está en uso",
              status: 422,
            }), 500 )
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
  