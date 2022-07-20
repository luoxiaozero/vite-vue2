<script>
import { defineComponent, ref } from "vue"
import { useUserStore } from "../store"

export default defineComponent({
    name: "Home",
    setup() {
        const userStore = useUserStore()
        const countRef = ref(userStore.token)
        

        function add() {
            countRef.value++
                    
            userStore.updateToken(countRef.value)
        }

        return {
            add,
            countRef,
        }
    }
})
</script>

<template>
    <div>
        <button @click="add">+1</button>
        {{ countRef }}
    </div>
</template>