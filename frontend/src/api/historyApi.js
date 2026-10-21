import client from "./client";

export const getHistory = () => {

    return client.get("/videos");

};

export const deleteHistory = (id) => {

    return client.delete(`/videos/${id}`);

};
