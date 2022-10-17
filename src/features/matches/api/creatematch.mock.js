// A mock function to mimic making an async request for data
export const creatematch = (values) => {
  if (values.name === "name") {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ status: 201 }), 500)
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
