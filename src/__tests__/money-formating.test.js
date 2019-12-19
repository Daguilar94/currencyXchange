import { unFormatMoney, formatMoney, isMoneyValueValid } from '../utils/utils';

describe("Test money formating utils", () => {
    describe("Test money formating function", () => {
        it("should remove left side integer ceros", () => {
            expect(formatMoney("00233")).toEqual("233.00");
            expect(formatMoney("00233.34")).toEqual("233.34");
            expect(formatMoney("000075.003")).toEqual("75.003");
        });

        it("should autocomplete 2 cero decimals if none was provided", () => {
            expect(formatMoney("34")).toEqual("34.00");
            expect(formatMoney("0")).toEqual("0.00");
        });

        it("should add a cero integer if none was provided", () => {
            expect(formatMoney(".")).toEqual("0.00");
            expect(formatMoney(".345")).toEqual("0.345");
        });

        it("should add coma for thousand separator", () => {
            expect(formatMoney("34242342")).toEqual("34,242,342.00");
            expect(formatMoney("0034242342")).toEqual("34,242,342.00");
            expect(formatMoney("001234567.655")).toEqual("1,234,567.655");
        });
    });

    describe("Test money unformating function", () => {
        it("should unformat thousand separators", () => {
            expect(unFormatMoney("34,242,342.00")).toEqual("34242342.00");
            expect(unFormatMoney("2,342.00")).toEqual("2342.00");
            expect(unFormatMoney("0.00")).toEqual("0.00");
        });
    });

    describe("Test valid money input function", () => {
        it("should be invalid when entering more than one point", () => {
            expect(isMoneyValueValid("..00")).toEqual(false);
            expect(isMoneyValueValid("3.40.0")).toEqual(false);
            expect(isMoneyValueValid(".3400.")).toEqual(false);
        });

        it("should be invalid when entering a letter", () => {
            expect(isMoneyValueValid("42fd")).toEqual(false);
            expect(isMoneyValueValid("e")).toEqual(false);
            expect(isMoneyValueValid("3987j")).toEqual(false);
        });

        it("should be invalid when entering a coma", () => {
            expect(isMoneyValueValid("4242,")).toEqual(false);
            expect(isMoneyValueValid(",")).toEqual(false);
        });

        it("should be invalid when entering more than 4 decimals", () => {
            expect(isMoneyValueValid("4242.43455")).toEqual(false);
        });
    })
})