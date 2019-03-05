// @flow
import { cronServer } from "distraught";

// const ENV = process.env.NODE_ENV;
export const CRONS = [
  {
    id: "test-cron",
    name: "Test Cron",
    cronTime: "0 0 0 * * *", // midnight utc
    onTick: testCron,
  },
];

export function startCronServer() {
  cronServer({
    // Note: hours is in UTC time
    // cronTime syntax: (seconds, minutes, hours, day of month, months, day of week), this runs every 5 seconds
    crons: CRONS,
  });
}

async function testCron() {
  return;
}
