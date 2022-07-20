<script>
import { defineComponent, ref } from "vue"
import { useUserStore } from "../store"

export default defineComponent({
    name: "Home",
    setup() {
        const countRef = ref(1)
        const userStore = useUserStore()

        function add() {
            countRef.value++
                    
            userStore.updateToken("init" + countRef.value)
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