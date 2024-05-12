import { Card, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import '../css/global.css';
import BookList from "./book_list";
// import {booksData} from "../App";
import {getAllBooks} from "../service/book";

const { Search } = Input;

export default function MainContent() {
    const [books, setBooks] = useState([]);
    const [booksData, setBooksData] = useState([]); // 保存所有书籍数据

    async function getBooks() {
        let data = await getAllBooks(); // 调用后端 API 获取书籍数据
        let books = data;
        setBooksData(books); // 保存所有书籍数据（不会变化的数据
        // console.log(booksData);
        setBooks(books);
    }

    useEffect(() => {
        // console.log("mainlog");
        getBooks();
    }, []);

    const onSearch = (value) => {
        if (!value) {
            console.log(booksData);
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
