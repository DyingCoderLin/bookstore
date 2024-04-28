import { Card, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import '../css/global.css';
import BookList from "./book_list";
import {booksData} from "../App";
const { Search } = Input;

export default function MainContent() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        setBooks(booksData);
    }, []);
    const onSearch = (value) => {
        if (!value) {
            setBooks(booksData); // 如果搜索内容为空，则显示所有书籍
        } else {
            const filteredBooks = booksData.filter(book => book.title.includes(value)); // 使用 filter 方法过滤书籍列表
            setBooks(filteredBooks); // 设置过滤后的书籍列表
        }
    };
    return (
        <Card id = "myCard" className="card-container" style={{ marginLeft:'200px',padding:2,backgroundColor:'rgba(255,255,255,0.4)'}}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Search
                    placeholder="type in the title of the book"
                    allowClear
                    enterButton="Search"
                    size="large"
                    // 我不想让搜索栏除了按钮和输入框有其他背景
                    style={{ background: 'none' }}
                    onSearch={onSearch}
                />
                <BookList books={books}/>
                {/*<BookList books={books} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />*/}
            </Space>
        </Card>
    );
}
