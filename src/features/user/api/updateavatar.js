export const updateavatar = (token, avatar) => {

    const data = new FormData()
      data.append("avatar", avatar)
  
    return fetch(`http://127.0.0.1:8000/users/profile/`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        token: token,
      },
      body: data
    })
  }