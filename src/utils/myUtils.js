
//判断响应是否成功
export function isOK(value) {
    if (value>=200 && value<=299) {
        return true;
    }
    return false;
}

//检查邮箱格式是否正确
export function checkEmail(email) {
    console.log(email);
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return reg.test(email);
}

//将Date转换为需要的date形式
export function formatDate(date) {
    // console.log(date);
    //确定date是Date类
    date = new Date(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    //如果day小于10，day前加0
    if (day < 10) {
        day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;
}