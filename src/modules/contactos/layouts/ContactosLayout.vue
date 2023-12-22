<template>
  <div class="q-pa-md">
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            color="primary"
            label="Agregar"
            @click="$refs.modalFormRef.abrirModal('registrar', null)"
          />
          <q-btn
            class="q-pa-mt"
            @click="listar"
            color="dark"
            label="Recargar"
          />
        </div>
      </template>
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              color="warning"
              label="Editar"
              @click="$refs.modalFormRef.abrirModal('actualizar', props.row.id)"
            ></q-btn>
            <q-btn
              color="red"
              label="Eliminar"
              @click="eliminar(props.row.id)"
            ></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    <modal-form ref="modalFormRef" @actualizar="listar" />
  </div>
</template>

<script>
import ModalForm from "../components/ModalForm.vue";
const columns = [
  {
    name: "id",
    label: "ID",
    field: (row) => row.id,
    sortable: true,
  },
  {
    name: "nombres",
    label: "NOMBRE",
    field: (row) => row.nombres,
    sortable: true,
  },
  {
    name: "apellidos",
    label: "APELIIDOS",
    field: (row) => row.apellidos,
    sortable: true,
  },
  {
    name: "telefonoCelular",
    label: "TELEFONO CELULAR",
    field: (row) => row.telefonoCelular,
    sortable: true,
  },
  {
    name: "correoElectronico",
    label: "CORREO ELECTRONICO",
    field: (row) => row.correoElectronico,
    sortable: true,
  },
  {
    name: "direccion",
    label: "DIRECCION",
    field: (row) => row.direccion,
    sortable: true,
  },
  {
    name: "creadoEn",
    label: "CREADO",
    field: (row) => row.creadoEn,
    sortable: true,
  },
  {
    name: "actualizadoEn",
    label: "ACTUALIZADO",
    field: (row) => row.actualizadoEn,
    sortable: true,
  },
  {
    name: "acciones",
    label: "ACCIONES",
    align: "center",
  },
];
import useData from "@/composables/useData";
import ContactosServices from "../services/index";
export default {
  components: {
    ModalForm,
  },
  setup() {
    const { rows, listar, eliminar } = useData(ContactosServices);
    return {
      columns,
      rows,
      listar,
      eliminar,
    };
  },
};
</script>
