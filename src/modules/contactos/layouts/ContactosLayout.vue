<template>
  <div class="q-pa-md">
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            color="primary"
            label="Agregar"
            dense
            @click="$refs.ModalFormRef.abrirModal('registrar', null)"
          />
          <q-btn color="dark" label="Recargar" @click="listar" dense />
        </div>
      </template>
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              color="warning"
              label="Editar"
              dense
              @click="$refs.ModalFormRef.abrirModal('actualizar', props.row.id)"
            />
            <q-btn
              color="negative"
              label="Eliminar"
              dense
              @click="eliminar(props.row.id)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <modal-form ref="ModalFormRef" @actualizar="listar" />
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
    label: "NOMBRES ",
    field: (row) => row.nombres,
    sortable: true,
  },
  {
    name: "apellidos",
    label: "APELLIDOS ",
    field: (row) => row.apellidos,
    sortable: true,
  },
  {
    name: "telefonoCelular",
    label: "TELEFONO CWLULAR",
    field: (row) => row.telefonoCelular,
    sortable: true,
  },
  {
    name: "correoElectronico",
    label: "CORREO ELECTRONICO ",
    field: (row) => row.correoElectronico,
    sortable: true,
  },
  {
    name: "direccion",
    label: "DIRECCION ",
    field: (row) => row.direccion,
    sortable: true,
  },
  {
    name: "creadoEn",
    label: "CREADO ",
    field: (row) => row.creadoEn,
    sortable: true,
  },
  {
    name: "actualizadoEn",
    label: "ACTUALIZADO ",
    field: (row) => row.actualizadoEn,
    sortable: true,
  },
  {
    name: "acciones",
    label: "ACCIONES",
  },
];

import ContactoServices from "../services/index";
import useData from "@/composables/useData";
export default {
  components: {
    ModalForm,
  },
  setup() {
    const { listar, rows, eliminar } = useData(ContactoServices);
    return {
      eliminar,
      listar,
      columns,
      rows,
    };
  },
};
</script>
