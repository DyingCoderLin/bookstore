import {get, getJson, post,PREFIX} from "./common";
export async function getBookByID(bookID) {
    const url = `${PREFIX}/getBookByID/${bookID}`;
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
    return books;
}

export async function getBooksByPageandTitle(page, size,search) {
    const url = `${PREFIX}/getBooksByPageandTitle`;
    let books;
    try {
        books = await post(url, {page, size,search});
        console.log(books);
    } catch (e) {
        console.log(e);
        books = {
            items: []
        }
    }
    return books;
}

//for administartor
export async function updateBook(bookID,title,author,isbn,price,inventory,img) {
    const url = `${PREFIX}/updateBook`;
    let result;
    try {
        result = await post(url, {bookID,title,author,isbn,price,inventory,img});
    } catch (e) {
        console.log(e);
        result = null;
    }
    return result;
}

export async function addBook(title,author,isbn,price,inventory,img) {
    const url = `${PREFIX}/addBook`;
    let result;
    try {
        result = await post(url, {title,author,isbn,price,inventory,img});
    } catch (e) {
        console.log(e);
        result = null;
    }
    return result;

}

export async function deleteBookByID(bookID) {
    const url = `${PREFIX}/deleteBookByID/${bookID}`;
    let result;
    try {
        result = await getJson(url);
    } catch (e) {
        console.log(e);
        result = null;
    }
    console.log("deleteBookByID",result);
    return result;
}