// // A mock function to mimic making an async request for data
  export const register = (values) => {
    const params = [
      `username=${encodeURIComponent(values.username)}`,
      `e_mail=${encodeURIComponent(values.email)}`,
      `password=${encodeURIComponent(values.password)}`
    ].join('&');

    console.log(params);

    return fetch(`http://localhost:8000/users/?${params}`,
    {
      method: "POST",
      headers: { 
        "accept": 'application/json', 
        "Content-Type": 'multipart/form-data' 
      }
    })
  }