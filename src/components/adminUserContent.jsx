import React, { useState,useEffect } from 'react';
import { getAllUsers} from "../service/user";

import AdminUserList from "./admin_user_list";

export default function AdminUserContent() {
    const [users, setUsers] = useState([]);

    const initUsers = async () => {
        console.log("initUsers");
        let loadUsers = await getAllUsers();
        setUsers(loadUsers);
    }

    useEffect(() => {
        // console.log("there is a change in books");
        initUsers();
    }, []);
    //onMutate
    return (
        <AdminUserList users={users} onMutate={initUsers} />
    );
}