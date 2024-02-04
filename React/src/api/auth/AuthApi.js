import axiosClient from "../AxiosClient";
import { urls } from "../urls";

const AuthApi = {
    login(params) {
        return axiosClient.post(`${urls.LOGIN}`, params);
    },
    // refreshlogin(params){
    //     return axiosClient.post(`${urls.REFRESH_LOGIN}`,params)
    // },
    registration(params)
    {
        return axiosClient.post(`${urls.REGISTRATION}`,params)
    }
};

export default AuthApi;