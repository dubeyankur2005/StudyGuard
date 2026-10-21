import client from "./client";

export const getAllVideos = async () => {
  const response = await client.get("/videos");
  return response.data;
};
