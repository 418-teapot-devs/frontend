// A mock function to mimic making an async request for data
export const uploadBot = (values) => {
    if (values.name === "robot") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 200 }), 500 )
      )
    } else if (values.name === "takenName") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              message: "Ya cuentas con un robot con ese nombre",
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
  