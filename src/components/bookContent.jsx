import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Image, Typography, Divider, Space, Table } from 'antd';
import '../css/global.css';
import { getBookByID } from "../service/book";
import { useParams } from "react-router-dom";
import { addCartItem } from "../service/cart";
import { handleBaseApiResponse } from "../utils/message";
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from 'react-router-dom';
// 导入BookCartContext

const { Title, Paragraph } = Typography;

export default function BookContent() {
    const [messageApi, contextHolder] = useMessage(); // 使用useMessage获取消息API
    let { id } = useParams(); // 从路由参数中获取id，它是字符串类型
    const [thisBook, setThisBook] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    // const thisBook = getBookById(numericId); // 获取书籍信息

    const getBook = async () => {
        console.log(id);
        let book = await getBookByID(parseInt(id, 10));
        if (book.code === 401) {
            navigate('/login');
            return;
        }
        setThisBook(book);
    }

    useEffect(() => {
        getBook();
    }, [id]);

    // 返回按钮
    const goBack = () => {
        window.history.back();
    };

    // 数据源
    const dataSource = [
        {
            key: '1',
            title: '书名',
            value: thisBook.title
        },
        {
            key: '2',
            title: '作者',
            value: thisBook.author
        },
        {
            key: '3',
            title: 'isbn',
            value: thisBook.isbn
        },
        {
            key: '4',
            title: '价格',
            value: `￥${thisBook.price}`
        },
        {
            key: '5',
            title: '销量',
            value: thisBook.sales
        },
        {
            key: '6',
            title: '库存',
            value: thisBook.inventory
        },
        {
            key: '7',
            title: '状态',
            //如果status为false，显示售罄，否则显示在售
            value: thisBook.status === false ? '售罄' : '在售'
        },
    ];

    // 表格列配置
    const columns = [
        {
            dataIndex: 'title',
            key: 'title',
        },
        {
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const addToCart = async (book) => {
        const res = await addCartItem(book.bookID);
        handleBaseApiResponse(res, messageApi);
    }

    return (
        <Card id="myCard" className="card-container" style={{ marginLeft: '200px', padding: 20, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            {contextHolder}
            {/* 返回按钮 */}
            <Button type="primary" size="large" style={{ marginLeft: '10px', marginTop: '10px', marginBottom: '0px' }} onClick={() => goBack()}>
                返回
            </Button>
            <Row gutter={16}>
                {/* 书籍标题 */}
                <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Title level={1} style={{ margin: '0 auto' }}>书名：{thisBook.title}</Title>
                </Col>
                <Col span={12} style={{ textAlign: 'center' }}>
                    {/* 保留原图片部分 */}
                    <Image
                        src={thisBook.img}
                        height={500}
                        style={{ width: '100%', display: 'block', margin: '0 auto' }}
                        alt="Book cover"
                    />
                    <Space style={{ width: '100%', justifyContent: 'center', marginTop: 40,marginBottom:140 }}>
                        <Button size="large" onClick={() => addToCart(thisBook)}>加入购物车</Button> {/* 在点击事件中调用addToCart函数 */}
                        {/*<Button type="primary" size="large">立即购买</Button>*/}
                    </Space>
                </Col>
                <Col span={12}>
                    {/* 另一半用表格形式显示书籍信息 */}
                    <Table dataSource={dataSource} columns={columns} pagination={false} style={{ margin: '0 auto' }} />
                    <Divider />
                    <div style={{ backgroundColor: '#fcfaf7', padding: '5px', borderRadius: '4px' }}>
                        <Typography>
                            <Title level={4}>书籍简介</Title>
                            <Paragraph>
                                {thisBook.detail}
                            </Paragraph>
                        </Typography>
                    </div>
                    {/*<Space style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>*/}
                    {/*    /!*<Button size="large" onClick={() => addToCart(thisBook)}>加入购物车</Button> /!* 在点击事件中调用addToCart函数 *!/*!/*/}
                    {/*    <Button type="primary" size="large">立即购买</Button>*/}
                    {/*</Space>*/}
                </Col>
            </Row>
        </Card>
    );
}
