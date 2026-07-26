import axios from "axios";

const API_URL = "http://localhost:3000/api/settings";

export const getSettings = async () => {

  const response = await axios.get(API_URL);

  return response.data;

};

export const updateSettings = async (settings) => {

  const response = await axios.put(
    API_URL,
    settings
  );

  return response.data;

};