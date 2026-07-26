import axios from "axios";

const API_URL = "http://localhost:3000/api/analytics";

// Complete Analytics
export const getAnalytics = async () => {

  const response = await axios.get(API_URL);

  return response;

};

// Weekly Analytics
export const getWeeklyAnalytics = async () => {

  const response = await axios.get(
    `${API_URL}/weekly`
  );

  return response.data;

};