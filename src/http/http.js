import axios from 'axios';
import qs from 'qs';
import Cookie from '../util/Cookie';


const http = axios.create({
    baseUrl: `localhost:3030`,
    timeout: 1000 * 60 * 3
})

// 请求拦截器，在发送前是否带有token
http.interceptors.request.use(
    config => {
        console.log(1);
        // const token = Cookie.getCookie('token');
        // if (token) {
        //     config.headers['token'] = token
        // }
        return config;
    },
    error => {
        return Promise.error(error)
    }
)

http.interceptors.response.use(
    response => {
        console.log(response);
        if (response && response.data && response.status == 200) {
            return response.data
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        console.log(error);
    }
)


export default http;