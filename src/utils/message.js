/*
    函数检查res的ok属性，如果为真，用.success()显示成功信息，并且执行onSuccess回调函数
    如果为假，用.error()显示失败信息，并且执行onFail回调函数
    massageApi.success(),.error()返回的是一个promise，所以需要使用await
*/
import {isOK} from "./myUtils";
export async function handleBaseApiResponse(res, messageApi, onSuccess, onFail) {
    // console.log("enter");
    // console.log(res.ok);
    if (isOK(res.code)) {
        // 设置cookie到浏览器中
        // if(res.cookie) document.cookie = res.cookie
        // console.log("success");
        await messageApi.success(res.message, 0.8);
        // console.log("to here");
        onSuccess?.();
    } else {
        // console.log("error");
        console.log(res.message);
        await messageApi.error(res.message, 0.8);
        onFail?.();
    }
}
