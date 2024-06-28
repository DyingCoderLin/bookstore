import React from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import useMessage from "antd/es/message/useMessage";
import { updateUser } from "../service/user";
import { handleBaseApiResponse } from "../utils/message";
import {checkEmail} from "../utils/myUtils";
import { useNavigate } from 'react-router-dom';

const ModifyUserModel = ({ user, onOK, onCancel }) => {
    const [messageApi, contextHolder] = useMessage();
    const [form] = Form.useForm();
    const { navigate } = useNavigate();

    const handleSubmit = async (values) => {
        const { name, nickname, email, defaultAddress, selfIntro } = values;
        if(email !== undefined && !checkEmail(email)){
            messageApi.error("邮箱格式错误！");
            return;
        }
        console.log(name, nickname, email, defaultAddress, selfIntro);
        let res = await updateUser(name, nickname, email, defaultAddress, selfIntro);
        if(res.code === 401){
            navigate('/login');
            return;
        }
        // 将nickname存入localStorage
        console.log(res);
        await handleBaseApiResponse(res, messageApi, onOK);
    }

    return (
        <Modal
            title={"修改用户信息"}
            open
            // onOk={onOK}
            onCancel={onCancel}
            footer={null}
            width={800}
            style={{ textAlign: 'center' }}
        >
            {contextHolder}
            <Form
                form={form}
                layout={'vertical'}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[{ required: false, message: '请输入姓名!' }]}
                >
                    <Input defaultValue={user.name} />
                </Form.Item>

                <Form.Item
                    label="昵称"
                    name="nickname"
                    rules={[{ required: false, message: '请输入昵称!' }]}
                >
                    <Input defaultValue={user.nickname} />
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ required: false, message: '请输入邮箱!' }]}
                >
                    <Input defaultValue={user.email} />
                </Form.Item>

                <Form.Item
                    label="地址"
                    name="defaultAddress"
                    rules={[{ required: false, message: '请输入地址!' }]}
                >
                    <Input defaultValue={user.defaultAddress} />
                </Form.Item>

                <Form.Item
                    label="自我介绍"
                    name="selfIntro"
                    rules={[{ required: false, message: '请输入自我介绍!' }]}
                >
                    <Input defaultValue={user.selfIntro} />
                </Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
                        提交
                    </Button>
                    <Button type="primary" danger htmlType="reset" style={{ marginTop: 10 }} onClick={onCancel}>
                        取消
                    </Button>
                </Space>
            </Form>
        </Modal>
    );
}

export default ModifyUserModel;
