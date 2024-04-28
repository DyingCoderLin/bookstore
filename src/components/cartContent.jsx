import React, { useState,useContext,useEffect } from 'react';
import { BookCartContext } from './bookCartContext';
import { Table, Input, Button, Space, Card } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
// import {cartData} from "../App";
import { getCartItems } from '../service/cart';
const { Column,ColumnGroup } = Table;
const { Search } = Input;
export default function CartContent() {
    const { myBookCart,removeFromCart,addToCart } =  useContext(BookCartContext); // 使用 useContext 获取 BookCartContext 上下文中的购物车数据
    const [data, setData] = useState(myBookCart);
    // const [data, setData] = useState([]);

    // const initCartItems = async () => {
    //     let data = await getCartItems();
    //     setData(data);
    // }

    // useEffect(() => {
    //     initCartItems();
    // }, []);
    const handleSearch = (value) => {
        // 如果搜索内容为空，则显示所有书籍
        if (!value.trim()) {
            setData(myBookCart);
            return;
        }
        // 使用 filter 方法筛选标题包含搜索内容的书籍
        const filteredData = myBookCart.filter(item => item.title.includes(value));
        setData(filteredData);
    };
    // alert("加载购物车");
    // myBookCart.forEach(item => {
    //     alert("加载购物车中的书籍");
    //     alert(`书籍标题：${item.title}\n作者：${item.author}\n价格：${item.price}`);
    // });
    //const [data,setData] = useState(myBookCart);
    //const [searchText, setSearchText] = useState('');
    // useEffect(() => {
    //     myBookCart.forEach(item => {
    //         alert("来报警了");
    //         alert(`书籍标题：${item.title}\n作者：${item.author}\n价格：${item.price}`);
    //     });
    //     setData(myBookCart);
    // }, [myBookCart]);

    // const handleSearch = (selectedKeys, confirm) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    // };

    // const handleReset = (clearFilters) => {
    //     clearFilters();
    //     setSearchText('');
    // };

    const handleDelete = (itemId) => {
        // 在这里处理删除购物车商品的逻辑
        console.log(`删除书籍ID为${itemId}的商品`);
        removeFromCart(itemId);
    };

    useEffect(() => {
        setData(myBookCart);
    } , [myBookCart]);

    return (
        <Card id="myCard" className="card-container" style={{ marginLeft: '200px', padding: 2, backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div>
                    <Search
                        placeholder="搜索购物车中的书籍"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        style={{ background: 'none', marginBottom: '20px' }}
                        // onSearch={onSearch}
                        id="search-input"
                        onSearch={handleSearch}
                    />
                    <Table dataSource={data} rowKey="id" bordered={true} >
                    <ColumnGroup title="书籍">
                        <Column
                            title="封面"
                            dataIndex="img"
                            key="img"
                            align={'center'}
                            render={(cover) => <img src={cover} alt="Book cover" style={{ width: 50 }} />}
                        />
                        <Column title="标题" align={'center'} dataIndex='title' key="title" />
                    </ColumnGroup>
                        <Column title="购买量" align={'center'} dataIndex="quantity" key="quantity" />
                        <Column title="价格" align={'center'} dataIndex="price" key="price" />
                        <Column
                            title="操作"
                            dataIndex="action"
                            align={'center'}
                            key="action"
                            render={(_, record) => (
                                <Button
                                    type="link"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(record.id)}
                                >
                                    删除
                                </Button>
                            )}
                        />
                </Table>
                </div>
            </Space>
        </Card>
    );
}