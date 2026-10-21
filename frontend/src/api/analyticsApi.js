import client from "./client";

// Complete Analytics
export const getAnalytics = async () => {

  const response = await client.get("/analytics");

  return response;

};

// Weekly Analytics
export const getWeeklyAnalytics = async () => {

  const response = await client.get("/analytics/weekly");

  return response.data;

};
