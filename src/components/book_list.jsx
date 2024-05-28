import { List, Card } from 'antd';
import BookCard from "./book_card";

export default function Booklist({books}) {
    return (
        <>
            {books.length === 0 ? (
                <Card style={{ width: '100%', marginTop: 16,textAlign:"center",backgroundColor:"rgba(255,255,255,0.6)",fontSize:"24px"}} >
                    没有检索到你要的书籍
                </Card>
            ) : (
                <List
                    bordered={true}
                    split={true}
                    grid={{
                        gutter: { row: 16, column: 100 },
                        column: 5
                    }}
                    dataSource={books}
                    renderItem={(book) => (
                        <List.Item style={{ marginBottom: '40px' }}>
                            <BookCard book={book} />
                        </List.Item>
                    )}
                />
            )}
        </>
    );
}