import { Table } from "antd";
import OrderItemList from "./order_item_list";
// import { formatTime } from "../utils/time";

export default function OrderTable({ orders, pageIndex, pageSize, total, onPageChange}) {
    const isAdmin = (localStorage.getItem("isAdmin") === "true");

    const adminColumns = [
        {title: '下单用户', dataIndex: 'userID', key: 'userID',},
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
            // columns={columns}
            columns={isAdmin ? adminColumns : columns}
            expandable={{
                expandedRowRender: (record) => (
                    <OrderItemList orderItemDTOs={record.orderItemDTOs} />
                ),
            }}
            pagination={{
                current: pageIndex,
                pageSize: pageSize,
                total: total,
                onChange: onPageChange,
            }}
            dataSource={orders.map(order => ({
                ...order,
                key: order.orderID
            }))}
            // dataSource={(orders || []).map(order => ({
            //     ...order,
            //     key: order.orderID
            // }))}
        />
    )
}