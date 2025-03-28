// index.js
import request from "./axiosInstance.js";

export function getData() {
    return request({
        url: request_URL,
        method: 'get',
        // params: {}
    })
}
