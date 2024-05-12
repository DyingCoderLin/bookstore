import { DUMMY_RESPONSE, PREFIX, getJson, post } from "./common";

export async function placeOrder(orderInfo) {
    const url = `${PREFIX}/order`;
    console.log(orderInfo);
    let res;
    try {
        res = await post(url, orderInfo);
        console.log(res.ok);
    } catch (e) {
        console.log(e);
    }
    // console.log("res",res);
    // console.log("res",res.ok);
    return res;
}

export async function getOrders() {
    const url = `${PREFIX}/order`;
    let orders;
    try {
        orders = await getJson(url);
    } catch (e) {
        console.log(e);
        orders = []
    }
    return orders;
}