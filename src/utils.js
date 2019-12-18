export function isMoneyValueValid(value) {
    const moneyRegex = /^\d*\.?\d{0,4}$/;
    return moneyRegex.test(value);
};

export function unFormatMoney(value) {
    return value.replace(/[^0-9.]/g, "");
}

export function formatMoney(value) {
    const [integer = "", decimal = ""] = value.split(".");
    let integerResult = "";
    const integerLength = integer.length;

    if (integerLength) {
        for(let i = 1; i <= integerLength; i++) {
            const currentPosition = integerLength - i;
            integerResult = `${integer[currentPosition]}${integerResult}`
            if (i % 3 === 0 && i !== integerLength) {
                integerResult = `,${integerResult}`
            }
        }
    } else {
        integerResult = "0";
    }

    return `${integerResult}${!!decimal ? `.${decimal}` : ""}`;
}

export function getLastThreeDates() {
    let result = [];
    for(let i = 1; i <= 3; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        result.push(`${year}-${month}-${day}`);
    }
    return result;
}

export function buildLastDaysState(days) {
    return days.reduce((accum, { data }) => ({ ...accum, [data.date]: data.rates }), {});
}

export function getHistoryUrl(date) { return `http://data.fixer.io/api/${date}`; };