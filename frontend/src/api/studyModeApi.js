import client from "./client";

export const getStudyModeStatus = async () => {

  const response = await client.get("/study-mode/status");

  return response.data;

};
