import { Layout, Menu, Dropdown, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LogoutOutlined,
    UserOutlined,
    AccountBookOutlined,
    FormOutlined
} from '@ant-design/icons';
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { useState } from "react";
import '../css/global.css';

const { Sider } = Layout;
// export default function Sidebar({ user })
export default function Sidebar() {//接受一个名为user的prop
    // const [showModal, setShowModal] = useState(false);
    //使用 useNavigate 钩子获取导航函数 navigate，用于页面间的导航。
    const navigate = useNavigate();
    //使用 useLocation 钩子获取当前页面的路径 location。
    const location = useLocation();
    //将网址路径拆分开来
    const parts = location.pathname.split('/');
    //将路径的最后一部分单独取出作为key
    const selectedKey = '/' + parts[parts.length - 1];
    //定义了侧边栏的菜单项数组 navItems，包括了各个页面的路径名以及对应的标签。
    const navItems = [
        { label: "首页", value: "/home" ,className: "nav-text"},
        { label: "购物车", value: "/cart" ,className: "nav-text"},
        { label: "订单", value: "/order" ,className: "nav-text"},
        { label: "排行", value: "/rank" ,className: "nav-text"},
        { label: "用户", value: "/user",className: "nav-text" },
        // { label: "后端 API 文档", value: "/api-docs" }
    ];
    //使用 map 方法将菜单项数组转换为 Menu.Item 组件数组，同时使用 Link 组件将标签和对应的页面链接进行关联。
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        //Link组件用于在react router中定义导航链接，=item.value表示链接的目标路径是item.value，label为链接的显示文本
        label: <Link to={item.value}>{item.label}</Link>
    }));
    // const [messageApi, contextHolder] = useMessage();

    // const handleOpenModal = () => {
    //     setShowModal(true);
    // }

    // const handleCloseModal = () => {
    //     setShowModal(false);
    // }

    //e中存储了被触发事件的相关信息
    const handleMenuClick = async (e) => {
        // if (e.key === "/logout") {
        //     navigate("/login");
        //     return;
        // }
        // if (e.key === "password") {
        //     handleOpenModal();
        //     return;
        // }
        if (e.key.startsWith("/")) {
            // alert(e.key);
            navigate(e.key);
        }
    };

    // const dropMenuItems = [
    //     {
    //         key: "nickname",
    //         label: user?.nickname,
    //         icon: <UserOutlined />,
    //     },
    //     {
    //         key: "password",
    //         label: "修改密码",
    //         icon: <FormOutlined />,
    //     },
    //     {
    //         key: "balance",
    //         label: `余额：${user?.balance / 100}元`,
    //         icon: <AccountBookOutlined />,
    //     },
    //     { key: "/logout", label: "登出", icon: <LogoutOutlined />, danger: true },
    // ];

    return (
        <Sider
            width={200}
            style={{
                // background: '#000',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
        >
            <Menu
                theme={'dark'}
                mode="inline"
                //确保切换时可以正确高亮显示点击的按钮
                //初始选中的菜单项按钮
                defaultSelectedKeys={[selectedKey]}
                //当前选中的菜单项按钮
                selectedKeys={[selectedKey]}
                style={{ height: '100%', borderRight: 0}}
                onClick={handleMenuClick}
                items={navMenuItems.map(item => ({ key: item.key, label: item.label }))}
            />

            {/*{user && (*/}
            //用户下拉菜单，待实现
            {/*    <Dropdown*/}
            {/*        overlay={*/}
            {/*            <Menu onClick={handleMenuClick}>*/}
            {/*                {dropMenuItems.map(item => (*/}
            {/*                    <Menu.Item key={item.key} danger={item.danger}>*/}
            {/*                        {item.icon} {item.label}*/}
            {/*                    </Menu.Item>*/}
            {/*                ))}*/}
            {/*            </Menu>*/}
            {/*        }*/}
            {/*        placement="bottomRight"*/}
            {/*    >*/}
            {/*        <Button shape="circle" icon={<UserOutlined />} style={{ position: 'absolute', bottom: '20px', left: '20px' }} />*/}
            {/*    </Dropdown>*/}
            {/*)}*/}
        </Sider>
    );
}
