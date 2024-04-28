import React, {useEffect} from "react";
import {Button, Card, Space, Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

export default function Cart_item_table() {
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