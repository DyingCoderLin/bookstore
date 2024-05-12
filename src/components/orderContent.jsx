import { useEffect, useState } from "react";
import { Card } from "antd";
import OrderTable from "../components/order_table";
import { getAllOrders } from "../service/order";

export default function OrderContent() {
    const [orders, setOrders] = useState([]);

    const initOrders = async () => {
        let orders = await getAllOrders();
        setOrders(orders);
    }

    useEffect(() => {
        initOrders();
    }, []);

    return (
        <Card id="myCard" className="card-container" style={{ padding: 2, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <OrderTable orders={orders} />
        </Card>
    )
}