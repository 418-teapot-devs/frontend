// A mock function to mimic making an async request for data
export const register = (values) => {
    if (values.username === "username" && values.email === "username@gmail.com") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 200 }), 500 )
      )
    } else if (values.username === "takenUsername" && values.email === "takenemail@gmail.com") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 409, detail: ['E-Mail was taken!', 'Username was taken!'] }), 500 )
      )
    }  else if (values.username === "takenUsername") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 409, detail: ['Username was taken!'] }), 500 )
      )
    }  else if (values.email === "takenemail@gmail.com") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 409, detail: ['E-Mail was taken!'] }), 500 )
      )
    } else {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 500 }), 500 )
      )
    }
}