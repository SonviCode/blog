export const addCategory = () => {
    fetch(API_SIGNUP, {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((json) => setMsg(json.message))
        .catch((error: any) => console.log(error));
}