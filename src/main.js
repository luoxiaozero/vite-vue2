import Vue from "vue"
import App from "./App.vue"
import router from './router'
import pinia from "./store"

new Vue({
    render: (h) => h(App),
    router,
    pinia,
}).$mount("#app")
