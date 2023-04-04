import Router from "vue-router"
import Vue, { getCurrentInstance } from "vue"

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            component: () => import("../pages/home.vue"),
            name: "Home",
        },
        {
            path: "/setup",
            component: () => import("../pages/home-setup.vue"),
            name: "HomeSetup",
        },
        {
            path: "/setup-plus",
            component: () => import("../pages/home-setup-plus.vue"),
            name: "HomeSetupPlus",
        },
    ],
})

router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    next()
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
