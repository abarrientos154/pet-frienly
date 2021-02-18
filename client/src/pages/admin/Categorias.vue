<template>
  <div>
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center" style="background-color: #fff599; width: 250px; border-radius: 12px">Categorias</div>
    </div>
    <div class="row col-2 justify-center">
        <q-btn round color="amber" glossy text-color="black" icon="add" size="md" @click="$router.push('/registrocategorias')" />
    </div>
    <q-list class="q-mx-sm q-my-md q-gutter-sm" v-if="data.length > 0">
        <q-card class="items-center row q-ma-md justify-between" style=" border-left: 6px solid $primary; background-color: rgba(202, 202, 202, 0.474); border-radius: 12px;" v-for="(item, index) in data" :key="index">
            <div class="row justify-center">
                <q-avatar :icon="item.icons" class="text-black" />
                <div class="q-mt-md text-subtitle2 text-weight-bolder">{{item.name}}</div>
            </div>
            <div class="row q-ma-md justify-center">
                <q-btn round class="q-mx-xs" color="red" glossy icon="delete" size="sm" @click="deleteCat(item._id)" />
                <q-separator vertical color="black" />
                <q-btn round class="q-mx-xs" color="green-14" glossy icon="mode_edit" size="sm" @click="editCat(item._id)" />
            </div>
        </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin categorias...</div>
    </q-card>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      data: []
    }
  },
  mounted () {
    this.getCategorias()
    this.baseu = env.apiUrl + '/perfil_img/perfil'
  },
  methods: {
    getCategorias () {
      this.$api.get('categoria').then(res => {
        if (res) {
          this.data = res
        }
      })
    },
    deleteCat (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar esta categoria?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete('delete_cat/' + id).then(res => {
          if (res) {
            this.$q.notify({
              color: 'positive',
              message: 'Eliminado Correctamente'
            })
            this.getCategorias()
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    editCat (id) {
      this.$router.push('/edit_cat/' + id)
    }
  }
}
</script>
