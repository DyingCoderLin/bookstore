import React, { useEffect, useState} from "react";
import { Card, Descriptions, Row, Col, Input, Button, Upload, message } from 'antd';
import { getUser,updateAvatar } from "../service/user";
import useMessage from "antd/es/message/useMessage";
import { UploadOutlined } from '@ant-design/icons';
import ModifyUserModel from "./modify_user_model";
import {handleBaseApiResponse} from "../utils/message";

export default function UserContent() {
    const [messageApi, contextHolder] = useMessage();
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);

    const initialUser = async () => {
        let user = await getUser();
        setUser(user);
    }

    useEffect(() => {
        initialUser();
    }, []);

    const handleSave = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        console.log('close');
        setShowModal(false);
    };

    const handleSubmit = () => {
        console.log('submit');
        setShowModal(false);
        initialUser();
    }

    const handleUpload = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Image = e.target.result;
            // 将base64Image传给后端
            console.log(base64Image);
            let res = await updateAvatar(base64Image);
            handleBaseApiResponse(res, messageApi, initialUser);
        };
        reader.readAsDataURL(file);
        // 返回 false 以阻止 Ant Design 的默认上传行为
        return false;
    };

    const items = [
        { label: '姓名', children: <span>{user.name}</span>, span: 2 },
        { label: '昵称', children: <span>{user.nickname}</span>, span: 2 },
        { label: '余额', children: <span>￥{user.balance}</span>, span: 4 },
        { label: '用户等级', children: <span>{user.userLevel}</span>, span: 2 },
        { label: '邮箱', children: <span>{user.email}</span>, span: { xl: 4, xxl: 4 } },
        {
            label: '头像', span: 2, children: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={user.avatar} style={{ width: '100px', height: '100px' }} />
                    <Upload
                        beforeUpload={handleUpload}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />} style={{ marginTop: '10px', width: '100px' }}>上传头像</Button>
                    </Upload>
                </div>
            )
        },
        { label: '个性化自述', children: <span>{user.selfIntro}</span>, span: { xl: 2, xxl: 2 } },
    ];

    return (
        <>
            {contextHolder}
            {showModal && <ModifyUserModel user={user} onOK={handleSubmit} onCancel={handleClose} />}
            <Card
                id="myCard"
                className="card-container"
                style={{ margin: "auto", marginTop: "20px", marginBottom: "20px", backgroundColor: 'rgba(255,255,255,0.8)', width: '90%' }}
            >
                <Descriptions
                    title={<span style={{ fontSize: '40px', color: '#000000' }}>个人信息</span>}
                    bordered
                    layout={"vertical"}
                    style={{ padding: '10px' }}
                    column={{ xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                    contentStyle={{ fontSize: '22px' }}
                    labelStyle={{ color: '#000000', fontSize: '24px' }}
                    items={items}
                />
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button type="primary" size="large" style={{ marginRight: '100px' }} onClick={handleSave}>编辑</Button>
                </div>
            </Card>
        </>
    );
}
