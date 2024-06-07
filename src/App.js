import { ConfigProvider, theme } from 'antd';
import AppRouter from './components/router';
function App() {
  const themeToken = {
    colorPrimary: "#1DA57A",
    colorInfo: "#1DA57A"
  }
  return <ConfigProvider theme={{
      algorithm: theme.defaultAlgorithm,
      token: themeToken
  }}>
      {/*<BookCart> /!* 将整个应用包裹在 BookCart 组件中 *!/*/}
              <AppRouter />
      {/*</BookCart>*/}
  </ConfigProvider>
}

export default App;


export const booksData = [
  { id: 1, img:"/myImages/book2.jpg",title: 'Book 1', author: 'Author 1', price: '¥10',description:'我的最爱，',detail:'你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。',sales:'100',status:'在售'},
  { id: 2, img:"/myImages/book2.jpg",title: 'Book 2', author: 'Author 2', price: '¥20',description:'我的最爱',detail:'你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。',sales:'100',status:'在售'},
  { id: 3, img:"/myImages/book2.jpg",title: 'Book 3', author: 'Author 3', price: '¥30',description:'我的最爱' ,detail:'你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。',sales:'100',status:'在售'},
  { id: 4, img:"/myImages/book2.jpg",title: 'Book 4', author: 'Author 4', price: '¥40' ,description:'我的最爱',detail:'你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。',sales:'100',status:'在售'},
  { id: 5, img:"/myImages/book2.jpg",title: 'Book 5', author: 'Author 5', price: '¥50' ,description:'我的最爱',detail:'你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。',sales:'100',status:'在售'},
  { id: 6, img:"/myImages/book2.jpg",title: 'Book 6', author: 'Author 6', price: '¥60' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 7, img:"/myImages/book2.jpg",title: 'Book 7', author: 'Author 7', price: '¥70',description:'我的最爱' ,detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 8, img:"/myImages/book2.jpg",title: 'Book 8', author: 'Author 8', price: '¥80' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 9, img:"/myImages/book2.jpg",title: 'Book 9', author: 'Author 9', price: '¥90' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 10, img:"/myImages/book2.jpg",title: 'Book 10', author: 'Author 10', price: '¥100',description:'我的最爱' ,detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 11, img:"/myImages/book2.jpg",title: 'Book 11', author: 'Author 11', price: '¥110' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 12, img:"/myImages/book2.jpg",title: 'Book 12', author: 'Author 12', price: '¥120' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 13, img:"/myImages/book2.jpg",title: 'Book 13', author: 'Author 13', price: '¥130',description:'我的最爱' ,detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 14, img:"/myImages/book2.jpg",title: 'Book 14', author: 'Author 14', price: '¥140' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 15, img:"/myImages/book2.jpg",title: 'Book 15', author: 'Author 15', price: '¥150',description:'我的最爱' ,detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 16, img:"/myImages/book2.jpg",title: 'Book 16', author: 'Author 16', price: '¥160' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 17, img:"/myImages/book2.jpg",title: 'Book 17', author: 'Author 17', price: '¥170' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 18, img:"/myImages/book2.jpg",title: 'Book 18', author: 'Author 18', price: '¥180' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 19, img:"/myImages/book2.jpg",title: 'Book 19', author: 'Author 19', price: '¥190',description:'我的最爱' ,detail:'这是一本好书',sales:'100',status:'在售'},
  { id: 20, img:"/myImages/book2.jpg",title: 'Book 20', author: 'Author 20', price: '¥200' ,description:'我的最爱',detail:'这是一本好书',sales:'100',status:'在售'},
];

export const Users =[
    {id:1,
    username:"lin040430",
    password:"20040430"
    },
];

export const cartData = [
  // 假设你已经有了一个名为`cartItems`的数组，其中包含购物车中的书籍信息
  {
    id: 1,
    cover: "/myImages/book2.jpg",
    title: '书籍1',
    quantity: 2,
    price: "￥10.99",
  },
  {
    id: 2,
    cover: "/myImages/book2.jpg",
    title: '书籍2',
    quantity: 1,
    price: "￥19.99",
  },
];

export const userData = [
    {
        id: 1,
        name: 'Chengliang Lin',
        nickName: '路人甲',
        avatar: "/myImages/headshot.jpg",
        contact: "/myImages/headshot.jpg",
        address: '/myImages/headshot.jpg',
        balance: '￥1000',
        level:'龙叔的VIP',
        description:'害羞老实人一枚捏~',
    },
    {
        id: 2,
        name: '李四',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        id: 3,
        name: '王五',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        id: 4,
        name: '赵六',
        age: 32,
        address: 'Beijing No. 1 Lake Park',
    },
    {
        id: 5,
        name: '孙七',
        age: 32,
        address: 'Shanghai No. 1 Lake Park',
    },
];
// export const default booksDetailedData = [
//
// ];