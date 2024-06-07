import React, {useEffect} from "react";
import { DatePicker,Card } from "antd";
import StatBookTable from "./stat_book_table";
import {getPurchaseByDate} from "../service/book";
import {getOrdersByTitleandDate} from "../service/order";
import {formatDate} from "../utils/myUtils";
import {useNavigate} from "react-router-dom";

export default function StatContent() {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [totalBooks, setTotalBooks] = React.useState(0);
    // const [pageIndex, setPageIndex] = React.useState(1);
    // const [pageSize, setPageSize] = React.useState(10);
    const [books, setBooks] = React.useState([]);
    const navigate = useNavigate();
    // const [total, setTotal] = React.useState(0);

    const getBooks = async () => {
        let res;
        if(!startDate && !endDate)
            res = await getPurchaseByDate("1970-01-01", "2100-01-01");
        else if(!startDate)
            res = await getPurchaseByDate("1970-01-01", formatDate(endDate));
        else if(!endDate)
            res = await getPurchaseByDate(formatDate(startDate), "2100-01-01");
        else
            res = await getPurchaseByDate(formatDate(startDate), formatDate(endDate));
        console.log(res);
        if(res.code === 401){
            navigate('/login');
            return;
        }
        let loadBooks = res.data.purchaseDTOs;
        let loadTotal = res.data.totalBooks;
        let loadTotalPrice = res.data.totalPrice;
        setBooks(loadBooks);
        setTotalBooks(loadTotal);
        setTotalPrice(loadTotalPrice);
    }

    useEffect(() => {
        getBooks();
    }, [startDate, endDate]);

    return (
        <Card id="myCard" className="card-container" style={{ padding: 0, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <div style={{
                padding: "0px",
                // margin: "20px",
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
                marginTop: "-60px",
            }}>
                <div style={{textAlign:'center',width:'calc(50% + 300px)'}}>
                    <h1
                        style={{
                            fontSize: "40px",
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        购买情况
                    </h1>
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
                </div>
                <div
                    style={{marginLeft: "-200px", textAlign: "left",}}
                >
                    //左边对齐显示购买总量
                    <h1
                        style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        购买总量：{totalBooks}本
                    </h1>
                    <h1
                    style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "black",
                    }}
                    >
                    消费金额：￥{totalPrice}
                     </h1>
                </div>
            </div>
            <div style={{margin: "0px", textAlign: "center"}}>
                <StatBookTable
                    books={books}
                    // pageIndex={pageIndex}
                    // pageSize={pageSize}
                    // total={total}
                    // onPageChange={handlePageChange}
                />

            </div>
        </Card>
    );
}
