import { Card } from "antd";
import { Link } from "react-router-dom";
import '../css/global.css';

const { Meta } = Card;

export default function BookCard({ book }) {
    const title = `书名：${book.title}\n作者：${book.author}\n价格：${book.price}`; // 使用\n换行
    const description = `这是我最喜欢的书籍!!!计算机系统基础!!!我爱它爱得不能自拔!!!`;
    return (
        <Link to={`/book/${book.bookID}`}>
            <Card hoverable cover={<img src={book.img} alt={book.title}/>}>
                <Meta title={title} description={description} className="custom-meta" />
            </Card>
        </Link>
    );
}
