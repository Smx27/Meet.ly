import axios from "axios";
const axiosClient = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
});

axiosClient.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
axiosClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});
export default axiosClient;