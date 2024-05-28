import React, { useState, useEffect } from 'react';
import {getAllUsers, getUsersByPageAndUserID} from "../service/user"; // 注意引入的用户服务方法

import AdminUserList from "./admin_user_list";

export default function AdminUserContent() {
    const [users, setUsers] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');

    const initUsers = async (page = 1, size = 10) => {
        let res = await getUsersByPageAndUserID(page, size, search); // 使用新的分页和搜索方法
        console.log("data:",res.data);
        let loadUsers = res.data.userDTOs;
        let totalUsers = res.data.size;
        setUsers(loadUsers);
        setTotal(totalUsers);
    }

    useEffect(() => {
        initUsers(pageIndex, pageSize);
    }, [pageIndex, pageSize, search]);

    const handlePageChange = (page, size) => {
        setPageIndex(page);
        setPageSize(size);
    }

    const handleSearch = (value) => {
        setSearch(value);
        setPageIndex(1); // 搜索时重置页码为第一页
        console.log("search:",value);
    };

    return (
        <AdminUserList
            users={users}
            pageIndex={pageIndex}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onMutate={() => initUsers(pageIndex, pageSize)}
            handleSearch={handleSearch}
        />
    );
}
