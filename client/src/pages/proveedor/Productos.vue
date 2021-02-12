<template>
  <div>
    <div class="row justify-between q-ma-sm">
        <q-btn no-caps class="shadow-11" color="white" text-color="black" label="Reportes" to="/reportes" />
        <q-btn no-caps class="shadow-11" color="primary" text-color="black" label="Ofertas" />
    </div>
    <q-separator inset />
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center estilo-titulos">Mis Productos</div>
    </div>
    <q-list class="q-mx-sm q-my-md q-gutter-sm" v-if="data.length > 0">
      <q-card class="q-pa-md bordes" v-for="(item, index) in data" :key="index" v-ripple>
        <div class="row justify-between">
          <div @click="$router.push('/descripcionproducto/' + item._id)" class="col-4">
            <q-img :src="item.fileName ? baseu + '/' + item.fileName : 'noimgpro.png'" style="width:100px; height: 80px;" />
          </div>
          <div @click="$router.push('/descripcionproducto/' + item._id)" class="col-6">
              <q-scroll-area
                horizontal
                style="height: 27px"
              >
                <div class="text-subtitle2 text-weight-bolder">{{item.name}}</div>
              </q-scroll-area>
              <div>Cantidad: <strong>{{item.cantidad}}</strong></div>
          </div>
          <q-separator vertical color="black" />
          <div class="column justify-around">
            <q-btn round flat color="white" size="sm" text-color="black" icon="edit" @click="editProduct(item._id)" />
            <q-separator color="black" />
            <q-btn round flat color="white" size="sm" text-color="red" icon="delete" @click="deleteProduct(item._id)" />
          </div>
        </div>
      </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin productos...</div>
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
    this.getProduct()
    this.baseu = env.apiUrl + '/productos_img'
  },
  methods: {
    getProduct () {
      this.$api.get('user_info').then(res => {
        if (res) {
          var id = res._id
          this.$api.get('producto_by_proveedor/' + id).then(v => {
            if (v) {
              this.data = v
            }
          })
        }
      })
    },
    editProduct (id) {
      this.$router.push('/editar_producto/' + id)
    },
    deleteProduct (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas eliminar este producto?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete('producto/' + id).then(res => {
          if (res) {
            this.$q.notify({
              color: 'positive',
              message: 'Eliminado Correctamente'
            })
            this.getProduct()
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
}
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
</style>
