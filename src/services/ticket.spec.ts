import "fake-indexeddb/auto";
import "jest-localstorage-mock";

import {
  calculateTimeParked,
  calculateRate,
  RATE_1H,
  RATE_3H,
  RATE_6H,
  RATE_24H,
  getTotal,
  pay,
  leave
} from "./ticket";
import { subMinutes, addMinutes } from "date-fns";
import { create, get } from "./db";

describe("Ticket Service", () => {
  test("calculate the time parked", async () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 60);
    expect(calculateTimeParked(date)).toBe(60);
  });

  test("should calculate rate", async () => {
    expect(calculateRate(60)).toEqual(RATE_1H);
    expect(calculateRate(61)).toEqual(RATE_3H);
    expect(calculateRate(180)).toEqual(RATE_3H);
    expect(calculateRate(181)).toEqual(RATE_6H);
    expect(calculateRate(360)).toEqual(RATE_6H);
    expect(calculateRate(361)).toEqual(RATE_24H);
    expect(calculateRate(500)).toEqual(RATE_24H);
    expect(calculateRate(1000)).toEqual(RATE_24H);
    expect(calculateRate(-10)).toEqual(0);
  });

  test("calculate totals", async () => {
    const date = new Date();
    expect(await getTotal({ plate: "TEST_123", parking_time: subMinutes(date, 60), id: "1" })).toEqual(RATE_1H);
    expect(await getTotal({ plate: "TEST_123", parking_time: subMinutes(date, 61), id: "1" })).toEqual(RATE_3H);
    expect(await getTotal({ plate: "TEST_123", parking_time: subMinutes(date, 180), id: "1" })).toEqual(RATE_3H);
    expect(await getTotal({ plate: "TEST_123", parking_time: subMinutes(date, 181), id: "1" })).toEqual(RATE_6H);
    expect(await getTotal({ plate: "TEST_123", parking_time: subMinutes(date, 360), id: "1" })).toEqual(RATE_6H);
    expect(await getTotal({ plate: "TEST_123", parking_time: subMinutes(date, 361), id: "1" })).toEqual(RATE_24H);
    expect(await getTotal({ plate: "TEST_123", parking_time: subMinutes(date, 500), id: "1" })).toEqual(RATE_24H);
    expect(await getTotal({ plate: "TEST_123", parking_time: subMinutes(date, 1000), id: "1" })).toEqual(RATE_24H);
    expect(await getTotal({ plate: "TEST_123", parking_time: addMinutes(date, 10), id: "1" })).toEqual(0);
  });

  test("pay", async () => {
    const item = await create({ plate: "TeST", parking_time: new Date() });
    await pay(item);
    expect((await get(item.id)).has_paid).toEqual(true);
  });
  test("leave", async () => {
    const item = await create({ plate: "TeST", parking_time: new Date() });
    await pay(item);
    await leave(item);
    expect(get(item.id)).rejects;
  });
});
