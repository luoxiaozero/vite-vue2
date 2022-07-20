<script setup>
import { ref } from "vue"
import { useUserStore } from "../store"

const userStore = useUserStore()
const countRef = ref(userStore.token)


function add() {
    countRef.value++

    userStore.updateToken(countRef.value)
}
</script>

<template>
    <div>
        <button @click="add">+1</button>
        {{ countRef }}
    </div>
</template>