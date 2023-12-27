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
    name: "nombre",
    label: "NOMBRE ",
    field: (row) => row.nombre,
    sortable: true,
  },
  {
    name: "descripcion",
    label: "DESCRIPCION ",
    field: (row) => row.descripcion,
    sortable: true,
  },
  {
    name: "banner",
    label: "BANNER",
    field: (row) => row.banner,
    sortable: true,
  },
  {
    name: "estado",
    label: "ESTADO ",
    field: (row) => row.estado,
    sortable: true,
  },
  {
    name: "fechaInicio",
    label: "FECHA INICIO ",
    field: (row) => row.fechaInicio,
    sortable: true,
  },
  {
    name: "fechaFin",
    label: "FECHA FIN ",
    field: (row) => row.fechaFin,
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

import CapañaServices from "../services/index";
import useData from "@/composables/useData";
export default {
  components: {
    ModalForm,
  },
  setup() {
    const { listar, rows, eliminar } = useData(CapañaServices);
    return {
      eliminar,
      listar,
      columns,
      rows,
    };
  },
};
</script>
