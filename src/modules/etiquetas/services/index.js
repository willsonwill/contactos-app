import axios from "@/axios";

const get = async () => {
  return await axios.get(`etiquetas`);
};

const store = async (data) => {
  return await axios.post("etiquetas", data);
};

const update = async (id, data) => {
  return await axios.patch(`etiquetas/${id}`, data);
};

const getOne = async (id) => {
  return await axios.get(`etiquetas/${id}`);
};

const destroy = async (id) => {
  return await axios.delete(`etiquetas/${id}`);
};

export default {
  get,
  store,
  update,
  destroy,
  getOne,
};
