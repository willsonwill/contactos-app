import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import NotFound from './components/NotFound.vue'
import Usuarios from '@/modules/usuarios/layouts/UsuariosLayout.vue'
import Etiquetas from '@/modules/etiquetas/layouts/EtiquetasLayout.vue'
import Contactos from '@/modules/contactos/layouts/ContactosLayout.vue'
import Capañas from '@/modules/campañas/layouts/CampañasLayout.vue'

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
  { path: '/etiquetas', component: Etiquetas, name: 'etiquetas' },
  { path: '/contactos', component: Contactos, name: 'contactos' },
  { path: '/campañas', component: Capañas, name: 'campañas' },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'not-found' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

router.beforeEach((to, _, next) => {
  if(to.name == 'login'){
    if(localStorage.getItem('token')){
      return next({ name: 'home' });
    }
  }
  if(!localStorage.getItem('token')){
    if(to.name != 'login'){
      return next({ name: 'login' });
    }
  }
  return next();
});

export default router