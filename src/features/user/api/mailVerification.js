export const getVerifiedUser = async (mail_token) => {
  return fetch("http://127.0.0.1:8000/users/verify/", {
    method: "GET",
    headers: {
      accept: "application/json",
      token: mail_token,
    },
  })
}
