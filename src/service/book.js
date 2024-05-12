import {get, getJson, PREFIX} from "./common";
export async function getBookById(bookId) {
    const url = `${PREFIX}/getBookById/${bookId}`;
    console.log(url);
    let book;
    try {
        book = await getJson(url);
    } catch (e) {
        console.log(e);
        book = null;
    }
    return book;
}

export async function getAllBooks() {
    //获取后端的所有书籍信息
    const url = `${PREFIX}/getAllBooks`;
    let books;
    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = {
            items: []
        }
    }
    // console.log(result);
    return books;
}