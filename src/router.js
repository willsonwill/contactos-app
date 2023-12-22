import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import NotFound from './components/NotFound.vue'
import Usuarios from '@/modules/usuarios/layouts/UsuariosLayout.vue'

const routes = [
  { path: '/', 
    component: Login, 
    name: 'login', 
    meta:
      { 
        layout:'full'
      } 
  },
  { path: '/home', component: Home, name: 'home' },
  { path: '/usuarios', component: Usuarios, name: 'usuarios' },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'not-found' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default router