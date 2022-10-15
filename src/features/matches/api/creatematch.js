// A mock function to mimic making an async request for data
export const creatematch = (values) => {
  console.log(values)
  if (values.name === "error") {
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
  return new Promise((resolve) =>
    setTimeout(() => resolve({ status: 201 }), 500)
  )
}
