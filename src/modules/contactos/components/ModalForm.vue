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
              v-model="form.nombres"
              class="q-md-md"
              label="NOMBRES"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <q-input
              filled
              v-model="form.apellidos"
              class="q-md-md"
              label="APELLIDOS"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <q-input
              filled
              v-model="form.telefonoCelular"
              class="q-md-md"
              label="TELEFONO CELULAR"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <q-input
              filled
              v-model="form.correoElectronico"
              class="q-mt-md"
              label="CORREO ELECTRONICO"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <q-input
              filled
              v-model="form.direccion"
              class="q-md-md"
              label="DIRECCION"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <q-select
              filled
              v-model="form.etiquetas"
              multiple
              :options="etiquetas"
              :option-label="(item) => item.nombre"
              :option-value="(item) => item.id"
              label="ETIQUETAS"
            />
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
import ContactoServices from "../services/index";
import EtiquetaServices from "@/modules/etiquetas/services/index";
import useData from "@/composables/useData";
export default {
  setup(props, contex) {
    const { getOne, registrarActualizar } = useData(ContactoServices);
    const modal = ref(false);
    const id = ref(null);
    const etiquetas = ref([]);
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
        const { data } = await EtiquetaServices.get();
        etiquetas.value = data.map((item) => {
          return {
            nombre: item.nombre,
            id: item.id,
            color: item.color,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    async function abrirModal(accion, Id = null) {
      switch (accion) {
        case "registrar":
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
        case "actualizar":
          const { data } = await getOne(Id);
          id.value = Id;
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
      await listarEtiquetas();
      modal.value = true;
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
      listarEtiquetas,
      etiquetas,
    };
  },
};
</script>
