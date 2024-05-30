import { Layout, Menu, Button, Modal } from "antd";
import useMessage from "antd/es/message/useMessage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import { useState } from "react";
import '../css/global.css';
import { logout } from "../service/login";
import { isOK } from "../utils/myUtils";
import { handleBaseApiResponse } from "../utils/message";

const { Sider } = Layout;

export default function Sidebar() {
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();
    const location = useLocation();
    const parts = location.pathname.split('/');
    let selectedKey;
    if(parts[parts.length - 1] === "statuser" || parts[parts.length - 1] === "statbook")
    {
        selectedKey = "/stat";
    }
    else selectedKey = '/' + parts[parts.length - 1];
    const isAdmin = (localStorage.getItem("isAdmin") === "true");
    const navItems = [
        { label: "首页", value: "/home", className: "nav-text" },
        { label: "购物车", value: "/cart", className: "nav-text" },
        { label: "订单", value: "/order", className: "nav-text" },
        { label: "统计", value: "/stat", className: "nav-text" },
        { label: "用户", value: "/user", className: "nav-text" },
    ];

    const adminNavItems = [
        { label: "书籍管理", value: "/home", className: "nav-text" },
        { label: "订单管理", value: "/order", className: "nav-text" },
        { label: "销售统计", value: "/stat", className: "nav-text" },
        { label: "用户管理", value: "/user", className: "nav-text" },
    ];

    const navMenuItems = (isAdmin ? adminNavItems : navItems).map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }));

    const handleMenuClick = async (e) => {
        if (e.key.startsWith("/")) {
            navigate(e.key);
        }
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSuccess = () => {
        console.log("登出成功");
        setIsModalVisible(false);
        localStorage.removeItem('isAdmin');
        navigate('/login');
    }

    const handleOk = async () => {
        let res = await logout();
        console.log(res);
        // 如果登出成功，则
        if(isOK(res.code)){
            console.log("登出成功");
            handleSuccess();
        }
        else{
            console.log("登出失败");
            handleCancel();
        }
    };

    const handleCancel = () => {
        console.log('没有登出');
        setIsModalVisible(false);
    };

    return (
        <Sider
            width={200}
            style={{
                height: '100vh',
                position: 'fixed',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Menu
                theme={'dark'}
                mode="inline"
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
                style={{ flex: 1, borderRight: 0 }}
                onClick={handleMenuClick}
                items={navMenuItems}
            />
            <div style={{ position: 'absolute', marginTop: '600px', width: '100%', textAlign: 'center' }}>
                <Button type="primary" icon={<LogoutOutlined />} onClick={showModal}>
                    登出
                </Button>
                <Modal
                    title="确认登出"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <p>是否登出？</p>
                </Modal>
            </div>
        </Sider>
    );
}