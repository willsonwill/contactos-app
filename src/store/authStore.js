import {defineStore} from 'pinia';

import axios from '@/axios.js'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        id: null,
        nombre: null,
        correoElectronico: null,
        token: null,
    }),
    actions: {
        async singIn(credenciales){
            const {data} = await axios.post('autenticacion/iniciar-sesion', credenciales)
            this.attempt(data);
        },
        async attempt({ token, nombre, correoElectronico, id}){
            if(token){
                this.token = token;
                this.nombre = nombre;
                this.correoElectronico = correoElectronico;
                this.id = id;
            }else{
                this.token = null;
                this.nombre = null;
                this.correoElectronico = null;
                this.id = null;
            }
        }

    }
})