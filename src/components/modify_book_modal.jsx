import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Space, Upload } from 'antd';
import useMessage from 'antd/es/message/useMessage';
import { UploadOutlined } from '@ant-design/icons';
import { updateBook } from '../service/book';
import { handleBaseApiResponse } from '../utils/message';
import { useNavigate } from 'react-router-dom';

const ModifyBookModal = ({ book, onOk, onCancel }) => {
    const [messageApi, contextHolder] = useMessage();
    const [form] = Form.useForm();
    const [bookImage, setBookImage] = useState(book.image || null);
    const { navigate } = useNavigate();

    const handleUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            setBookImage(base64Image);
        };
        reader.readAsDataURL(file);
        return false; // 阻止默认的上传行为
    };

    const handleSubmit = async (values) => {
        const { title, author, isbn, price, inventory,detail,description } = values;
        let res = await updateBook(book.bookID, title, author, isbn, price, inventory, bookImage,detail,description);
        if(res.code === 401){
            navigate('/login');
            return;
        }
        handleBaseApiResponse(res, messageApi, onOk);
    };

    useEffect(() => {
        form.setFieldsValue({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            price: book.price,
            inventory: book.inventory,
            detail: book.detail,
            description: book.description,
        });
        setBookImage(book.img);
    }, [book, form]);

    return (
        <Modal
            title="修改书籍信息"
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
            style={{ textAlign: 'center' }}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' ,marginTop:"10px"}}>
                        {bookImage && <img src={bookImage} alt="书籍图片" style={{ width: '100px', height: '100px', marginRight: '20px' }} />}
                        <Upload
                            beforeUpload={handleUpload}
                            showUploadList={false}
                            accept=".jpg,.png"
                        >
                            <Button icon={<UploadOutlined />} style={{ marginLeft: '20px' }}>上传图片</Button>
                        </Upload>
                    </div>
                </Form.Item>

                <Form.Item
                    label="书名"
                    name="title"
                    rules={[{ required: true, message: '请输入书籍名称!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="作者"
                    name="author"
                    rules={[{ required: true, message: '请输入作者!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="ISBN"
                    name="isbn"
                    rules={[{ required: true, message: '请输入ISBN编号!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="简介"
                    name="description"
                    rules={[{ required: true, message: '请输入简介!' }]}
                >
                    <Input.TextArea
                        rows={1}
                        autoSize={false} // 设置为false以禁用自动调整大小
                    />
                </Form.Item>

                <Form.Item
                    label="详细介绍"
                    name="detail"
                    rules={[{ required: true, message: '请输入详细介绍!' }]}
                >
                    <Input.TextArea
                        rows={2}
                        autoSize={false} // 设置为false以禁用自动调整大小
                    />
                </Form.Item>


                <Form.Item
                    label="价格"
                    name="price"
                    rules={[{ required: true, message: '请输入价格!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="库存"
                    name="inventory"
                    rules={[{ required: true, message: '请输入库存!' }]}
                >
                    <Input />
                </Form.Item>

                <Space>
                    <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
                        提交
                    </Button>
                    <Button type="primary" danger style={{ marginTop: 10 }} onClick={onCancel}>
                        取消
                    </Button>
                </Space>
            </Form>
        </Modal>
    );
};

export default ModifyBookModal;
