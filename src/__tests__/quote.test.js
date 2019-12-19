import { calculateQuoteValue } from '../utils/utils';
import { latestRates } from '../utils/mockedData';

describe('Tests quote calculation behaves properly', () => {
  const currencyRates = latestRates;
  const target = "USD";
  const source = "EUR";

  it('should return correct value for cero', () => {
    const args = { currencyRates, target, source, sourceValue: "0" }
    expect(calculateQuoteValue(args)).toEqual("0.0000");
    args.sourceValue = "0.000";
    expect(calculateQuoteValue(args)).toEqual("0.0000");
  });
  
  it('should return correct value for an integer value', () => {
    const args = { currencyRates, target, source, sourceValue: "123.00" }
    expect(calculateQuoteValue(args)).toEqual("136.9420");
    args.sourceValue = "1,234.00";
    expect(calculateQuoteValue(args)).toEqual("1,373.8739");
    args.sourceValue = "1,234,567.00";
    expect(calculateQuoteValue(args)).toEqual("1,374,505.1695");
  });

  it('should return correct value for a decimal value', () => {
    const args = { currencyRates, target, source, sourceValue: "0.2" }
    expect(calculateQuoteValue(args)).toEqual("0.2227");
    args.sourceValue = "123.02";
    expect(calculateQuoteValue(args)).toEqual("136.9643");
    args.sourceValue = "1,234.5678";
    expect(calculateQuoteValue(args)).toEqual("1,374.5061");
  })
});
