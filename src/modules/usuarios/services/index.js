import axios from "@/axios";

const get = async (withDeleted=false) => {
    return await axios.get(`/usuarios?withDeleted=${withDeleted}`);
}

const store = async (data) => {
    return await axios.post(`/usuarios`, data);
}

const update = async (id, data) => {
    return await axios.patch(`/usuarios/${id}`, data);
}

const getOne = async (id) => {
    return await axios.get(`/usuarios/${id}`);
}

const destroy = async (id) => {
    return await axios.delete(`/usuarios/${id}`);
}

export default {
    get,
    store,
    update,
    getOne,
    destroy
}