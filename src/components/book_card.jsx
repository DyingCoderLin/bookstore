import { Card } from "antd";
import { Link } from "react-router-dom";
import '../css/global.css';

const { Meta } = Card;

export default function BookCard({ book }) {
    console.log("book:",book);
    const title = `书名：${book.title}\n作者：${book.author}\n价格：￥${book.price}`;
    const description = `${book.description}`;
    return (
        <Link to={`/book/${book.bookID}`}>
            <Card
                hoverable
                cover={<img src={book.img} alt={book.title}/>}
                style={{ width: 210, marginBottom:"0px"}}
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

