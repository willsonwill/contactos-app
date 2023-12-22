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
            v-model="form.nombres"
            label="Nombre"
            lazy-rules
            :rules="[(val) => !!val || 'Este campo es requerido']"
          />
          <q-input
            filled
            label="Apellidos"
            v-model="form.apellidos"
            lazy-rules
            :rules="[(val) => !!val || 'Este campo es requerido']"
          />
          <q-input
            filled
            label="Correo Electronico"
            v-model="form.correoElectronico"
            lazy-rules
            :rules="[(val) => !!val || 'Este campo es requerido']"
          />
          <q-input
            filled
            label="Telefono Celular"
            v-model="form.telefonoCelular"
            lazy-rules
            :rules="[(val) => !!val || 'Este campo es requerido']"
          />
          <q-input
            filled
            label="Direccion"
            v-model="form.direccion"
            lazy-rules
            :rules="[(val) => !!val || 'Este campo es requerido']"
          />

          <q-select
            filled
            v-model="form.etiquetas"
            multiple
            :options="options"
            :option-label="(option) => option.nombre"
            :option-value="(option) => option.id"
            label="Etiquetas"
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
import ContactosServices from "../services/index";
import EtiquetasServices from "@/modules/etiquetas/services/index";
import { ref } from "vue";
export default {
  computed: {
    titulo() {
      return this.id ? "Actualizar" : "Registrar";
    },
  },
  setup(props, context) {
    const { registrarActualizar, getOne } = useData(ContactosServices);
    const id = ref(null);
    const options = ref([]);
    const form = ref({
      nombres: "",
      apellidos: "",
      telefonoCelular: "",
      direccion: "",
      correoElectronico: "",
      etiquetas: [],
    });

    const listarEtiquetas = async () => {
      try {
        const { data } = await EtiquetasServices.get();
        options.value = data.map((item) => {
          return {
            id: item.id,
            nombre: item.nombre,
            color: item.color,
          };
        });
      } catch ({ response }) {
        console.log(response);
      }
    };

    const modal = ref(false);
    async function abrirModal(accion, Id = null) {
      switch (accion) {
        case "registrar": {
          id.value = null;
          form.value = {
            nombres: "",
            apellidos: "",
            telefonoCelular: "",
            direccion: "",
            correoElectronico: "",
            etiquetas: [],
          };
          break;
        }
        case "actualizar": {
          const data = await getOne(Id);
          id.value = data.id;
          form.value = {
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefonoCelular: data.telefonoCelular,
            direccion: data.direccion,
            correoElectronico: data.correoElectronico,
            etiquetas: data.etiquetas,
          };
          break;
        }
      }
      await listarEtiquetas();
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
      listarEtiquetas,
      options,
    };
  },
};
</script>
