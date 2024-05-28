import React, { useState, useEffect } from "react";
import { Button, Card, Space, Table, Input, message,Form,Modal,InputNumber} from "antd";
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { isOK } from "../utils/myUtils";
import { deleteBookByID} from "../service/book";
import '../css/global.css';
import ModifyBookModal from "./modify_book_modal";
import AddBookModel from "./add_book_model";

const { Column, ColumnGroup } = Table;
const { Search } = Input;

export default function AdminBookList({ books, onMutate }) {
    const [messageApi, contextHolder] = useMessage();
    const [data, setData] = useState(books); // 用于处理要显示哪些信息
    const [showModal, setShowModal] = useState(false); // 控制模态框显示
    const [book, setBook] = useState({}); // 用于存储当前操作的书籍信息
    const [isNew, setIsNew] = useState(false); // 用于判断是否是新建书籍

    // 用于处理搜索功能，只显示title里有被搜索的部分的书籍
    const handleSearch = (value) => {
        if (!value.trim()) {
            setData(books);
            return;
        }
        const filteredData = books.filter(item => item.title.includes(value));
        setData(filteredData);
    };

    const handleDelete = async (item) => {
        console.log(item.bookID);
        let res = await deleteBookByID(item.bookID);
        handleBaseApiResponse(res, messageApi, onMutate);
    };

    // 当 books 发生变化时，更新 data 状态为新的 books
    useEffect(() => {
        // console.log("change data");
        setData(books);
        // console.log("data", data);
    }, [books]);

    const handleModify = (book) => {
        setBook(book);
        setShowModal(true);
        setIsNew(false);
    };

    const columns = [
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    修改操作
                </div>
            ),
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
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    封面
                </div>
            ),
            headerCellStyle: {
                textAlign: 'center',
            },
            dataIndex: 'img',
            key: 'img',
            width: "10%",
            render: (img) => (
                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={img} alt="Book cover" style={{ width: 100 }} />
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    书名
                </div>
            ),
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    作者
                </div>
            ),
            dataIndex: 'author',
            key: 'author',
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    ISBN
                </div>
            ),
            dataIndex: 'isbn',
            key: 'isbn',
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    价格
                </div>
            ),
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <div className="tableFont">
                    {/*价格前面加个￥*/}
                    <span>￥{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    库存量
                </div>
            ),
            dataIndex: 'inventory',
            key: 'inventory',
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    删除操作
                </div>
            ),
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

    const handleSubmit = async (values) => {
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
            {showModal && !isNew && <ModifyBookModal onCancel={handleCloseModal} book={book} onOk={handleSubmit}/>}
            {showModal && isNew && <AddBookModel onCancel={handleCloseModal} onOk={handleSubmit}/>}
            <Card
                style={{
                    marginLeft: '200px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    width: 'auto',
                }}
            >
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <Space direction="horizontal" size="large" style={{ width: "100%" }}>
                    <Button
                        type="primary"
                        onClick={handleAddBook}
                        size="large"
                        style={{ marginLeft: 8}}
                    >
                        新建
                    </Button>
                    <Search
                        placeholder="搜索书籍"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        onSearch={handleSearch}
                        style={{ width: 1500 }}
                    />
                    </Space>
                    <Table
                        dataSource={data}
                        rowKey="id"
                        bordered={true}
                        columns={columns}
                        style={{ marginBottom: '-40px',fontSize:'40px'}}
                        pagination={{ pageSize: 5 }}
                    />
                    {/*<Button*/}
                    {/*    type="primary"*/}
                    {/*    onClick={handleModify}*/}
                    {/*    size="large"*/}
                    {/*    style={{ margin: 'auto', marginTop: '-100px',marginLeft:'50%',transform:'translateX(-50%)' }}*/}
                    {/*>*/}
                    {/*    确定更改*/}
                    {/*</Button>*/}
                </Space>
            </Card>
        </>
    );
}