import { watchEffect } from 'vue';
import { useAuthStore } from "@/store/authStore";
import axios from "@/axios";

export function suscriber() {
  const authStore = useAuthStore();
  watchEffect(() => {
    const token = authStore.token;
    const nombre = authStore.nombre;
    const correoElectronico = authStore.correoElectronico;
    const id = authStore.id;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      axios.defaults.headers.common['Authorization'] = null;
      localStorage.removeItem('token');
    }
    if (nombre) {
      localStorage.setItem('nombre', nombre);
    } else {
      localStorage.removeItem('nombre');
    }
    if (correoElectronico) {
      localStorage.setItem('correoElectronico', correoElectronico);
    } else {
      localStorage.removeItem('correoElectronico');
    }
    if (id) {
      localStorage.setItem('id', id);
    } else {
      localStorage.removeItem('id');
    }
  });
}