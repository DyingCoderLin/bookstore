import React from 'react';
import '../css/global.css';
import { Layout,message } from 'antd';
import {useEffect,useState} from "react";
import {getUser} from "../service/user";
import useMessage from "antd/es/message/useMessage";
import {useNavigate} from "react-router-dom";

const { Header } = Layout;

export default function Topbar() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const initialUser = async () => {
        let user = await getUser();
        if( user.code === 401){
            navigate('/login');
        }
        else {
            setUserData(user);
        }
    }

    useEffect(() => {
        initialUser();
    }, []);

    return (
        <Header className="top-bar"  style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
            <div>
                <img src="/myImages/yaoyao.png" className="picInTopbar" alt="店名"
                     width="40px" style={{float: 'left', marginRight: '2px', marginTop: '5px'}}/>
                <label className="center-text"
                       style={{marginLeft: 'auto', marginTop: 'auto', float: 'left', fontSize: '22px'}}>Lin's
                    BookStore
                </label>
            </div>
            <div className="user-info">
                <img src={userData.avatar} className="picInTopbar" alt=""
                     width="486"/>
                <label className="editable-label"
                       style={{fontSize: '20px', fontFamily: 'Arial, sans-serif'}}>用户名：{userData.nickname}</label>
            </div>
        </Header>
    )
}