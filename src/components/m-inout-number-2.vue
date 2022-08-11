<template>
    <div class="m-input-number" @keyup="handleKeyUp" @keydown="handleKeyDown">
        <el-input ref="inputRef" :value="displayValue" :placeholder="placeholder" :disabled="inputNumberDisabled"
            :size="inputNumberSize" @input="handleInput" @change="handleInputChange" @focus="handleFocus"
            @blur="handleBlur" />
    </div>
</template>

<script>
import Vue from "vue";
import KeyCode from '../util/key-code.js';
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
        /**是否开启数字千位分隔符 */
        separator: Boolean,
        /**是否开启数字百分号 */
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
            userInput: null,

            // cursor
            cursorStart: 0,
            cursorEnd: 0,
            currentValue: '',
            cursorBefore: '',
            cursorAfter: '',
            focused: false,
            lastKeyCode: 0,
            // cursor end
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
                    currentValue = currentValue.toFixed(this.precision);
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
    updated() {
        this.$nextTick(() => {
            this.updatedFunc();
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.updatedFunc();
        });
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
                newVal = newVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')  // value.toLocaleString('en-US') // String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
            }
            if (this.percent) {
                newVal = `${newVal}%`
            }
            return newVal
        },
        updatedFunc() {
            const inputElem = this.$refs.inputRef.$refs.input;
            // Restore cursor
            try {
                // Firefox set the input cursor after it get focused.
                // This caused that if an input didn't init with the selection,
                // set will cause cursor not correct when first focus.
                // Safari will focus input if set selection. We need skip this.
                if (this.cursorStart !== undefined && this.focused) {
                    // In most cases, the string after cursor is stable.
                    // We can move the cursor before it
                    if (
                        // If not match full str, try to match part of str
                        !this.partRestoreByAfter(this.cursorAfter) &&
                        (this.cursorBefore + this.cursorAfter) !== this.displayValue
                    ) {
                        // If not match any of then, let's just keep the position
                        // TODO: Logic should not reach here, need check if happens
                        let pos = this.cursorStart + 1;

                        // If not have last string, just position to the end
                        if (!this.cursorAfter) {
                            pos = inputElem.value.length;
                        } else if (this.lastKeyCode === KeyCode.BACKSPACE) {
                            pos = this.cursorStart - 1;
                        } else if (this.lastKeyCode === KeyCode.DELETE) {
                            pos = this.cursorStart;
                        }
                        this.fixCaret(pos, pos);
                    } else if (this.currentValue === inputElem.value) {
                        // Handle some special key code
                        switch (this.lastKeyCode) {
                            case KeyCode.BACKSPACE:
                                this.fixCaret(this.cursorStart - 1, this.cursorStart - 1);
                                break;
                            case KeyCode.DELETE:
                                this.fixCaret(this.cursorStart + 1, this.cursorStart + 1);
                                break;
                            default:
                            // Do nothing
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            }
            // Reset last key
            this.lastKeyCode = null;
        },
        partRestoreByAfter(str) {
            if (str === undefined) return false;

            // For loop from full str to the str with last char to map. e.g. 123
            // -> 123
            // -> 23
            // -> 3
            return Array.prototype.some.call(str, (_, start) => {
                const partStr = str.substring(start);

                return this.restoreByAfter(partStr);
            });
        },
        restoreByAfter(str) {
            if (str === undefined) return false;

            const fullStr = this.$refs.inputRef.$refs.input.value;
            const index = fullStr.lastIndexOf(str);

            if (index === -1) return false;

            const prevCursorPos = this.cursorBefore.length;
            if (
                this.lastKeyCode === KeyCode.DELETE &&
                this.cursorBefore.charAt(prevCursorPos - 1) === str[0]
            ) {
                this.fixCaret(prevCursorPos, prevCursorPos);
                return true;
            }
            if (index + str.length === fullStr.length) {
                this.fixCaret(index, index);

                return true;
            }
            return false;
        },
        fixCaret(start, end) {
            const inputElem = this.$refs.inputRef.$refs.input;
            if (start === undefined || end === undefined || !inputElem || !inputElem.value) {
                return;
            }

            try {
                const currentStart = inputElem.selectionStart;
                const currentEnd = inputElem.selectionEnd;
                if (start !== currentStart || end !== currentEnd) {
                    inputElem.setSelectionRange(start, end);
                }
            } catch (e) {
                console.error(e);
                // Fix error in Chrome:
                // Failed to read the 'selectionStart' property from 'HTMLInputElement'
                // http://stackoverflow.com/q/21177489/3040605
            }
        },
        recordCursorPosition() {
            // Record position
            try {
                const inputElem = this.$refs.inputRef.$refs.input;
                this.cursorStart = inputElem.selectionStart;
                this.cursorEnd = inputElem.selectionEnd;
                this.currentValue = inputElem.value;
                this.cursorBefore = inputElem.value.substring(0, this.cursorStart);
                this.cursorAfter = inputElem.value.substring(this.cursorEnd);
            } catch (e) {
                console.error(e);
                // Fix error in Chrome:
                // Failed to read the 'selectionStart' property from 'HTMLInputElement'
                // http://stackoverflow.com/q/21177489/3040605
            }
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
        handleKeyDown() {
            this.recordCursorPosition();
        },
        handleKeyUp() {
            this.recordCursorPosition();
        },
        focus() {
            this.$refs.inputRef.focus();
            this.recordCursorPosition();
        },
        handleFocus() {
            this.focused = true;
        },
        handleBlur() {
            this.focused = false;
        },
        handleInput(value) {
            this.userInput = value;
            this.handleInputChange(value);
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
.m-input-number {
    display: inline-block;
}

.m-input-number :deep(.el-input__inner) {
    text-align: center;
}
</style>