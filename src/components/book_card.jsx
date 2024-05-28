import { Card } from "antd";
import { Link } from "react-router-dom";
import '../css/global.css';

const { Meta } = Card;

export default function BookCard({ book }) {
    console.log("book:",book);
    const title = `书名：${book.title}\n作者：${book.author}\n价格：￥${book.price}`;
    const description = `这是我最喜欢的书籍!!!计算机系统基础!!!我爱它爱得不能自拔!!!`;
    return (
        <Link to={`/book/${book.bookID}`}>
            <Card
                hoverable
                cover={<img src={book.img} alt={book.title}/>}
                style={{ width: 200, marginBottom:"0px"}}
            >
                <Meta
                    style={{marginTop:"-20px" }}
                    title={<span style={{ fontSize: '16px' }}>{title}</span>}
                    description={<span className="book-card-description">{description}</span>}
                    className="custom-meta"
                />
            </Card>
        </Link>
    );
}

