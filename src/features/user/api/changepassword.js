export const changepassword = async (token, oldPassword, newPassword) => {
    return fetch(`http://127.0.0.1:8000/users/password/`, {
        method: "PUT",
        headers: {
        accept: "application/json",
        token: token,
        },
        body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
        })
    })
}