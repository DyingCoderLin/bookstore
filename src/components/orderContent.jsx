import { useEffect, useState } from "react";
import { Card } from "antd";
import OrderTable from "../components/order_table";
import { getAllOrders,adminGetAllOrders } from "../service/order";
import { DatePicker, Input } from "antd";
import {formatDate} from "../utils/myUtils";

const { Search } = Input;

export default function OrderContent() {
    const [orders, setOrders] = useState([]);
    const [displayOrders, setDisplayOrders] = useState([orders]);
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const isAdmin = (localStorage.getItem("isAdmin") === "true");

    const initOrders = async () => {
        let orders;
        if(!isAdmin)
            orders = await getAllOrders();
        else
            orders = await adminGetAllOrders();
        setOrders(orders);
        setDisplayOrders(orders);
    }

    useEffect(() => {
        initOrders();
    }, []);

    useEffect(() => {
        if(!searchText) {
            setDisplayOrders(orders);
            return;
        }
        const filteredOrders = orders.filter(order =>
            order.orderItemDTOs.some(item => item.title.includes(searchText))
        );
        setDisplayOrders(filteredOrders);
    }, [searchText, startDate, endDate]);

    useEffect(() => {
        console.log(orders, searchText, startDate, endDate);
        // 过滤订单，根据搜索文本和日期范围
        if(!searchText && !startDate && !endDate) {
            setOrders(orders);
            return;
        }
        const filteredOrders = orders.filter(order => {
            // 检查订单项中是否有匹配的书名
            const hasMatchingBookTitle = order.orderItemDTOs.some(item =>
                item.title.includes(searchText)
            );

            // 检查订单日期是否在选定的范围内
            if(!startDate && !endDate) {
                return hasMatchingBookTitle;
            }
            if(!startDate) {
                const isWithinDateRange = order.orderDate <= formatDate(endDate);
                return hasMatchingBookTitle && isWithinDateRange;
            }
            if(!endDate) {
                const isWithinDateRange = order.orderDate >= formatDate(startDate);
                return hasMatchingBookTitle && isWithinDateRange;
            }
            // console.log("startDate:", formatDate(startDate), "endDate:", formatDate(endDate), "orderDate:", order.orderDate);
            const isWithinDateRange = order.orderDate >= formatDate(startDate) && order.orderDate <= formatDate(endDate);
            return hasMatchingBookTitle && isWithinDateRange;
        });
        // 更新显示的订单列表
        setDisplayOrders(filteredOrders);
    }, [orders, searchText, startDate, endDate]);

    return (
        <Card id="myCard" className="card-container" style={{ padding: 2, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            // 在OrderContent组件的返回部分
            <Card>
                {/* ...其他代码 */}
                <Search
                    placeholder="搜索订单"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    style={{background: 'none', marginBottom: '20px'}}
                    id="search-input"
                    onSearch={value => setSearchText(value)}
                />
                <DatePicker.RangePicker
                    onChange={([start, end]) => {
                        setStartDate(start);
                        setEndDate(end);
                    }}
                />
            </Card>
            <OrderTable orders={displayOrders} />
        </Card>
    )
}