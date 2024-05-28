import React, { useState,useEffect } from 'react';
import { getAllBooks} from "../service/book";
import AdminBookList from "./admin_book_list";

export default function AdminMainContent() {
    const [books, setBooks] = useState([]);

    const initBooks = async () => {
        let loadBooks = await getAllBooks();
        setBooks(loadBooks);
        console.log("loadBooks",loadBooks);
    }

    useEffect(() => {
        console.log("there is a change in books");
        initBooks();
    }, []);
    //onMutate
    return (
        <AdminBookList books={books} onMutate={initBooks} />
    );
}