import React, {useState} from 'react';

import {CartLayout} from "../components/layout";
// import CartContent from "../components/cartContent";



export default function CartPage() {


    return (
        <CartLayout>
            {/*<CartContent />*/}
        </CartLayout>
        // <div>
        //     <Search
        //         placeholder="输入图书名称"
        //         allowClear
        //         enterButton="Search"
        //         size="large"
        //         onSearch={onSearch}
        //         style={{marginBottom: '20px'}}
        //     />
        //     <BookInCart onBookSelection={handleBookSelection}/>
        //     <Statistic title="Total Price" value={totalPrice} />
        //     <Row gutter={16} justify="space-evenly">
        //         <Button onClick={handleClearCart} className="custom-clear-cart-button">
        //             清空购物车
        //         </Button>
        //         <Button onClick={handlePlaceOrder} className="custom-clear-cart-button">
        //             现在下单
        //         </Button>
        //     </Row>
        //
        // </div>
    );
}