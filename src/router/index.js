import Router from "vue-router"
import Vue from "vue"

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            component: () => import("../pages/Home.vue"),
            name: "Home",
        },
        {
            path: "/vue2",
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

export default router
