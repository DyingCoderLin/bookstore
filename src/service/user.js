import {getJson, PREFIX} from "./common";

export async function getUser() {
    const url = `${PREFIX}/getUser`;
    let user;
    try {
        user = await getJson(url);
        console.log(user);
    } catch (e) {
        console.log(e);
        user = []
    }
    return user;
}

export async function getAllUsers() {
    const url = `${PREFIX}/getAllUsers`;
    let users;
    try {
        users = await getJson(url);
        console.log(users);
    } catch (e) {
        console.log(e);
        users = []
    }
    return users;
}

export async function banUser(userID) {
    const url = `${PREFIX}/banUser/${userID}`;
    let result;
    try {
        result = await getJson(url);
        console.log(result);
    } catch (e) {
        console.log(e);
        result = []
    }
    return result;
}

export async function unBanUser(userID) {
    const url = `${PREFIX}/unBanUser/${userID}`;
    let result;
    try {
        result = await getJson(url);
        console.log(result);
    } catch (e) {
        console.log(e);
        result = []
    }
    return result;
}