// A mock function to mimic making an async request for data
export const register = (values) => {
    if (values.username === "username" && values.email === "username@gmail.com") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 201 }), 500 )
      )
    } else if (values.username === "takenUsername" || values.email === "takenemail@gmail.com") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 409 }), 500 )
      )
    } else {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 500 }), 500 )
      )
    }
}