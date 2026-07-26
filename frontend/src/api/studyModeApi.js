import axios from "axios";

const API_URL = "http://localhost:3000/api/study-mode";

export const getStudyModeStatus = async () => {

  const response = await axios.get(
    `${API_URL}/status`
  );

  return response.data;

};