import React from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/global.css';

const cardStyle = {
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: 'white',
    cursor: 'pointer',
};

const userCardStyle = {
    ...cardStyle,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    fontSize: '32px',
};

const bookCardStyle = {
    ...cardStyle,
    backgroundColor: 'rgba(0, 0, 255, 0.7)',
    fontSize: '32px',
};

export default function StatisticsPage() {
    const navigate = useNavigate();

    const handleUserCardClick = () => {
        navigate('/statuser');
    };

    const handleBookCardClick = () => {
        navigate('/statbook');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Row gutter={16} style={{ width: '80%' }}>
                <Col span={12}>
                    <Card style={userCardStyle} onClick={handleUserCardClick}>
                        用户消费情况统计
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={bookCardStyle} onClick={handleBookCardClick}>
                        书籍销量情况统计
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
