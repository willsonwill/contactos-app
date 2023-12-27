import axios from "@/axios";

const get = async () => {
    return await axios.get(`/campanas`);
}

const store = async (data) => {
    return await axios.post(`/campanas`, data);
}

const update = async (id, data) => {
    return await axios.patch(`/campanas/${id}`, data);
}

const getOne = async (id) => {
    return await axios.get(`/campanas/${id}`);
}

const destroy = async (id) => {
    return await axios.delete(`/campanas/${id}`);
}

export default {
    get,
    store,
    update,
    getOne,
    destroy
}