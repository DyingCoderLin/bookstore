import {DUMMY_RESPONSE, PREFIX, del, getJson, put, post} from "./common";

export async function checkOrder(cartItemInfo) {
    const url = `${PREFIX}/checkOrder`;
    console.log(cartItemInfo);
    let res;
    try {
        res = await post(url, cartItemInfo);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
    return res;
}

export async function getCartItemsByPageAndTitle(page, size, search) {
    const url = `${PREFIX}/getCartItemsByPageAndTitle`;
    let cartItems;
    try {
        cartItems = await post(url,{page,size,search});
    } catch (e) {
        console.log(e);
        cartItems = [];
    }
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