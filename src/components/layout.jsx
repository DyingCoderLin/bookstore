import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import Topbar from "./topbar"; // 导入自己编写的 Topbar 组件
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { getMe } from "../service/user";
import { UserContext } from "../lib/context";
import MainContent from "./mainContent";
// import Booklist from "./book_list";
import BookContent from "./bookContent";
import CartContent from "./cartContent";
import UserContent from "./userContent";
import BookCart from "./bookCartContext";

export function BasicLayout({ children }) {
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();
    const HeaderPlaceholder = () => <div style={{ height: '64px' }} />;//空出一块地方作为顶部的空隙，使得顶部可以一直在顶部

    // const checkLogin = async () => {
    //     let me = await getMe();
    //     if (!me) {
    //         navigate("/login");
    //     } else {
    //         setUser(me);
    //     }
    // }

    // useEffect(() => {
    //     checkLogin();
    // }, []);

    return (
        <Layout className="basic-layout" style={{ background: 'transparent' }}>
            <Topbar />
            <HeaderPlaceholder />
            <Layout style={{background:'transparent'}}>
                <Content style={{background:'transparent'}}>
                    <NavBar/>
                    {/*<UserContext.Provider value={user}>{user && children}</UserContext.Provider>*/}
                    <MainContent />
                </Content>
            </Layout>
            {/*<Footer className="footer">*/}
            {/* 底部内容可以放在这里 */}
            {/*</Footer>*/}
        </Layout>
    )
}

export function HomeLayout({ children }) {
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();
    const HeaderPlaceholder = () => <div style={{ height: '64px' }} />;//空出一块地方作为顶部的空隙，使得顶部可以一直在顶部

    // const checkLogin = async () => {
    //     let me = await getMe();
    //     if (!me) {
    //         navigate("/login");
    //     } else {
    //         setUser(me);
    //     }
    // }

    // useEffect(() => {
    //     checkLogin();
    // }, []);

    return (
        <Layout className="basic-layout" style={{ background: 'transparent' }}>
            <Topbar />
            <HeaderPlaceholder />
            <Layout style={{background:'transparent'}}>
                <Content style={{background:'transparent'}}>
                    <NavBar/>
                    {/*<UserContext.Provider value={user}>{user && children}</UserContext.Provider>*/}
                    <MainContent />
                </Content>
            </Layout>
            {/*<Footer className="footer">*/}
                {/* 底部内容可以放在这里 */}
            {/*</Footer>*/}
        </Layout>
    )
}

export function BookLayout({ children }) {
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();
    const HeaderPlaceholder = () => <div style={{ height: '64px' }} />;

    return (
        <Layout className="basic-layout" style={{ background: 'transparent' }}>
            <Topbar />
            <HeaderPlaceholder />
            <Layout style={{background:'transparent'}}>
                <Content style={{background:'transparent'}}>
                    <NavBar/>
                    {/*<UserContext.Provider value={user}>{user && children}</UserContext.Provider>*/}
                    {/*<BookCart>*/}
                        <BookContent />
                    {/*</BookCart>*/}
                </Content>
            </Layout>
        </Layout>
    )
}

export function CartLayout({ children }) {
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();
    const HeaderPlaceholder = () => <div style={{ height: '64px' }} />;

    return (
        <Layout className="basic-layout" style={{ background: 'transparent' }}>
            <Topbar />
            <HeaderPlaceholder />
            <Layout style={{background:'transparent'}}>
                <Content style={{background:'transparent'}}>
                    <NavBar/>
                    {/*<UserContext.Provider value={user}>{user && children}</UserContext.Provider>*/}
                    {/*<BookCart>*/}
                        <CartContent />
                    {/*</BookCart>*/}
                </Content>
            </Layout>
        </Layout>
    )
}

export function UserLayout({ children }) {
    // const [user, setUser] = useState(null);
    // const navigate = useNavigate();
    const HeaderPlaceholder = () => <div style={{ height: '64px' }} />;
    const SidebarPlaceholder = () => <div style={{ width: '200px' }} />; // 添加一个宽度为200px的占位符

    return (
        <Layout className="basic-layout" style={{ background: 'transparent' }}>
            <Topbar />
            <HeaderPlaceholder />
            <Layout style={{background:'transparent'}}>
                <SidebarPlaceholder />
                <Content style={{background:'transparent'}}>
                    <NavBar/>

                    <UserContent />
                </Content>
            </Layout>
        </Layout>
    )
}