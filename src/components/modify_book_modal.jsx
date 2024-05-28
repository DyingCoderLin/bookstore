import React from 'react';
import { Button, Form, Input, Modal,Space } from 'antd';
import useMessage from "antd/es/message/useMessage";
import { updateBook } from '../service/book';
import {handleBaseApiResponse} from "../utils/message";
import {useEffect} from "react";

const ModifyBookModal = ({ book, onOk, onCancel }) => {
    const [messageApi, contextHolder] = useMessage();
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const { title, author, isbn, price, inventory } = values;
        console.log("id",book.bookID);
        console.log(title,author,isbn,price,inventory);
        let res = await updateBook(book.bookID, title,author,isbn,price,inventory);
        handleBaseApiResponse(res, messageApi, onOk);
    }

    useEffect(() => {
        form.setFieldsValue({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            price: book.price,
            inventory: book.inventory,
        });
    }, [book, form]); // 当 book 或 form 变化时，设置表单项的默认值

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
                    rules={[{ required:false, message: '请输入书籍名称!' }]}
                >
                    <Input
                        defaultValue={book.title}
                    />
                </Form.Item>

                <Form.Item
                    label="作者"
                    name="author"
                    rules={[{ required: false, message: '请输入作者!' }]}
                >
                    <Input
                        defaultValue={book.author}
                    />
                </Form.Item>

                <Form.Item
                    label="ISBN"
                    name="isbn"
                    rules={[{ required: false, message: '请输入ISBN编号!' }]}
                >
                    <Input
                        defaultValue={book.isbn}
                    />
                </Form.Item>

                <Form.Item
                    label="价格"
                    name="price"
                    rules={[{ required: false, message: '请输入价格!' }]}
                >
                    <Input
                        defaultValue={book.price}
                    />
                </Form.Item>

                <Form.Item
                    label="库存"
                    name="inventory"
                    rules={[{ required: false, message: '请输入库存!' }]}
                >
                    <Input
                        defaultValue={book.inventory}
                    />
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

export default ModifyBookModal;