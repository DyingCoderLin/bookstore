import React, { useState, useEffect } from "react";
import { Button, Card, Space, Table, Input, message } from "antd";
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import '../css/global.css';

export default function StatBookTable({ books }) {
    const [data, setData] = useState(books);

    useEffect(() => {
        setData(books);
    }, [books]);

    const columns = [
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    封面
                </div>
            ),
            dataIndex: 'img',
            key: 'img',
            width: "10%",
            render: (img) => (
                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={img} alt="Book cover" style={{ width: 100 }} />
                </div>
            ),
        },
        {   title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    书名
                </div>
            ),
            dataIndex: 'title', key: 'title',
            render: (text) => <div className="tableFont">
                <span>{text}</span>
            </div>,
        },
        {   title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    作者
                </div>
            ),
            dataIndex: 'author', key: 'author',
            render: (text) => <div className="tableFont">
                <span>{text}</span>
            </div>,
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    总价
                </div>
            ),
            dataIndex: 'price',
            key: 'price',
            render: (text) => <div className="tableFont">
                <span>￥{text}</span>
            </div>,
        },
        {   title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    购买数量
                </div>
            ),
            dataIndex: 'quantity', key: 'quantity',
            render: (text) => <div className="tableFont">
            <span>{text}</span>
         </div>,
        },
    ];

    return (
        <Table
            dataSource={data}
            rowKey="id"
            bordered={true}
            columns={columns}
            pagination={{
                pageSize: 5
            }}
            style={{ flex: 1 }}
            // scroll={{ y: 'calc(100vh - 260px)' }}  // Ensure table is scrollable within fixed height
        />
    );
}
