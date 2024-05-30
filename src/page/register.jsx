import React from "react";


import useMessage from "antd/es/message/useMessage";
import { Link, useNavigate } from "react-router-dom";
import '../css/global.css';
import '../css/LoginForm.css';
import { register } from "../service/login";
import { handleBaseApiResponse } from "../utils/message";
import {checkEmail} from "../utils/myUtils";

const RegisterPage = () => {
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmedPassword = document.getElementById("Confirmedpassword").value;
        const email = document.getElementById("Email").value;
        if (password !== confirmedPassword) {
            messageApi.error("两次输入的密码不一致", 0.8);
            return;
        }
        else if(!checkEmail(email)){
            messageApi.error("邮箱格式不正确", 0.8);
            return;
        }
        else {
            const response = await register(username, password,email);
            console.log(response);
            handleBaseApiResponse(response, messageApi, () => navigate("/login"));
        }
    };

    return (
        <div className="login-container">
            {contextHolder}
            <div className="register-box">
                <h2 style={{marginBottom:"8px", }}>Register</h2>
                <form action="Browser.html" method="get" id="login-form">
                    <div className="input-group" style={{marginBottom: "10px"}}>
                        <label htmlFor="username" className="name">Username:</label>
                        <input type="text" id="username" name="username" required/>
                    </div>
                    <div className="input-group" style={{marginBottom: "10px"}}>
                        <label htmlFor="password" className="name">Password:</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <div className="input-group" style={{marginBottom: "10px"}}>
                        <label htmlFor="confirm password" className="name">Confirm Password:</label>
                        <input type="password" id="Confirmedpassword" name="Comfirmedpassword" required/>
                    </div>
                    <div className="input-group" style={{marginBottom: "10px"}}>
                        <label htmlFor="Email" className="name">Email:</label>
                        <input type="text" id="Email" name="Email" required/>
                    </div>
                    {/*<div>*/}
                    {/*    <input type="checkbox" id="remember-me" name="remember-me" style={{ transform: 'scale(1.5)', float: 'left', marginLeft: '40px', marginTop: '10px' }} />*/}
                    {/*    <label htmlFor="remember-me" style={{ float: 'left', marginTop: '7px', marginLeft: '7px', fontSize: '18px', fontFamily: 'Arial, sans-serif' }}>Remember me</label>*/}
                    {/*    <a href="http://baidu.com" style={{ float: 'left', fontSize: '18px', fontFamily: 'Arial, sans-serif', marginLeft: '130px', textDecoration: 'none', color: 'rgb(0,0,0)', marginTop: '7px' }}>Forgot password?</a>*/}
                    {/*</div>*/}
                    <button className="button" id="registerButton" type="submit" onClick={onSubmit}>
                        Register!
                    </button>
                    {/*<div>*/}
                    {/*    <a href="http://baidu.com" style={{ float: 'left', fontSize: '18px', fontFamily: 'Arial, sans-serif', marginLeft: '40px', textDecoration: 'none', color: 'rgb(0,0,0)', marginTop: '7px' }}>Or register now!</a>*/}
                    {/*</div>*/}
                </form>
            </div>
        </div>
    );
};
export default RegisterPage;