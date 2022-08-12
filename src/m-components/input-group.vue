<template>
    <div class="m-input-group">
        <slot></slot>
    </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
    name: "MInputGroup",
})
</script>

<style>

.m-input-group .m-input-number:first-child .el-input__inner,
.m-input-group .el-input-number:first-child .el-input__inner{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.m-input-group .el-select:last-child .el-input__inner{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

/* .m-input-group:not(:first-child):not(:last-child) {
    border-left-color: hsla(0,0%,100%,.5);
    border-right-color: hsla(0,0%,100%,.5);
} */
</style>