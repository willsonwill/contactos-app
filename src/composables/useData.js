import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar'
export default function useData(serviceGetData) {
    const rows = ref([]);
    const $q = useQuasar()
    const listar = async () => {
        try {
            const {data} = await serviceGetData.get();
            rows.value = data;
        } catch ({response }) {
            console.log(response);
        }
    };

    const eliminar = async (id) => {
        try {
            $q.dialog ({
                title: 'Confirmar',
                message: 'Estas seguro de eliminar?',
                cancel: true,
                persistent: true
              }).onOk(async () => {
                await serviceGetData.destroy(id);
                await listar();
              }).onOk(() => {
                // console.log('>>>> second OK catcher')
              }).onCancel(() => {
                // console.log('>>>> Cancel')
              }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              })
        } catch ({response }) {
            console.log(response);
        }
    };

    const getOne = async (id) => {
      try {
        const {data} = await serviceGetData.getOne(id);
        return data;
      } catch ({response }) {
          console.log(response);
      }
    };

    async function registrarActualizar(id, form) {
      let mensaje = id ? "Actualizado correctamente" : "Registrado correctamente";
      let data;
      try {
        if (id) {
         data = await serviceGetData.update(id, form);
        } else {
          data = await serviceGetData.store(form);
        }

        $q.notify({
          message: mensaje,
          color: "primary",
        });

        return data;
      } catch (error) {
        $q.notify({
          message: error.response.data.message,
          color: "red",
        });
        modal.value = true;
      }
    };

    onMounted(listar);

    return {
        rows,
        listar,
        eliminar,
        getOne,
        registrarActualizar
    }
}