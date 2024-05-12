import { Table } from "antd";
import OrderItemList from "./order_item_list";
// import { formatTime } from "../utils/time";

export default function OrderTable({ orders }) {
    const columns = [
        {title: '收货人', dataIndex: 'receiver', key: 'receiver',},
        {title: '联系方式', dataIndex: 'tel', key: 'tel',},
        {title: '收货地址', dataIndex: 'address', key: 'address',},
        {
            title: '总价',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => (
                <span>￥{text}</span>
            )
        },
        {title: '下单时间', dataIndex: 'orderDate', key: 'orderDate',},
    ];

    return(
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) => (
                    <OrderItemList orderItemDatas={record.orderItemDatas} />
                ),
            }}
            dataSource={orders.map(order => ({
                ...order,
                key: order.orderID
            }))}
        />
    )
}