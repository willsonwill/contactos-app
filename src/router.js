import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import NotFound from "./components/NotFound.vue";
import Usuarios from "@/modules/usuarios/layouts/UsuariosLayout.vue";
import Etiquetas from "@/modules/etiquetas/layouts/EtiquetasLayout.vue";
import Contactos from "@/modules/contactos/layouts/ContactosLayout.vue";

const routes = [
  {
    path: "/",
    component: Login,
    name: "login",
    meta: {
      layout: "full",
    },
  },
  { path: "/home", component: Home },
  { path: "/usuarios", component: Usuarios },
  { path: "/etiquetas", component: Etiquetas },
  { path: "/Contactos", component: Contactos },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
