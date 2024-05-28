import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import NavBar from "./navbar";
import Topbar from "./topbar"; // 导入自己编写的 Topbar 组件
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MainContent from "./mainContent";
import BookContent from "./bookContent";
import CartContent from "./cartContent";
import UserContent from "./userContent";
import AdminMainContent from "./adminMainContent";
import OrderContent from "./orderContent";
import AdminUserContent from "./adminUserContent";
import StatContent from "./statContent";

export function BasicLayout({ children }) {
    const HeaderPlaceholder = () => <div style={{ height: '64px' }} />;//空出一块地方作为顶部的空隙，使得顶部可以一直在顶部

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

export function HomeLayout({}) {
    const HeaderPlaceholder = () => <div style={{ height: '64px' }} />;//空出一块地方作为顶部的空隙，使得顶部可以一直在顶部
    const isAdmin = (localStorage.getItem("isAdmin") === "true");

    return (
        <Layout className="basic-layout" style={{ background: 'transparent' }}>
            <Topbar />
            <HeaderPlaceholder />
            <Layout style={{background:'transparent'}}>
                <Content style={{background:'transparent'}}>
                    <NavBar/>
                    {isAdmin ? <AdminMainContent /> : <MainContent />}
                </Content>
            </Layout>
            {/*<Footer className="footer">*/}
                {/* 底部内容可以放在这里 */}
            {/*</Footer>*/}
        </Layout>
    )
}

export function BookDetailLayout({ children }) {

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
    const isAdmin = (localStorage.getItem("isAdmin") === "true");

    return (
        <Layout className="basic-layout" style={{ background: 'transparent' }}>
            <Topbar />
            <HeaderPlaceholder />
            <Layout style={{background:'transparent'}}>
                <SidebarPlaceholder />
                <Content style={{background:'transparent'}}>
                    <NavBar/>
                    {isAdmin ? <AdminUserContent /> : <UserContent />}
                    {/*<UserContent />*/}
                </Content>
            </Layout>
        </Layout>
    )
}

export function OrderLayout({ children }) {
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

                    <OrderContent />
                </Content>
            </Layout>
        </Layout>
    )
}

export function StatLayout({ children }) {
    const HeaderPlaceholder = () => <div style={{ height: '64px' }} />;
    const SidebarPlaceholder = () => <div style={{ width: '200px' }} />; // 添加一个宽度为200px的占位符
    const isAdmin = (localStorage.getItem("isAdmin") === "true");

    return (
        <Layout className="basic-layout" style={{ background: 'transparent' }}>
            <Topbar />
            <HeaderPlaceholder />
            <Layout style={{background:'transparent'}}>
                <SidebarPlaceholder />
                <Content style={{background:'transparent'}}>
                    <NavBar/>

                    <StatContent />
                </Content>
            </Layout>
        </Layout>
    )
}