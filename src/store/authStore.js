import {defineStore} from 'pinia';

import axios from '@/axios.js'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        id: localStorage.getItem('id') || null,
        nombre: localStorage.getItem('nombre') || null,
        correoElectronico: localStorage.getItem('correoElectronico') || null,
        token: localStorage.getItem('token') || null,
    }),
    getters: {
        getAuth:(state)=>{
            return{
                token: state.token,
                nombre: state.nombre,
                correoElectronico: state.correoElectronico,
                id: state.id
            }
        }
    },
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
        },
        signOut(){
            this.token = null;
            this.nombre = null;
            this.correoElectronico = null;
            this.id = null;
        }
    }
})