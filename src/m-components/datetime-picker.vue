<template>
    <el-date-picker type="datetime" :placeholder="placeholder" :default-time="defaultTime" :value="value" @input="input"
        :picker-options="pickerOptions" @focus="focus">
    </el-date-picker>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
    name: "MDatetimePicker",
    props: {
        value: {
            type: [Date, String],
            default() {
                return new Date()
            }
        },
        placeholder: String,
        defaultTime: String,
        /**
         * Function -> [boolean, string, string]
         */
        disabledDatetime: Function,
    },
    data() {
        return {
            pickerOptions: {
                selectableRange: "00:00:00 - 23:59:59",
                disabledDate: (time) => {
                    return this.disabledDatetime(time)[0];
                }
            },
        }
    },
    methods: {
        updateSelectableRange(date) {
            let time = this.disabledDatetime(date);
            if (!time) {
                time = ["00:00:00", "23:59:59"]
            }
            this.pickerOptions.selectableRange = `${time[1]} - ${time[2]}`
        },
        input(value) {
            if (!value) {
                this.$emit('input', value)
                return;
            }
            if (this.value instanceof Date) {
                if (this.value.getFullYear() == value.getFullYear() && this.value.getMonth() == value.getMonth() && this.value.getDate() == value.getDate()) {
                    this.$emit('input', value)
                } else {
                    this.updateSelectableRange(value);
                    let startTime = this.pickerOptions.selectableRange.split(" - ")[0];
                    let [hours, minutes, seconds] = startTime.split(":");
                    value.setHours(hours);
                    value.setMinutes(minutes);
                    value.setSeconds(seconds);
                    this.$emit('input', value)
                }
            } else {
                this.updateSelectableRange(value);
                this.$emit('input', value)
            }
        },
        focus() {
            let value = this.value;
            if (!(value instanceof Date)) {
                value = new Date()
                this.$emit('input', value)
            }
            this.updateSelectableRange(value);
        }
    }
})
</script>

<style scoped>

</style>