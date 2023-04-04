export function numberToPrecision(num, precision) {
    let match = String(num).match(/(\d+)(.(\d+))?/);
    if (match[2]) {
        let decimal = match[3];
        if (decimal.length <= precision) {
            return num;
        } else {
            let integer = match[1];
            decimal = decimal.substring(0, precision)
            if (decimal) {
                return Number(integer + "." + decimal);
            } else {
                return Number(integer);
            }
        }
    } else {
        // 不存在小数
        return num;
    }
}