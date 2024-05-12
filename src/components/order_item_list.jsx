import { List, Avatar } from "antd"

export default function OrderItemList({ orderItemDatas }) {
    console.log(orderItemDatas);
    return <List
        grid={{ gutter: 16, column: 3, xs: 1 }}
        dataSource={orderItemDatas}
        renderItem={(item, _) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar shape="square" size={80} src={item.img} />}
                    title={item.title}
                    description={
                        <div>
                            <div>数量：{item.quantity}</div>
                            <div>价格：￥{item.price}</div>
                        </div>
                    }
                />
            </List.Item>
        )}
    />
}
