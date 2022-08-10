<script>
import { useUserStore } from "../store"

export default {
    name: "Home",
    data() {
        const userStore = useUserStore()
        return {
            input: '',
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
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <button @click="add">+1</button>
        {{ count }}
    </div>
</template>