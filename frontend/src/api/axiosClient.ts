import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const client = (() => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            Accept: "application/json, text/plain, */*",
        },
    });
})();

const request = async (options: AxiosRequestConfig) => {
    const onSuccess = (response: AxiosResponse) => {
        const { data } = response;
        return data;
    };

    const onError = function (error: AxiosError) {
        return Promise.reject({
            message: error.message,
            code: error.code,
            response: error.response,
        });
    };

    return client(options).then(onSuccess).catch(onError);
};

export default request;