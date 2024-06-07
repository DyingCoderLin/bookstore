import {post,PREFIX} from "./common";

export async function login(username, password) {
    const url = `${PREFIX}/login`;
    let result;
    try {
        result = await post(url, { username, password });
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    console.log(result);
    return result;
    // return { status: 401, message: "Login failed" };
}

export async function logout() {
    const url = `${PREFIX}/logout`;
    let result;
    try {
        result = await post(url, {});
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
}

export async function register(username, password,email) {
    const url = `${PREFIX}/register`;
    let result;
    try {
        result = await post(url, { username, password,email });
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
    // return { status: 401, message: "Register failed" };
}