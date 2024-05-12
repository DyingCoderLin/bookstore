import React, {useState,useEffect} from "react";
import {Button, Card, Space, Table,Input,Checkbox,message} from "antd";
// import { BookCartContext } from './bookCartContext';
import { SearchOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
// import {cartData} from "../App";
import PlaceOrderModal from "./place_order_modal";
import useMessage from "antd/es/message/useMessage";
import {changeCartItemNumber, deleteCartItem} from "../service/cart";
import {handleBaseApiResponse} from "../utils/message";
import {isOK} from "../utils/myUtils";

const { Column,ColumnGroup } = Table;
const { Search } = Input;

export default function Cart_item_table({cartItems,onMutate}) {
    const [messageApi,contextHolder] = useMessage();
    const [data, setData] = useState(cartItems);//用于处理要显示哪些信息
    const [selectCartItems,setSelectCartItems] = useState([]);//用于处理哪些书籍被选中
    const [showModal, setShowModal] = useState(false);

    // 用于处理搜索功能，只显示title里有被搜索的部分的书籍
    const handleSearch = (value) => {
        // 如果搜索内容为空，则显示所有书籍
        if (!value.trim()) {
            setData(cartItems);
            return;
        }
        // 使用 filter 方法筛选标题包含搜索内容的书籍
        const filteredData = cartItems.filter(item => item.title.includes(value));
        setData(filteredData);
    };

    const handleDelete = async (itemId) => {
        console.log(itemId);
        // 使用 deleteCartItem 函数删除购物车商品，并获取响应
        let res = await deleteCartItem(itemId);
        // 使用 handleBaseApiResponse 函数处理响应，并传入相应的消息 API 和 onMutate 函数
        // 在这里处理删除购物车商品的逻辑
        // console.log(`删除书籍ID为${itemId}的商品`);
        // 如果删除成功，选中的商品列表也需要被更新
        handleBaseApiResponse(res,messageApi,onMutate);
    };

    // 当 cartItems 发生变化时，更新 data 状态为新的cartItems
    useEffect(() => {
        setData(cartItems);
    } , [cartItems]);

    const handleOpenModal = () => {
        if(selectCartItems.length === 0) {
            alert("请先选择要购买的书籍");
            return;
        }
        console.log(selectCartItems.length);
            setShowModal(true);
    }

    const handleOrderSubmit = () => {
        console.log("order submit");

        // 在消息通知中显示订单提交成功，并包含倒计时信息
        message.success({
            content: `订单提交成功！`,
            duration: 2, // 持续时间为 3 秒
            onClose: () => {
                // 关闭弹窗并执行 onMutate 函数
                setShowModal(false);
                onMutate();
            },
        });
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    //在选中了一系列书籍并提交订单时，计算总价格
    const computeTotalPrice = () => {
        let totalPrice = 0;
        for (let book of selectCartItems) {
            totalPrice += book.price * book.quantity;
        }
        return totalPrice;
    }

    const handleQuantityChange = async (book, mode) => {
        console.log(book.cartItemID);
        let res;
        if(mode){
            console.log("add");
            res = await changeCartItemNumber(book.cartItemID,book.quantity + 1);
        }
        else{
            console.log("minus");
            res = await changeCartItemNumber(book.cartItemID,book.quantity - 1);
        }
        if(isOK(res.code)){
            onMutate();
        }
        // handleBaseApiResponse(res,messageApi,onMutate);
            // const existingBookIndex = data.findIndex(item => item.id === book.id);
            // if (existingBookIndex !== -1) {
            //     const updatedCart = [...data];
            //     if(mode)
            //     data[existingBookIndex].quantity += 1;
            //     else data[existingBookIndex].quantity = Math.max(0,data[existingBookIndex].quantity - 1);
            //     setData(updatedCart);
            // } else {
            //     // 如果购物车中不存在相同的书籍，添加新的书籍到购物车
            //     alert("a fatal fault, missing book");
            // }
    };

    const handleCheckboxChange = (record, checked) => {
        if (checked) {
            setSelectCartItems([...selectCartItems, record]);
        } else {
            setSelectCartItems(selectCartItems.filter(item => item.cartItemID !== record.cartItemID));
        }
    };

    return <>
        {contextHolder}
        {showModal && <PlaceOrderModal onCancel={handleCloseModal} selectBooks={selectCartItems} onOk={handleOrderSubmit} />}
        <Card id="myCard" className="card-container"
              style={{marginLeft: '200px', padding: 2, backgroundColor: 'rgba(255,255,255,0.4)'}}>
            <Space direction="vertical" size="large" style={{width: "100%"}}>
                <div>
                    <Search
                        placeholder="搜索购物车中的书籍"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        style={{background: 'none', marginBottom: '20px'}}
                        id="search-input"
                        onSearch={handleSearch}
                    />
                    <Table dataSource={data} rowKey="id" bordered={true} pagination={{pageSize: 5}}>
                        <ColumnGroup title="书籍">q
                            <Column
                                title="选择"
                                dataIndex="selected"
                                key="selected"
                                align={'center'}
                                render={(_, record) => (
                                    <Checkbox
                                        style={{width: '20px', height: '20px', border: '2px solid #000000'}}
                                        checked={selectCartItems.some(item => item.cartItemID === record.cartItemID)}
                                        onChange={e => handleCheckboxChange(record, e.target.checked)}
                                    />
                                )}
                            />
                            <Column
                                title="封面"
                                dataIndex="img"
                                key="img"
                                align={'center'}
                                render={(img) => <img src={img} alt="Book cover" style={{width: 100}}/>}
                            />
                            <Column
                                title="标题"
                                align={'center'}
                                dataIndex='title'
                                key="title"
                                render={(text) => <span style={{fontSize: '1.2rem'}}>{text}</span>}
                            />
                        </ColumnGroup>

                        <Column
                            title="价格"
                            align={'center'}
                            dataIndex="price"
                            key="price"
                            render={(text) => <span style={{fontSize: '1.2rem'}}>￥{text}</span>}
                        />
                        <Column
                            title="购买量"
                            align={'center'}
                            dataIndex="quantity"
                            key="quantity"
                            render={(text, record) => (
                                <Space size="small">
                                    <Button
                                        icon={<MinusOutlined/>}
                                        onClick={() => handleQuantityChange(record, 0)}
                                    />
                                    <span style={{fontSize: '1.2rem'}}>{text}</span>
                                    <Button
                                        icon={<PlusOutlined/>}
                                        onClick={() => handleQuantityChange(record, 1)}
                                    />
                                </Space>
                            )}
                        />
                        <Column
                            title="操作"
                            dataIndex="action"
                            align={'center'}
                            key="action"
                            render={(_, record) => (
                                <Button
                                    type="link"
                                    danger
                                    icon={<DeleteOutlined/>}
                                    onClick={() => handleDelete(record.cartItemID)}
                                    style={{fontSize: '1.2rem'}}
                                >
                                    删除
                                </Button>
                            )}
                        />
                    </Table>
                    <h1 style={{color:"black",float:"left",marginTop:"-15px"}}>总价：{computeTotalPrice()}元</h1>
                    <Button
                        type="primary"
                        onClick={handleOpenModal}
                        size={"large"}
                        style={{marginLeft: '60px', marginTop: '-100px', marginBottom: '20px'}}
                    >立刻下单</Button>
                </div>
            </Space>

        </Card>
    </>;
}