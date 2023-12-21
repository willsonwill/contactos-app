<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md" style="max-width: 400px; margin: 0 auto">
      <q-card-seccion>
        <div class="q-gutter-md">
          <h2 class="text-h6">Inicio de Sessión</h2>
          <div>
            <q-input
              filled
              v-model="correoElectronico"
              class="q-md-md"
              label="Correo Electronico"
              type="email"
              dense
            />
            <q-input
              filled
              v-model="password"
              class="q-mt-md"
              label="Password"
              type="password"
              dense
            />
            <q-btn
              @click="submit"
              type="button"
              color="primary"
              label="Iniciar Sessión"
              class="q-mt-md"
            >
            </q-btn>
          </div>
        </div>
      </q-card-seccion>
    </q-card>
  </q-page>
</template>
<script>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default {
  setup() {
    const authStore = useAuthStore();
    const correoElectronico = ref("Rosa.Brakus@hotmail.com");
    const password = ref("Password123$");
    const $q = useQuasar();
    const router = useRouter();

    async function submit() {
      await authStore
        .singIn({
          correoElectronico: correoElectronico.value,
          password: password.value,
        })
        .then(() => {
          $q.notify({
            message: "Usuario logeado correctamente",
            color: "primary",
          });
          // router.push("/home");
        })
        .catch((error) => {
          $q.notify({
            message: "Usuario o contraseña incorrecta",
            color: "red",
          });
        });
      // console.log(correoElectronico.value, password.value);
    }

    return {
      correoElectronico,
      password,
      submit,
    };
  },
};
</script>
