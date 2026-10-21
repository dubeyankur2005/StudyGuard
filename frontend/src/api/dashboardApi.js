import client from "./client";

export const getDashboardSummary = async () => {
    const response = await client.get("/videos/summary");
    return response.data;
};
