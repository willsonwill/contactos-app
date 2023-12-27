import {ref, onMounted} from 'vue'
import { useQuasar } from "quasar";
export default function useData(servicesData){
    const rows = ref([])
    const errors= ref([])
    const $q = useQuasar();

    const listar = async () => {
      try{
        const {data} = await servicesData.get()
        rows.value = data
        errors.value = []
      }catch(e){
        $q.notify({
          message: e.response.data.error,
          color: "red",
        });
      }
    }

    const eliminar = async (id) => {
      try{
          $q.dialog({
              title: 'Eliminar',
              message: 'Estas seguro de eliminar?'
            }).onOk(async () => {
              await servicesData.destroy(id)
              $q.notify({
                  message: 'Eliminado',
                  color: "primary",
                });
              listar()
            }).onCancel(() => {
              // console.log('Cancel')
            }).onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            })
          listar()
        }catch(e){
          $q.notify({
            message: e.response.data.error,
            color: "red",
          });
        }
    }

    const getOne = async (id) => {
      try{
        return await servicesData.getOne(id)
      }catch(e){
        $q.notify({
          message: e.response.data.error,
          color: "red",
        });
      }
    }

    const registrarActualizar = async (id, form) => {
        let mensaje = id ? 'Actualizado' : 'Registrado'
        let data;
        try{
            if(id){
                data = await servicesData.update(id, form)
            }else{
                data = await servicesData.store(form)
            }
            $q.notify({
                message: mensaje,
                color: "primary",
              });
            return data
        }catch(e){
            console.log(e.response.data)
            errors.value = e.response.data.message
            $q.notify({
                message: e.response.data.error,
                color: "red",
              });
            modal.value=true
        }
        
    }

    onMounted(listar)

    return {
        errors,
        rows,
        listar,
        eliminar,
        getOne,
        registrarActualizar
    }
}