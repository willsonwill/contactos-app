import axios from "@/axios";

const get = async () => {
    return await axios.get(`/contactos`);
}

const store = async (data) => {
    return await axios.post(`/contactos`, data);
}

const update = async (id, data) => {
    return await axios.patch(`/contactos/${id}`, data);
}

const getOne = async (id) => {
    return await axios.get(`/contactos/${id}`);
}

const destroy = async (id) => {
    return await axios.delete(`/contactos/${id}`);
}

export default {
    get,
    store,
    update,
    getOne,
    destroy
}