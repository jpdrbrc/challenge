import { differenceInMinutes } from "date-fns";

export const convertCurrency = (amount: number) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const prependNumber = (number: number) => ("0" + number).slice(-2);

export const minutesFormat = (start: Date) => {
  const diff = differenceInMinutes(new Date(), start);
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${prependNumber(hours)}:${prependNumber(minutes)}`;
};
