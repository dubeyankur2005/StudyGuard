import axios from "axios";

const API_URL = "http://localhost:3000/api/videos";

export const getDashboardSummary = async () => {
    const response = await axios.get(`${API_URL}/summary`);
    return response.data;
};