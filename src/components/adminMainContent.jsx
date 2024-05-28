import React, { useState, useEffect } from 'react';
import {getAllBooks, getBooksByPageandTitle} from "../service/book";
import AdminBookList from "./admin_book_list";

export default function AdminMainContent() {
    const [books, setBooks] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');

    const initBooks = async (page = 1, size = 5) => {
        // console.log(page, size, search);
        let res = await getBooksByPageandTitle(page, size, search);
        console.log(res.data);
        let loadBooks = res.data.bookDTOs;
        let totalBooks = res.data.size;
        // let { books: loadBooks, total: totalBooks } = await getBooksByPage(page, size);
        setBooks(loadBooks);
        setTotal(totalBooks);
    }

    useEffect(() => {
        initBooks(pageIndex, pageSize, search);
    }, [pageIndex, pageSize, search]);

    const handlePageChange = (page, size) => {
        setPageIndex(page);
        setPageSize(size);
    }

    const handleSearch = (value) => {
        console.log("search:", value);
        setSearch(value);
    };

    return (
        <AdminBookList
            books={books}
            pageIndex={pageIndex}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onMutate={() => initBooks(pageIndex, pageSize)}
            handleSearch={handleSearch}
        />
    );
}
