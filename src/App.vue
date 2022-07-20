<template>
    <router-view />
</template>

<script>
import { defineComponent } from "vue"
import { useUserStore } from "./store"
export default defineComponent({
    name: "App",
    setup() {
        const userStore = useUserStore()
        userStore.updateToken("init")
    }
})
</script>