import React, { useEffect, useState } from 'react';
import { Card, Input, Space } from 'antd';
import '../css/global.css';
import BookList from "./book_list";
import { getBooksByPageandTitle } from "../service/book";

const { Search } = Input;

export default function MainContent() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState(''); // 保存搜索关键字
    const [pageIndex, setPageIndex] = useState(1); // 当前页码
    const [pageSize, setPageSize] = useState(12); // 每页显示数量
    const [total, setTotal] = useState(0); // 总数

    const getBooks = async() => {
        let res = await getBooksByPageandTitle(pageIndex, pageSize, search); // 调用后端 API 获取书籍数据，并设置分页参数
        let loadbooks = res.data.bookDTOs;
        let loadTotal = res.data.size;
        setBooks(loadbooks);
        setTotal(loadTotal);
        console.log("books:",loadbooks);
        console.log("total:",loadTotal);
    }

    useEffect(() => {
        getBooks();
    }, [pageIndex, pageSize, search]);


    const handleSearch = (value) => {
        setSearch(value);
        setPageIndex(1); // 搜索时重置页码为第一页
    }

    const handlePageChange = (page, size) => {
        setPageIndex(page);
        setPageSize(size);
    };

    return (
        <Card id="myCard" className="card-container" style={{ marginLeft: '200px', padding: 2, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Search
                    placeholder="type in the title of the book"
                    allowClear
                    enterButton="Search"
                    size="large"
                    // 我不想让搜索栏除了按钮和输入框有其他背景
                    style={{ background: 'none' }}
                    onSearch={handleSearch}
                />
                <BookList books={books} pageSize={pageSize} total={total} pageIndex={pageIndex} onPageChange={handlePageChange}/>
            </Space>
        </Card>
    );
}
