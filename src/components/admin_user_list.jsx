import React, { useState, useEffect } from "react";
import { Button, Card, Space, Table, Input, message} from "antd";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import '../css/global.css';
import {banUser,unBanUser} from "../service/user";

const { Search } = Input;

export default function AdminUserList({ users, pageIndex, pageSize, total, onPageChange, onMutate, handleSearch }) {
    const [messageApi, contextHolder] = useMessage();
    const [data, setData] = useState(users); // 用于处理要显示哪些信息

    useEffect(() => {
        // console.log("change data");
        setData(users);
        // console.log("data", data);
    }, [users]);

    const columns = [
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    权限管理
                </div>
            ),
            dataIndex: 'action',
            key: 'action',
            width: "10%",
            render: (_, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Button
                        className={record.isBanned ? 'button-red' : 'button-green'}
                        type="primary"
                        onClick={() => handleBan(record)}
                        size="small"
                        style={{ marginRight: 8 }}
                    >
                        {record.isBanned ? '解禁' : '禁用'}
                    </Button>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    用户名
                </div>
            ),
            headerCellStyle: {
                textAlign: 'center',
            },
            dataIndex: 'userID',
            key: 'userID',
            width: "10%",
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    姓名
                </div>
            ),
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    用户邮箱
                </div>
            ),
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    用户地址
                </div>
            ),
            dataIndex: 'defaultAddress',
            key: 'defaultAddress',
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: (
                <div style={{ textAlign: 'center' }} className="headFont">
                    用户等级
                </div>
            ),
            dataIndex: 'userLevel',
            key: 'userLevel',
            render: (text, record) => (
                <div className="tableFont">
                    <span>{text}</span>
                </div>
            ),
        },
    ];

    const handleBan = async (record) => {
        const {userID,isBanned} = record;
        if(isBanned){
            let res = await unBanUser(userID);
            handleBaseApiResponse(res, messageApi,onMutate);
        }
        else{
            let res = await banUser(userID);
            handleBaseApiResponse(res, messageApi,onMutate);
        }
    }

    return (
        <>
            {contextHolder}
            <Card
                style={{
                    // marginLeft: '200px',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    width: 'calc(100%)',
                    height: 'calc(100vh - 100px)',  // 调整高度以适应视口
                    overflowY: 'auto',  // 如果内容溢出，则确保内容可以滚动
                }}
            >
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <Space direction="horizontal" size="large" style={{ width: "100%" }}>
                        <Search
                            placeholder="搜索用户"
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
                    />
                </Space>
            </Card>
        </>
    );
}