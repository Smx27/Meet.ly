import axiosClient from "../AxiosClient";
import { urls } from "../Urls";

const AuthApi = {
    // login(params) {
    //     return axiosClient.post(`${urls.LOGIN_URL}`, params);
    // },
    // refreshlogin(params){
    //     return axiosClient.post(`${urls.REFRESH_LOGIN}`,params)
    // },
    registration(params)
    {
        return axiosClient.post(`${urls.REGISTRATION}`,params)
    }
};

export default AuthApi;