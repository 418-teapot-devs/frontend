export const resetPassword = async (token, password) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/users/reset_password/",
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          new_password: password,
        }),
      }
    )

    switch (response.status) {
      case 200:
        break
      case 401:
        return "El token para recuperar contraseña ha expirado..."
      case 409:
        return "La contraseña ingresada es igual a la anterior"
      case 500:
        return "Error del servidor, intente más tarde"
      default:
        return `Error desconocido, código(${response.status})`
    }
  } catch (err) {
    return `Error desconocido: ${err}`
  }
}
