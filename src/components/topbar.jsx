import React from 'react';
import '../css/global.css';
import { Layout } from 'antd';
import {userData} from "../App";

const { Header } = Layout;

export default function Topbar() {
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
                <img src={userData[0].avatar} className="picInTopbar" alt="头像"
                     width="486"/>
                <label className="editable-label"
                       style={{fontSize: '20px', fontFamily: 'Arial, sans-serif'}}>用户名：{userData[0].nickName}</label>
            </div>
        </Header>
    )
}