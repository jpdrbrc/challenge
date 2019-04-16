import localforage from "localforage";
import { LotItem, LotItemData } from "../models/LotItem";

const store = localforage.createInstance({
  name: "lot",
  driver: localforage.INDEXEDDB
});

let totalSpots = 5;

const getLastIndex = () => {
  const lastIndex = window.localStorage.getItem("lastIndex");
  return lastIndex ? parseInt(lastIndex) : 0;
};

const setLastIndex = (number: number) => {
  window.localStorage.setItem("lastIndex", number.toString());
};

export const setTotalSpots = (amount: number) => {
  totalSpots = amount;
};

export const getTotalSpots = () => {
  return totalSpots;
};

export const create = async (data: LotItemData) => {
  try {
    if ((await getLength()) >= totalSpots) {
      throw new Error("Lot full.");
    }

    // Get the last ticket number from local storage and add 1 to it
    const newIndex = getLastIndex() + 1;
    // create the new item
    await store.setItem(newIndex.toString(), data);
    // Write the new last ticket number to local storage.
    setLastIndex(newIndex);
    // Give back the newly created item
    return { id: newIndex.toString(), ...data } as LotItem;
  } catch (e) {
    throw e;
  }
};

export const getLength = async () => {
  try {
    // Get the total length of cars in the lot
    return await store.length();
  } catch (e) {
    throw e;
  }
};

export const get = async (ticketNumber: string) => {
  try {
    // Get the item from local storege.
    const data: LotItem = await store.getItem(ticketNumber);
    // If the new item does not exists, throw an error
    if (!data) {
      throw new Error("Ticket not found.");
    }
    // Return selected item with the ticket numner
    return { ...data, id: ticketNumber };
  } catch (e) {
    throw e;
  }
};

export const update = async (ticketNumber: string, data: Partial<LotItemData>) => {
  try {
    // Get the current item from the db
    // Should throw an error if it does not exist
    const fetchedItem = await get(ticketNumber);
    // merge the old and new data together
    const newData = { ...fetchedItem, ...data };
    // update the item in the DB
    await store.setItem(ticketNumber, newData);
    // Return the new item and the ticket number;
    return { ...newData, id: ticketNumber };
  } catch (e) {
    throw e;
  }
};

export const remove = async (ticketNumber: string) => {
  try {
    // Get the current item from the db
    // Should throw an error if it does not exist
    await get(ticketNumber);
    // Remove the item from the db
    await store.removeItem(ticketNumber);
  } catch (e) {
    throw e;
  }
};

export const isLotFull = async () => {
  try {
    // If db length is greater or equal it is full
    return (await getLength()) >= totalSpots;
  } catch (e) {
    throw e;
  }
};
