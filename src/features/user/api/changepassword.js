export const changepassword = (token, values) => {

    return fetch(`http://127.0.0.1:8000/users/password/`, {
        method: "PUT",
        headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: token,
        },
        body: JSON.stringify({
            old_password: values.currentPassword,
            new_password: values.newPassword
        }),
    })
}