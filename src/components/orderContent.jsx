import { useEffect, useState } from "react";
import { Card } from "antd";
import OrderTable from "../components/order_table";
import { getAllOrders,adminGetAllOrders ,getOrdersByTitleandDate,adminGetOrdersByTitleandDate} from "../service/order";
import { DatePicker, Input } from "antd";
import {formatDate} from "../utils/myUtils";

const { Search } = Input;

export default function OrderContent() {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const isAdmin = (localStorage.getItem("isAdmin") === "true");

    const getOrders = async () => {
        let orders;
        if(!isAdmin){
            if(!startDate && !endDate)
                orders = await getOrdersByTitleandDate(searchText,pageIndex,pageSize);
            else if(!startDate)
                orders = await getOrdersByTitleandDate(searchText,pageIndex,pageSize, "1970-01-01", formatDate(endDate));
            else if(!endDate)
                orders = await getOrdersByTitleandDate(searchText,pageIndex,pageSize, formatDate(startDate));
            else
                orders = await getOrdersByTitleandDate(searchText,pageIndex,pageSize, formatDate(startDate), formatDate(endDate));
        }
        else{
            if(!startDate && !endDate)
                orders = await adminGetOrdersByTitleandDate(searchText,pageIndex,pageSize);
            else if(!startDate)
                orders = await adminGetOrdersByTitleandDate(searchText,pageIndex,pageSize, "1970-01-01", formatDate(endDate));
            else if(!endDate)
                orders = await adminGetOrdersByTitleandDate(searchText,pageIndex,pageSize, formatDate(startDate));
            else
                orders = await adminGetOrdersByTitleandDate(searchText,pageIndex,pageSize, formatDate(startDate), formatDate(endDate));
        }
        let loadTotal = orders.data.size;
        let loadOrders = orders.data.orderDTOs;
        setTotal(loadTotal);
        setOrders(loadOrders);
    }

    useEffect(() => {
        getOrders();
    }, [searchText, startDate, endDate, pageIndex, pageSize]);

    const handleSearch =  (value) => {
        setSearchText(value);
        setPageIndex(1);
    };

    const handlePageChange = (page, size) => {
        setPageIndex(page);
        setPageSize(size);
    }

    return (
        <Card id="myCard" className="card-container" style={{ padding: 2, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            // 在OrderContent组件的返回部分
            <Card>
                <Search
                    placeholder="搜索订单"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    style={{background: 'none', marginBottom: '20px'}}
                    id="search-input"
                    onSearch={handleSearch}
                />
                <DatePicker.RangePicker
                    onChange={(dates) => {
                        if (dates) {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        } else {
                            setStartDate(null);
                            setEndDate(null);
                        }
                    }}
                />
            </Card>
            <OrderTable
                orders={orders}
                onPageChange={handlePageChange}
                pageIndex={pageIndex}
                pageSize={pageSize}
                total={total}
            />
        </Card>
    )
}