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