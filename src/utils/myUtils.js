//判断响应是否成功
export function isOK(value) {
    if (value>=200 && value<=299) {
        return true;
    }
    return false;
}