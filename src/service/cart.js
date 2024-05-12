import {DUMMY_RESPONSE, PREFIX, del, getJson, put, post} from "./common";

export async function getAllCartItems() {
    const url = `${PREFIX}/getAllCartItems`;//设置url
    // alert(url);
    // console.log(document.cookie,"finish");
    let cartItems;
    try {
        //向后端发起请求获得cart内容
        cartItems = await getJson(url);
        console.log("normal", cartItems);
    } catch (e) {
        console.log("getCartItems error", e);
        cartItems = []
    }
    // alert(cartItems);
    return cartItems;
}

export async function addCartItem(bookId) {
    const url = `${PREFIX}/addCartItem/${bookId}`;
    console.log(url);
    let response;
    try {
        response = await getJson(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response;
}

export async function deleteCartItem(cartItemId) {
    const url = `${PREFIX}/deleteCartItem/${cartItemId}`;
    let res;
    try {
        res = await getJson(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function changeCartItemNumber(cartItemID, number) {
    const url = `${PREFIX}/changeCartItemNumber`;
    //将responsebody设为要更改的数量
    let response;
    try {
        response = await post(url,{cartItemID,number});
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response;
}