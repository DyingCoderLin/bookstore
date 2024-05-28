import React, { useState, useEffect } from 'react';
import { List, Pagination, Card } from 'antd';
import BookCard from './book_card';
// import '../css/booklist.css'; // 导入书籍列表样式文件

export default function BookList({ books, pageSize, total, pageIndex, onPageChange }) {
    const [data, setData] = useState(books);

    useEffect(() => {
        setData(books);
    }, [books]);

    return (
        <div>
            <List
                bordered={true}
                split={true}
                dataSource={books}
                grid={{
                    gutter: { row: 8, column: 8 }, // 调整间距
                    column: 6
                }}
                renderItem={(book) => (
                    <List.Item style={{ marginBottom: '20px' }}> {/* 调整每个 BookCard 的间距 */}
                        <BookCard book={book} />
                    </List.Item>
                )}
            />
            <Pagination
                current={pageIndex}
                pageSize={pageSize}
                total={total}
                onChange={onPageChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />
        </div>
    );
}
