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
              v-model="form.descripcion"
              class="q-md-md"
              label="DESCRIPCION"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <small
              v-for="error in errors.descripcion"
              :key="error"
              class="text-red"
              >{{ error }}</small
            >
            <q-input
              filled
              v-model="form.banner"
              class="q-md-md"
              label="BANNER"
              dense
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
            <small
              v-for="error in errors.banner"
              :key="error"
              class="text-red"
              >{{ error }}</small
            >
            <q-input
              filled
              v-model="form.fechaInicio"
              mask="date"
              label="FECHA INICIO"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="form.fechaInicio">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <small
              v-for="error in errors.fechaInicio"
              :key="error"
              class="text-red"
              >{{ error }}</small
            >
            <q-input
              filled
              v-model="form.fechaFin"
              mask="date"
              label="FECHA FIN"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="form.fechaFin">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <small
              v-for="error in errors.fechaFin"
              :key="error"
              class="text-red"
              >{{ error }}</small
            >
            <q-select
              filled
              v-model="form.etiquetas"
              multiple
              :options="etiquetas"
              :option-label="(item) => item.nombre"
              :option-value="(item) => item.id"
              label="ETIQUETAS"
            />
            <small
              v-for="error in errors.etiquetas"
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
import ContactoServices from "../services/index";
import EtiquetaServices from "@/modules/etiquetas/services/index";
import useData from "@/composables/useData";
export default {
  setup(props, contex) {
    const { getOne, registrarActualizar, errors } = useData(ContactoServices);
    const modal = ref(false);
    const id = ref(null);
    const etiquetas = ref([]);
    const form = ref({
      nombre: "",
      descripcion: "",
      banner: "",
      fechaInicio: "",
      fechaFin: "",
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
            nombre: "",
            descripcion: "",
            banner: "",
            fechaInicio: "",
            fechaFin: "",
            etiquetas: [],
          };
          break;
        case "actualizar":
          const { data } = await getOne(Id);
          id.value = Id;
          form.value = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            banner: data.banner,
            fechaInicio: data.fechaInicio,
            fechaFin: data.fechaFin,
            etiquetas: data.etiquetas,
          };
          break;
      }
      await listarEtiquetas();
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
      listarEtiquetas,
      etiquetas,
      errors,
    };
  },
};
</script>
