import axios from "axios"
import router from "../router"
import { useUserStore } from "../store"

// 设置超时
axios.defaults.timeout = 10000

axios.interceptors.request.use(
    config => {
        const userStore = useUserStore()
        if (userStore.token) {
            config.headers && (config.headers["token"] = userStore.token)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    const userStore = useUserStore()
                    userStore.updateToken(0)
                    router.push({
                        path: "/",
                    })
                default:
                    console.error("提示:" + "网络请求失败，请刷新重试", error)
            }
        }
        return Promise.reject(error)
    }
)

export const net = {
    /**
     * @param {string} url
     * @param { { params, data } } init
     */
    post(url, init) {
        return this.request("post", url, init)
    },
    /**
     * @param {string} url
     * @param {{ params, data }} init
     */
    get(url, init) {
        return this.request("get", url, init)
    },
    /**
     *
     * @param {string} method
     * @param {string} url
     * @param {{ params, data }} init
     * @returns {Promise<{Success: boolean, Data: any}>}
     */
    request(method, url, init) {
        if (!init) init = {}
        return new Promise((resolve, reject) => {
            axios({
                method,
                url,
                params: init.params,
                data: init.data,
            })
                .then(res => {
                    if (res.status == 200) {
                        // 自定义请求返回逻辑
                        resolve(data)
                    } else {
                        reject(res.statusText)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
}
