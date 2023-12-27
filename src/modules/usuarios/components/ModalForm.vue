<template>
  <q-dialog v-model="modal">
    <q-card style="width: 700px">
      <q-card-section>
        <div class="text-h6">TITULO</div>
      </q-card-section>
      <q-form @submit="accion">
        <q-card-section>
          <div class="q-gutter-md">
            <q-input
              filled
              v-model="form.nombre"
              class="q-md-md"
              label="NOMBRE"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <small
              v-for="error in errors.nombre"
              :key="error"
              class="text-red"
              >{{ error }}</small
            >
            <q-input
              filled
              v-model="form.correoElectronico"
              class="q-mt-md"
              label="CORREO ELECTRONICO"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <small
              v-for="error in errors.correoElectronico"
              :key="error"
              class="text-red"
              >{{ error }}</small
            >
            <q-input
              filled
              v-model="form.password"
              class="q-mt-md"
              label="PASSWORD"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <small
              v-for="error in errors.password"
              :key="error"
              class="text-red"
              >{{ error }}</small
            >
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            type="submit"
            color="primary"
            label="Guardar"
            class="q-mr-md"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import UsuarioServices from "../services/index";
import useData from "@/composables/useData";
export default {
  setup(props, contex) {
    const { getOne, registrarActualizar, errors } = useData(UsuarioServices);
    const modal = ref(false);
    const id = ref(null);
    const form = ref({
      nombre: "",
      correoElectronico: "",
      password: "",
    });

    async function abrirModal(accion, Id = null) {
      switch (accion) {
        case "registrar":
          id.value = null;
          form.value = {
            nombre: "",
            correoElectronico: "",
            password: "",
          };
          break;
        case "actualizar":
          const { data } = await getOne(Id);
          id.value = Id;
          form.value = {
            nombre: data.nombre,
            correoElectronico: data.correoElectronico,
            password: "",
          };
          break;
      }
      modal.value = true;
      errors.value = [];
    }

    async function accion() {
      const { data } = await registrarActualizar(id.value, form.value);
      modal.value = false;
      contex.emit("actualizar", data);
    }

    return {
      abrirModal,
      modal,
      form,
      getOne,
      accion,
      registrarActualizar,
      errors,
    };
  },
};
</script>
