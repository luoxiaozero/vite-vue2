<script>
import { useUserStore } from "../store"
import MInputNumber from "../m-components/input-number.vue"
import MInputNumberPlus from "../m-components/input-number-plus.vue"

export default {
    name: "Home",
    components: {
        MInputNumber,
        MInputNumberPlus
    },
    data() {
        const userStore = useUserStore()
        return {
            num2: 0,
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
            <m-input-number-plus v-model="num2" placeholder="请输入" separator percent :min="0" :disabled="false"
                :precision="2">
            </m-input-number-plus>
            <m-input-number v-model="input" placeholder="请输入内容2" separator percent :min="0" :disabled="false"
                :precision="2">
            </m-input-number>
            <el-input-number v-model="input" placeholder="请输入内容0"></el-input-number>
            <button @click="add">+1</button>
            <el-input v-model="input" placeholder="请输入内容1"></el-input>
            {{ count }}
        </el-form>
    </div>
</template>