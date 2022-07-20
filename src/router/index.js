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
    ],
})

export default router
