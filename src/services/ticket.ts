import { LotItem } from "../models/LotItem";
import { differenceInMinutes } from "date-fns";
import { update, remove, get } from "./db";
/*

  b. Use 1hr, 3hr, 6hr, or ALL DAY for rate levels
  c. The price increases by 50% for each rate level
  d. The starting rate is $3 for 1hr

*/

// Define the rates as variables so we dont have to do
// the calculations every time the function runs
export const RATE_1H = 3;
export const RATE_3H = RATE_1H * 1.5;
export const RATE_6H = RATE_3H * 1.5;
export const RATE_24H = RATE_6H * 1.5;

// Return the time in minutes so if time is 00:30:03
// it would still be the 30th minute
export const calculateTimeParked = (startTime: Date) => {
  return differenceInMinutes(new Date(), startTime);
};

export const calculateRate = (time: number) => {
  if (time < 0) {
    return 0;
  }

  if (time <= 60) {
    // If time is less than or equal to 1H (60mins)
    return RATE_1H;
  } else if (time <= 180) {
    // If time is less than or equal to 3H (180mins)
    return RATE_3H;
  } else if (time <= 360) {
    // If time is less than or equal to 6H (260mins)
    return RATE_6H;
  }
  // If time is greater than 6H (360mins)
  return RATE_24H;
};

export const getTotal = (item: LotItem) => {
  try {
    // Calculate the time spent in the parking
    const timeSpentParked = calculateTimeParked(item.parking_time);
    // Calculate the rate based on the time spent
    return calculateRate(timeSpentParked);
  } catch (e) {
    throw e;
  }
};

export const pay = async (item: LotItem) => {
  try {
    await update(item.id, { has_paid: true });
  } catch (e) {
    throw e;
  }
};

export const leave = async (item: LotItem) => {
  try {
    const data = await get(item.id);
    if (!data.has_paid) {
      throw new Error("Ticket has not been paid for.");
    }
    await remove(item.id);
  } catch (e) {
    throw e;
  }
};
