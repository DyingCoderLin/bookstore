import { Button, Form, Input, Modal,Table } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage";
import { placeOrder } from "../service/order";
import { handleBaseApiResponse } from "../utils/message";
import { useNavigate } from "react-router-dom";
import "../css/global.css";

const { TextArea } = Input;
export default function PlaceOrderModal({selectBooks, onOk, onCancel,price}) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const handleSubmit = async ({ address, receiver, tel }) => {
        if (!address || !receiver || !tel) {
            messageApi.error("请填写完整信息！");
            return;
        }
        let orderInfo = {
            address,
            receiver,
            tel,
            cartItemIds: selectBooks.map(item => item.cartItemID)
        }
        console.log(orderInfo);
        let res = await placeOrder(orderInfo);
        if(res.code === 401){
            navigate('/login');
            return;
        }
        // console.log("here");
        handleBaseApiResponse(res, messageApi, onOk);
    };

    const columns = [
        {
            title: '书名',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '购买量',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        }
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
                        key: item.cartItemID,
                    }))}
                    pagination={false}
                    bordered={true}
                    style={{ marginBottom: 20}}
                    // className="custom-table"
                />
                <div style={{display: 'flex', justifyContent: 'flex-end', marginRight:20,alignItems: 'center', marginTop: 10}}>
                    <span style={{fontSize: '1.2rem', fontWeight: 'bold', marginRight: 20}}>总价：￥{price}</span>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        下单
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};