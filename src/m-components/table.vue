<template>
    <table :class="['m-table', { 'm-table--single-row': singleRow, 'm-table--single-column': singleColumn }]">
        <slot></slot>
    </table>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
    name: "MTable",
    props: {
        singleRow: Boolean,
        singleColumn: Boolean,
    },
})
</script>

<style scoped>
.m-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #ebeef5;
}

.m-table th {
    text-align: inherit;
    background-color: #f5f7fa;
}

.m-table td {
    background-color: #fff;
}

.m-table td,
.m-table th {
    padding: 10px 12px;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
}

.m-table.m-table--single-row td,
.m-table.m-table--single-row th {
    border-right: none;
}

.m-table.m-table--single-column td {
    border-bottom: none;
}

.m-table td:last-child,
.m-table th:last-child {
    border-right: none;
}

.m-table tbody tr:last-child td {
    border-bottom: none;
}

.m-table tr {
    border-bottom: 1px solid #ebeef5;
}
</style>