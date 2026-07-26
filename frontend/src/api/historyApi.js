import axios from "axios";

const API = "http://localhost:3000/api/videos";

export const getHistory = () => {

    return axios.get(API);

};

export const deleteHistory = (id) => {

    return axios.delete(`${API}/${id}`);

};