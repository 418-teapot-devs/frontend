export const recoverEmail = async (email) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/users/recover/?" +
        new URLSearchParams({
          email: email,
        }),
      {
        method: "PUT",
      }
    )

    switch (response.status) {
      case 200:
        break
      case 401:
        return "El email ingresado no existe"
      case 500:
        return "Error del servidor, intente más tarde"
      default:
        return `Error desconocido, código(${response.status})`
    }
  } catch (err) {
    return `Error desconocido: ${err}`
  }
}
