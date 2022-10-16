// A mock function to mimic making an async request for data
export const uploadBot = (values) => {
    if (values.name === "robot") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 201 }), 500 )
      )
    } else if (values.name === "takenName") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ status: 409 }), 500 )
      )
    }
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({ status: 400, }), 500 )
    )
  }