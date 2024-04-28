import { Button, Form, Input, Modal,Table } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage";
import { placeOrder } from "../service/order";
import { handleBaseApiResponse } from "../utils/message";

const { TextArea } = Input;
export default function PlaceOrderModal({selectBooks, onOk, onCancel }) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();

    const handleSubmit = async ({ address, receiver, tel }) => {
        if (!address || !receiver || !tel) {
            messageApi.error("请填写完整信息！");
            return;
        }
        let orderInfo = {
            address,
            receiver,
            tel,
            itemIds: selectBooks.map(item => item.id)
        }
        let res = await placeOrder(orderInfo);

        // handleBaseApiResponse(res, messageApi, onOk);
    };

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '购买量',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];

    return (
        <Modal
            title={"确认下单"}
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
            >
                <Form.Item
                    name="receiver"
                    label="收货人"
                    required
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="tel"
                    label="联系电话"
                    required
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="收货地址"
                    required
                >
                    <TextArea rows={2} maxLength={817}/>
                </Form.Item>
                <Table
                    columns={columns}
                    dataSource={selectBooks.map(item => ({
                        ...item,
                        key: item.id,
                    }))}
                    pagination={false}
                />
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{marginTop: 10}}
                    >
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};