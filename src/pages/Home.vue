<script>
import { useUserStore } from "../store"
import MInputNumber from "../m-components/input-number.vue"
export default {
    name: "Home",
    components: {
        MInputNumber
    },
    data() {
        const userStore = useUserStore()
        return {
            input: '2200',
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
        <el-form>
        <m-input-number v-model="input" placeholder="请输入内容2" separator
        percent :min="0" :disabled="false"></m-input-number>
        <el-input v-model="input" placeholder="请输入内容1"></el-input>
        <el-input-number v-model="input" placeholder="请输入内容0"></el-input-number>
        <button @click="add">+1</button>
        {{ count }}
        </el-form>
    </div>
</template>