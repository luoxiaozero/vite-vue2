<script>
import { defineComponent, ref } from "vue"

export default defineComponent({
    name: "Home",
    setup() {
        const countRef = ref(1)

        function add() {
            countRef.value++
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