import React from 'react';
import { Button, Form, Input, Modal,Space } from 'antd';
import useMessage from "antd/es/message/useMessage";
import { updateBook } from '../service/book';
import {handleBaseApiResponse} from "../utils/message";
import {useEffect} from "react";
import {addBook} from "../service/book";

const AddBookModel = ({ onOk, onCancel}) => {
    const [messageApi, contextHolder] = useMessage();
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const { title, author, isbn, price, inventory } = values;
        console.log(title,author,isbn,price,inventory);
        let res = await addBook(title,author,isbn,price,inventory);
        handleBaseApiResponse(res, messageApi, onOk);
    }

    return (
        <Modal
            title= {"修改书籍信息"}
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
            style={{textAlign: 'center'}}
        >
            {contextHolder}
            <Form
                form={form}
                layout={'vertical'}
                // initialValues={{ remember: true }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="书名"
                    name="title"
                    rules={[{ required: true, message: '请输入书籍名称!' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="作者"
                    name="author"
                    rules={[{ required: true, message: '请输入作者!' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="ISBN"
                    name="isbn"
                    rules={[{ required: true, message: '请输入ISBN编号!' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="价格"
                    name="price"
                    rules={[{ required: true, message: '请输入价格!' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="库存"
                    name="inventory"
                    rules={[{ required: true, message: '请输入库存!' }]}
                >
                    <Input/>
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

export default AddBookModel;