import client from "./client";

export const getSettings = async () => {

  const response = await client.get("/settings");

  return response.data;

};

export const updateSettings = async (settings) => {

  const response = await client.put("/settings", settings);

  return response.data;

};
