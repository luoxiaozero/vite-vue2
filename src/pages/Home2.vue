<script>
import { useUserStore } from "../store"

export default {
    name: "Home",
    data() {
        const userStore = useUserStore()
        return {
            count: userStore.token
        }
    },
    methods: {
        add() {
            this.count++
            const userStore = useUserStore()
            userStore.updateToken(this.count)
        }
    }
}
</script>

<template>
    <div>
        <button @click="add">+1</button>
        {{ count }}
    </div>
</template>