import { convertCurrency, prependNumber, minutesFormat } from "./utils";
import { addMinutes, subMinutes } from "date-fns";

describe("utils service", () => {
  test("convert currency", () => {
    expect(convertCurrency(1.25)).toEqual("$1.25");
    expect(convertCurrency(1.43243245)).toEqual("$1.43");
    expect(convertCurrency(100000)).toEqual("$100,000.00");
  });

  test("prepend number", () => {
    expect(prependNumber(0)).toEqual("00");
    expect(prependNumber(1)).toEqual("01");
    expect(prependNumber(2)).toEqual("02");
    expect(prependNumber(3)).toEqual("03");
    expect(prependNumber(4)).toEqual("04");
    expect(prependNumber(5)).toEqual("05");
    expect(prependNumber(6)).toEqual("06");
    expect(prependNumber(7)).toEqual("07");
    expect(prependNumber(8)).toEqual("08");
    expect(prependNumber(9)).toEqual("09");
    expect(prependNumber(10)).toEqual("10");
  });

  test("minutesFormat", () => {
    expect(minutesFormat(subMinutes(new Date(), 70))).toEqual("01:10");
    expect(minutesFormat(subMinutes(new Date(), 50))).toEqual("00:50");
  });
});
