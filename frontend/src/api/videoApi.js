import axios from "axios";

const API = "http://localhost:3000/api/videos";

export const getAllVideos = async () => {
  const response = await axios.get(API);
  return response.data;
};