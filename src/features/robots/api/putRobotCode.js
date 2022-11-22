export const putRobotCode = async (code, robotId, token) => {
    return (fetch(`http://127.0.0.1:8000/robots/${robotId}/`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        code: code,
      }),
    })
  )}
  