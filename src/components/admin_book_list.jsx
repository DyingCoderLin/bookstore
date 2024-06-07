import React, { useState, useEffect } from "react";
import { Button, Card, Space, Table, Input, message } from "antd";
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { deleteBookByID } from "../service/book";
import '../css/global.css';
import ModifyBookModal from "./modify_book_modal";
import AddBookModel from "./add_book_model";

const { Column } = Table;
const { Search } = Input;

export default function AdminBookList({ books, pageIndex, pageSize, total, onPageChange, onMutate,handleSearch}) {
    const [messageApi, contextHolder] = useMessage();
    const [data, setData] = useState(books);
    const [showModal, setShowModal] = useState(false);
    const [book, setBook] = useState({});
    const [isNew, setIsNew] = useState(false);

    // const handleSearch = (value) => {
    //     if (!value.trim()) {
    //         setData(books);
    //         return;
    //     }
    //     const filteredData = books.filter(item => item.title.includes(value));
    //     setData(filteredData);
    // };

    const handleDelete = async (item) => {
        let res = await deleteBookByID(item.bookID);
        handleBaseApiResponse(res, messageApi, onMutate);
    };

    useEffect(() => {
        setData(books);
    }, [books]);

    const handleModify = (book) => {
        setBook(book);
        setShowModal(true);
        setIsNew(false);
    };

    const columns = [
        {
            title: '修改操作',
            dataIndex: 'action',
            key: 'action',
            width: "10%",
            render: (_, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type="primary"
                        onClick={() => handleModify(record)}
                        size="small"
                        style={{ marginRight: 8 }}
                    >
                        修改
                    </Button>
                </div>
            ),
        },
        {
            title: '封面',
            dataIndex: 'img',
            key: 'img',
            width: "10%",
            render: (img) => (
                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={img} alt="Book cover" style={{ width: 100 }} />
                </div>
            ),
        },
        { title: '书名', dataIndex: 'title', key: 'title' ,width: "10%"},
        { title: '作者', dataIndex: 'author', key: 'author',width: "10%" },
        { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' ,width: "20%"},
        {
            title:"简介",
            dataIndex:"description",
            key:"description",
            width: "10%",
            render: (text) => (
                <div style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {text}
                </div>
            )
        },
        {
            title:"详细介绍",
            dataIndex: "detail",
            key:"detail",
            width: "20%",
            render: (text) => (
                <div style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {text}
                </div>
            )
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>￥{text}</span>,
        },
        { title: '库存量',
            dataIndex: 'inventory',
            key: 'inventory',
            width: "10%",
        },
        {
            title: '删除操作',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
                        删除
                    </Button>
                </div>
            ),
        },
    ];

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSubmit = async () => {
        setShowModal(false);
        onMutate();
    }

    const handleAddBook = () => {
        setBook({});
        setIsNew(true);
        setShowModal(true);
    }

    return (
        <>
            {contextHolder}
            {showModal && !isNew && <ModifyBookModal onCancel={handleCloseModal} book={book} onOk={handleSubmit} />}
            {showModal && isNew && <AddBookModel onCancel={handleCloseModal} onOk={handleSubmit} />}
            <Card
                style={{
                    marginLeft: '200px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    width: 'calc(100% - 200px)',
                    height: 'calc(100vh - 100px)',  // Adjust height to fit the viewport
                    overflowY: 'auto',  // Ensure content is scrollable if it overflows
                }}
            >
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <Space direction="horizontal" size="large" style={{ width: "100%" }}>
                        <Button
                            type="primary"
                            onClick={handleAddBook}
                            size="large"
                            style={{ marginLeft: 8 }}
                        >
                            新建
                        </Button>
                        <Search
                            placeholder="搜索书籍"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            onSearch={handleSearch}
                            style={{ flex: 1, width: "1500px"}}
                        />
                    </Space>
                    <Table
                        dataSource={data}
                        rowKey="id"
                        bordered={true}
                        columns={columns}
                        pagination={{
                            current: pageIndex,
                            pageSize: pageSize,
                            total: total,
                            onChange: onPageChange,
                        }}
                        style={{ flex: 1 }}
                        // scroll={{ y: 'calc(100vh - 260px)' }}  // Ensure table is scrollable within fixed height
                    />
                </Space>
            </Card>
        </>
    );
}
