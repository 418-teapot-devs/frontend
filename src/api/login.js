// A mock function to mimic making an async request for data
export const login = async (username, password) => {
  let token, error, profile
  try {
    const response = await fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })

    switch (response.status) {
      case 200:
        const body = await response.json()
        token = body["token"]
        profile = body["profile"]
        break
      case 401:
        error = "El usuario no existe o la contraseña inválida"
        break
      case 500:
        error = "Error del servidor, intente más tarde"
        break
      default:
        error = `Error desconocido, código(${response.status})`
        break
    }
  } catch (err) {
    error = `Error desconocido: ${err}`
  }

  return [token, profile, error]
}
