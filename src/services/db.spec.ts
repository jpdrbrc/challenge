import "fake-indexeddb/auto";
import "jest-localstorage-mock";
import { create, getLength, get, update, remove, getTotalSpots, setTotalSpots, isLotFull } from "./db";

describe("Should test DB service", () => {
  test("should get length of empty db", async () => {
    expect(await getLength()).toEqual(0);
  });

  test("should create a new item", async () => {
    const item = await create({ plate: "TEST 123", parking_time: new Date() });
    expect(await getLength()).toEqual(1);
    expect(item.id).toEqual("1");
    const item2 = await create({ plate: "TEST 124", parking_time: new Date() });
    expect(await getLength()).toEqual(2);
    expect(item2.id).toEqual("2");
  });

  test("should be able to get an item from db", async () => {
    const createdItem = await create({ plate: "TEST 125", parking_time: new Date() });
    if (createdItem.id) {
      const fetchedItem = await get(createdItem.id);
      expect(fetchedItem).toEqual(createdItem);
    }
  });

  test("should not find an item in the db", async () => {
    expect(get("index-not-found")).rejects.toEqual(new Error("Ticket not found."));
  });

  test("should be able to update an item from db", async () => {
    const createdItem = await create({ plate: "TEST 126", parking_time: new Date() });
    const newFields = { plate: "TEST UPD", parking_time: new Date() };
    if (createdItem.id) {
      const updatedItem = await update(createdItem.id, newFields);
      expect(updatedItem.id).toEqual(createdItem.id);
      expect(updatedItem).toEqual(expect.objectContaining(newFields));
    }
  });

  test("should not be able to update an item from db", async () => {
    const newFields = { plate: "TEST UPD", parking_time: new Date() };
    expect(update("index-not-found", newFields)).rejects.toEqual(new Error("Ticket not found."));
  });

  test("should be able to remove an item from db", async () => {
    const createdItem = await create({ plate: "TEST 126", parking_time: new Date() });
    const length = await getLength();
    if (createdItem.id) {
      await remove(createdItem.id);
      expect(await getLength()).toEqual(length - 1);
    }
  });

  test("should not be able to remove an item from db", async () => {
    expect(remove("index-not-found")).rejects.toEqual(new Error("Ticket not found."));
  });

  test("should be able to set total spots", async () => {
    const length = await getLength();
    expect(getTotalSpots()).toEqual(20);
    setTotalSpots(length);
    expect(getTotalSpots()).toEqual(length);
  });

  test("lot should be full", async () => {
    const length = await getLength();
    setTotalSpots(length);
    expect(await isLotFull()).toEqual(true);
  });

  test("should not be able to create more items than available spots", async () => {
    expect(create({ plate: "TEST 10", parking_time: new Date() })).rejects.toEqual(new Error("Lot full."));
  });

  test("should be able to create new after delete", async () => {
    expect(create({ plate: "TEST 10", parking_time: new Date() })).rejects.toEqual(new Error("Lot full."));
    await remove("2");
    expect(create({ plate: "TEST 10", parking_time: new Date() })).resolves;
  });

  test("lot should have spaces", async () => {
    setTotalSpots(100);
    expect(await isLotFull()).toEqual(false);
  });
});
