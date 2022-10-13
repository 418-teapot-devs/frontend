// // A mock function to mimic making an async request for data
  export const register = (values) => {
    const params = [
      `username=${values.username}`,
      `e_mail=${values.email}`,
      `password=${values.password}`
    ].join('&');

    // return fetch('http://127.0.0.1:8000/users/?' + new URLSearchParams({
    return fetch(`http://127.0.0.1:8000/users/?${params}`,
    //({
    //   username: values.username,
    //   email: values.email,
    //   password: values.password
    // }), 
    {
      protocol: 'http:',
      method: "POST",
      headers: { 
        "accept": "application/json", 
        "Content-Type": "multipart/form-data" 
      }
    })
  }