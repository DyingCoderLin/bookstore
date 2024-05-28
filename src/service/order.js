import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export async function placeOrder(orderInfo) {
    const url = `${PREFIX}/placeOrder`;
    console.log(orderInfo);
    let res;
    try {
        res = await post(url, orderInfo);
        // console.log(res.ok);
    } catch (e) {
        console.log(e);
    }
    // console.log("res",res);
    // console.log("res",res.ok);
    return res;
}

export async function getAllOrders() {
    const url = `${PREFIX}/getAllOrders`;
    let orders;
    try {
        orders = await getJson(url);
        console.log(orders);
    } catch (e) {
        console.log(e);
        orders = []
    }
    return orders;
}

export async function adminGetAllOrders() {
    const url = `${PREFIX}/adminGetAllOrders`;
    let orders;
    try {
        orders = await getJson(url);
        console.log(orders);
    } catch (e) {
        console.log(e);
        orders = []
    }
    return orders;
}