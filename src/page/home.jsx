import { Card, Space } from "antd";
import { HomeLayout } from "../components/layout";
import BookList from "../components/book_list";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { searchBooks } from "../service/book";

import { Input } from 'antd';
const { Search } = Input;

export default function HomePage() {
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;
    const isAdmin = (localStorage.getItem("isAdmin") === "true");

    const getBooks = async () => {
        // let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
        // let books = pagedBooks.items;
        // let totalPage = pagedBooks.total;
        // setBooks(books);
        // setTotalPage(totalPage);
    };

    useEffect(() => {
        // console.log("homelog");
        getBooks();
    }, [keyword, pageIndex, pageSize])

    const handleSearch = (keyword) => {
        setSearchParams({
            "keyword": keyword,
            "pageIndex": 0,
            "pageSize": 10
        });
    };

    const handlePageChange = (page) => {
        setSearchParams({ ...searchParams, pageIndex: page - 1 });
    }

    return <HomeLayout>
    </HomeLayout>
}