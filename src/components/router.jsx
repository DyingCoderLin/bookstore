//react router的路由配置
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import LoginPage from "../page/login";
import BookPage from "../page/book";
import CartPage from "../page/cart";
import UserPage from "../page/user";
// import OrderPage from "../page/order";
// import RankPage from "../page/rank";

export default function AppRouter() {
    //使用 BrowserRouter 组件包裹整个路由配置，这是 React Router提供的用于启用HTML5历史路由的组件。
    return <BrowserRouter>
        {/*//使用 Routes 组件，它是 React Router 提供的用于包裹所有路由的组件，用于定义应用程序的路由规则。*/}
        <Routes>
            {/*当用户访问根路径时，渲染 LoginPage 组件。*/}
            <Route index element={<LoginPage />} />
            {/*<Route index element={<HomePage />} />*/}
            {/*<Route index element={<BookPage />} />
            */}
            {/*定义了一个路由规则，当用户访问路径 /home 时，渲染 <HomePage /> 组件。*/}
            <Route path="/home" element={<HomePage />} />
            {/*<Route path="/login" element={<LoginPage />} />*/}
            {/*定义了一个动态路由规则，其中 :id 是一个占位符，表示书籍的唯一标识*/}
            <Route path="/book/:id" element={<BookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/user" element={<UserPage />} />
            {/*<Route path="/order" element={<OrderPage />} />*/}
            {/*<Route path="/rank" element={<RankPage />} />*/}
            {/*<Route path="/*" element={<HomePage />} />*/}
        </Routes>
    </BrowserRouter>
}