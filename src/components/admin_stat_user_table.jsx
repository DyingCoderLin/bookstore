import React, { useState, useEffect } from "react";
import { Button, Card, Space, Table, Input, message } from "antd";
import '../css/global.css';

export default function AdminStatBookTable({ books, pageIndex, pageSize, total, onPageChange }) {
    const [data, setData] = useState(books);

    useEffect(() => {
        setData(books);
    }, [books]);

    const columns = [
        {   title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    用户名
                </div>
            ),
            dataIndex: 'userID', key: 'userID',
            render: (text) => <div className="tableFont">
                <span>{text}</span>
            </div>,
        },
        {   title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    邮箱
                </div>
            ),
            dataIndex: 'email', key: 'email',
            render: (text) => <div className="tableFont">
                <span>{text}</span>
            </div>,
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    消费总额
                </div>
            ),
            dataIndex: 'totalCost',
            key: 'totalCost',
            render: (text) => <div className="tableFont">
                <span>￥{text}</span>
            </div>,
        },
        {   title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    总购书量
                </div>
            ),
            dataIndex: 'totalNum', key: 'totalNum',
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
                current: pageIndex,
                pageSize: pageSize,
                total: total,
                onChange: onPageChange,
            }}
            style={{ flex: 1 }}
            // scroll={{ y: 'calc(100vh - 260px)' }}  // Ensure table is scrollable within fixed height
        />
    );
}
