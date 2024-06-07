import React, {useEffect} from "react";
import {DatePicker, Card, Button} from "antd";
import AdminStatBookTable from "./admin_stat_book_table";
import {statBooksByDate} from "../service/book";
import {formatDate,isOK} from "../utils/myUtils";
import {useNavigate} from "react-router-dom";

export default function AdminStatBookContent() {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [pageIndex, setPageIndex] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5);
    const [books, setBooks] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const {navigate} = useNavigate();

    const getBooks = async (isFromOne) => {
        let page = pageIndex;
        if (!isFromOne) page = 1;
        let res;
        if(!startDate && !endDate)
            res = await statBooksByDate("1970-01-01", "2100-01-01", page, pageSize);
        else if(!startDate)
            res = await statBooksByDate("1970-01-01", formatDate(endDate), page, pageSize);
        else if(!endDate)
            res = await statBooksByDate(formatDate(startDate), "2100-01-01", page, pageSize);
        else
            res = await statBooksByDate(formatDate(startDate), formatDate(endDate), page, pageSize);
        console.log(res);
        if(res.code === 401){
            navigate('/login');
            return;
        }
        if(isOK(res.code)) {
            let loadBooks = res.data.purchaseDTOs;
            let loadTotal = res.data.total;
            setBooks(loadBooks);
            setTotal(loadTotal);
        }
    }

    useEffect(() => {
        console.log("useEffect");
        getBooks(true);
    }, [pageIndex, pageSize]);

    useEffect(() => {
        setPageIndex(1);
        getBooks(false);
    }, [startDate, endDate]);

    const handlePageChange = (page, size) => {
        console.log("page: " + page + " size: " + size);
        setPageIndex(page);
        setPageSize(size);
    }

    const handleBack = () => {
        window.history.back();
    }

    return (
        <Card id="myCard" className="card-container" style={{ padding: 0, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Button
                type="primary"
                style={{position: 'absolute', left: '40px', top: '50px'}}
                onClick={handleBack} // Navigate back
            >
                返回
            </Button>
            <div style={{
                padding: "0px",
                // margin: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "-40px",
            }}>
                <div style={{textAlign:'center'}}>
                    <h1
                        style={{
                            fontSize: "40px",
                            fontWeight: "bold",
                            color: "black",
                        }}
                    >
                        书籍销售情况
                    </h1>
                    <DatePicker.RangePicker
                        style={{marginTop: "-30px"}}
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
            </div>
            <div style={{margin: "10px", textAlign: "center"}}>
                <AdminStatBookTable
                    books={books}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={handlePageChange}
                />

            </div>
        </Card>
    );
}
