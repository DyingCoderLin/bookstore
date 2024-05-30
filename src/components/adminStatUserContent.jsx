import React, {useEffect} from "react";
import { DatePicker,Card } from "antd";
import AdminStatUserTable from "./admin_stat_user_table";
import {statUsersByDate} from "../service/user";
import {formatDate,isOK} from "../utils/myUtils";

export default function AdminStatUserContent() {
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [pageIndex, setPageIndex] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [users, setUsers] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    const getUsers = async (isFromOne) => {
        let page = pageIndex;
        if (!isFromOne) page = 1;
        let res;
        if(!startDate && !endDate)
            // eslint-disable-next-line no-undef
            res = await statUsersByDate("1970-01-01", "2100-01-01", page, pageSize);
        else if(!startDate)
            res = await statUsersByDate("1970-01-01", formatDate(endDate), page, pageSize);
        else if(!endDate)
            res = await statUsersByDate(formatDate(startDate), "2100-01-01", page, pageSize);
        else
            res = await statUsersByDate(formatDate(startDate), formatDate(endDate), page, pageSize);
        console.log(res);
        if(isOK(res.code)) {
            let loadUsers = res.data.consDTOs;
            let loadTotal = res.data.size;
            setUsers(loadUsers);
            setTotal(loadTotal);
        }
    }

    useEffect(() => {
        getUsers(true);
    }, [pageIndex, pageSize, startDate, endDate]);

    useEffect(() => {
        setPageIndex(1);
        getUsers(false);
    }, [startDate, endDate]);

    const handlePageChange = (page, size) => {
        console.log("page: " + page + " size: " + size);
        setPageIndex(page);
        setPageSize(size);
    }

    return (
        <Card id="myCard" className="card-container" style={{ padding: 0, backgroundColor: 'rgba(255,255,255,0.4)' }}>
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
                        用户消费榜
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
                <AdminStatUserTable
                    books={users}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={handlePageChange}
                />

            </div>
        </Card>
    );
}
