<template>
    <div class="m-input-number">
        <el-input :value="displayValue" :placeholder="placeholder" :disabled="inputNumberDisabled"
            :size="inputNumberSize" @input="handleInput" @change="handleInputChange" />
    </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
    name: "MInputNumber",
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    props: {
        separator: Boolean,
        percent: Boolean,
        value: [Number, String],
        precision: Number,
        placeholder: String,
        disabled: Boolean,
        size: String,
        min: {
            type: Number,
            default: -Number.Infinity
        },
    },
    data() {
        return {
            currentValue: 0,
            userInput: null
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                let newVal = value === undefined ? value : Number(value);
                if (newVal !== undefined) {
                    if (Number.isNaN(newVal)) {
                        return;
                    }
                    if (this.precision !== undefined) {
                        newVal = this.toPrecision(newVal, this.precision);
                    }
                }
                if (newVal <= this.min) newVal = this.min;
                this.currentValue = newVal;
                this.userInput = null;
                this.$emit('input', newVal);
            }
        }
    },
    computed: {
        displayValue() {
            if (this.userInput !== null) {
                return this.userInput;
            }
            let currentValue = this.currentValue;
            if (typeof currentValue === 'number') {
                if (this.precision !== undefined) {
                    currentValue = Number.parseFloat(currentValue.toFixed(this.precision));
                }
                currentValue = this.format(currentValue)
            }
            return currentValue;
        },
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        inputNumberSize() {
            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        },
        inputNumberDisabled() {
            return this.disabled || !!(this.elForm || {}).disabled;
        },
    },
    methods: {
        parse(value) {
            if (value === '') {
                return undefined
            }
            let newVal = value;
            if (this.percent) {
                newVal = newVal.replace(/%$/g, '').trim()
            }
            if (this.separator) {
                newVal = newVal.replace(/,/g, '').trim()
            }

            return newVal === '' ? undefined : Number(newVal)
        },
        format(value) {
            let newVal = value;
            if (this.separator) {
                newVal = value.toLocaleString('en-US')
            }
            if (this.percent) {
                newVal = `${newVal}%`
            }
            return newVal
        },
        toPrecision(num, precision) {
            return Number.parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
        },
        setCurrentValue(newVal) {
            const oldVal = this.currentValue;
            if (typeof newVal === 'number' && this.precision !== undefined) {
                newVal = this.toPrecision(newVal, this.precision);
            }
            if (newVal <= this.min) newVal = this.min;
            if (oldVal === newVal) return;
            this.$emit('input', newVal);
            this.$emit('change', newVal, oldVal);
            this.currentValue = newVal;
        },
        handleInput(value) {
            this.userInput = value;
        },
        handleInputChange(value) {
            const newVal = this.parse(value);
            if (!Number.isNaN(newVal) || value === '') {
                this.setCurrentValue(newVal);
            }
            this.userInput = null;
        },
    }
})
</script>

<style scoped>
</style>