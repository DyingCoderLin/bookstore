import {Users} from "../App";


export async function login(username, password) {
    // const response = await fetch("http://localhost:8080/login", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ username, password })
    // });
    // return await response.json();
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].username === username && Users[i].password === password) {
            // alert("Login successful");
            return true;
        }
    }
    return false;
    // return { status: 401, message: "Login failed" };
}