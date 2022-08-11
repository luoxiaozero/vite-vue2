import Router from "vue-router"
import Vue, { getCurrentInstance } from "vue"

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/vue",
            component: () => import("../pages/Home.vue"),
            name: "Home",
        },
        {
            path: "/",
            component: () => import("../pages/Home2.vue"),
            name: "Home2",
        },
        {
            path: "/setup",
            component: () => import("../pages/HomeSetup.vue"),
            name: "HomeSetup",
        },
    ],
})

export function useRoute() {
    const { proxy } = getCurrentInstance()
    const route = proxy.$route
    return route
}
export function useRouter() {
    const { proxy } = getCurrentInstance()
    const router = proxy.$router
    return router
}

export default router
