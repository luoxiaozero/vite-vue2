import { defineStore, createPinia, PiniaVuePlugin } from "pinia"
import piniaPluginPersist from "pinia-plugin-persist"
import Vue from "vue"

Vue.use(PiniaVuePlugin)

export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return { token: "" }
    },
    actions: {
        updateToken(token) {
            this.token = token
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "store-user",
                storage: localStorage,
            },
        ],
    },
})

const pinia = createPinia()
pinia.use(piniaPluginPersist)
export default pinia 
