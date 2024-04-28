import React, { useState } from "react";
import { Card, Descriptions, Row, Col, Input, Button } from 'antd';
import { userData } from "../App";

export default function UserContent() {
    const initialUser = userData[0]; // 初始用户信息
    const [editedUser, setEditedUser] = useState(initialUser); // 使用状态来存储编辑后的用户信息

    // 处理输入框内容变化事件
    const handleInputChange = (key, value) => {
        setEditedUser(prevUser => ({
            ...prevUser,
            [key]: value
        }));
    };

    // 处理保存按钮点击事件
    const handleSave = () => {
        // 这里可以编写保存用户信息的逻辑，例如发送请求到后端保存用户信息等
        console.log("保存的用户信息:", editedUser);
        // 这里仅演示，在实际应用中需要根据具体情况进行处理
        alert("用户信息已保存");
    };

    const handleCancel = () => {
        alert("取消编辑");
    };

    const items = [
        { label: '姓名', children: <Input style={{ fontSize: '22px', background: 'transparent' }} value={editedUser.name} onChange={e => handleInputChange('name', e.target.value)} />, span: 2 },
        { label: '昵称', children: <Input style={{ fontSize: '22px', background: 'transparent' }} value={editedUser.nickName} onChange={e => handleInputChange('nickName', e.target.value)} />, span: 2 },
        { label: '余额', children: <Input style={{ fontSize: '22px', background: 'transparent' }} value={editedUser.balance} onChange={e => handleInputChange('balance', e.target.value)} />, span: 4 },
        { label: '用户等级', children: <Input style={{ fontSize: '22px', background: 'transparent' }} value={editedUser.level} onChange={e => handleInputChange('level', e.target.value)} />, span: 2 },
        { label: '联系方式', children: <Input style={{ fontSize: '22px', background: 'transparent' }} value={editedUser.contact} onChange={e => handleInputChange('contact', e.target.value)} />, span: { xl: 4, xxl: 4 } },
        { label: '头像', span: 2, children: (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={editedUser.avatar} style={{width: '100px', height: '100px'}}/>
                    <Button style={{marginTop: '10px', width: '100px'}} type="primary">上传头像</Button>
                </div>
            )
        },
        { label: '个性化自述', children: <Input.TextArea style={{ fontSize: '22px', background: 'transparent' }} value={editedUser.description} onChange={e => handleInputChange('description', e.target.value)} />, span: {xl: 2, xxl: 2} },
    ];

    return (
        <Card id="myCard" className="card-container"
              style={{margin: "auto", marginTop: "20px",marginBottom:"20px", backgroundColor: 'rgba(255,255,255,0.8)', width: '90%'}}>
            <Descriptions
                title={<span style={{fontSize: '40px', color: '#000000'}}>个人信息</span>}
                bordered
                layout={"vertical"}
                style={{padding: '1q0px'}}
                column={{xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4}}
                contentStyle={{fontSize: '22px'}}
                labelStyle={{color: '#000000', fontSize: '24px'}}
                items={items}
            />
            <div style={{textAlign: 'center', marginTop: '10px'}}>
                <Button type="primary" size="large" style={{marginRight: '100px'}} onClick={handleSave}>保存</Button>
                <Button size="large" onClick={handleCancel}>取消</Button>
            </div>
        </Card>
    );
}



