<template>
  <q-dialog v-model="modal">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">{{ titulo }}</div>
      </q-card-section>
      <q-form @submit="accion" class="q-gutter-md">
        <q-card-section class="q-pt-none">
          <q-input
            filled
            v-model="form.nombre"
            label="Nombre"
            lazy-rules
            :rules="[(val) => !!val || 'Este campo es requerido']"
          />
          <q-input
            filled
            v-model="form.color"
            label="Color"
            type="color"
            lazy-rules
            :rules="[(val) => !!val || 'Este campo es requerido']"
          />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Guardar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script>
import useData from "@/composables/useData";
import EtiquetaServices from "../services/index";
import { ref } from "vue";
export default {
  computed: {
    titulo() {
      return this.id ? "Actualizar" : "Registrar";
    },
  },
  setup(props, context) {
    const { registrarActualizar, getOne } = useData(EtiquetaServices);
    const id = ref(null);
    const form = ref({
      nombre: "",
      color: "",
    });

    const modal = ref(false);
    async function abrirModal(accion, Id = null) {
      switch (accion) {
        case "registrar": {
          id.value = null;
          form.value = {
            nombre: "",
            color: "",
          };
          break;
        }
        case "actualizar": {
          const data = await getOne(Id);
          id.value = data.id;
          form.value = {
            nombre: data.nombre,
            color: data.color,
          };
          break;
        }
      }
      modal.value = true;
    }

    async function accion() {
      const { data } = await registrarActualizar(id.value, form.value);
      modal.value = false;
      context.emit("actualizar", data);
    }

    return {
      id,
      form,
      abrirModal,
      modal,
      registrarActualizar,
      accion,
      getOne,
    };
  },
};
</script>
