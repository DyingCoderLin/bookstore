import React from "react";

import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import useMessage from "antd/es/message/useMessage";
import { Link, useNavigate } from "react-router-dom";
import '../css/global.css';
import '../css/LoginForm.css';
import { login } from "../service/login";
// import { BasicLayout } from "../components/layout";
import { handleBaseApiResponse } from "../utils/message";

const LoginPage = () => {
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const response = await login(username, password);
        console.log(response);
        // localStorage.setItem("isAdmin", response.data.isAdmin);
        // handleBaseApiResponse(response, messageApi, () => navigate("/home"));
        //onSuccess的时候还要进行setItem
        handleBaseApiResponse(response, messageApi, () => {
            localStorage.setItem("isAdmin", response.data.isAdmin);
            navigate("/home");
        });
    };

    const toRegister = (event) => {
        event.preventDefault();
        navigate("/register");
    }

    return (
                <div className="login-container">
                    {contextHolder}
                    <div className="login-box">
                        <h2>Login</h2>
                        <form action="Browser.html" method="get" id="login-form">
                            <div className="input-group">
                                <label htmlFor="username" className="name">Username:</label>
                                <input type="text" id="username" name="username" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password" className="name">Password:</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                            <div>
                                <input type="checkbox" id="remember-me" name="remember-me" style={{ transform: 'scale(1.5)', float: 'left', marginLeft: '40px', marginTop: '10px' }} />
                                <label htmlFor="remember-me" style={{ float: 'left', marginTop: '7px', marginLeft: '7px', fontSize: '18px', fontFamily: 'Arial, sans-serif' }}>Remember me</label>
                                {/*<a href="http://baidu.com" style={{ float: 'left', fontSize: '18px', fontFamily: 'Arial, sans-serif', marginLeft: '130px', textDecoration: 'none', color: 'rgb(0,0,0)', marginTop: '7px' }}>Forgot password?</a>*/}
                            </div>
                            <button className="button" id="loginButton" type="submit" onClick={onSubmit}>
                                Log in
                            </button>
                            <div>
                                <a onClick={toRegister} style={{ float: 'left', fontSize: '18px', fontFamily: 'Arial, sans-serif', marginLeft: '40px', textDecoration: 'none', color: 'rgb(0,0,0)', marginTop: '7px' }}>Or register now!</a>
                            </div>
                        </form>
                    </div>
                </div>
);
};
export default LoginPage;