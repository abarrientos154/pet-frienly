<template>
  <div class="bg-secondary" style="height:100%">
      <q-img :src="form.fileName ? baseu : 'noimgpro.png'" spinner-color="white" style="height: 250px; width: 100%;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
          <div class="text-h6 text-white text-weight-bolder" style="width: 100%">{{infoProv.full_name ? infoProv.full_name : 'Nombre de Tienda'}}</div>
      </q-img>
      <q-card class="q-pa-md bg-secondary shadow-up-3 q-mt-sm" style="border-top-left-radius:25px;border-top-right-radius:25px">
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 text-weight-bolder">{{form.name}}</q-item-label>
              <q-item-label class="text-subtitle2">Cantidad: {{form.cantidad}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-icon :name="categoria.icons" color="yellow" style="font-size: 2.5rem;"/>
            </q-item-section>
          </q-item>
      </q-card>
      <q-card class="bordes q-pa-md shadow-up-4" style="border-top-left-radius:25px;border-top-right-radius:25px;min-height:340px">
        <div class="text-subtitle2 q-ml-md q-pt-xs">Descripción</div>
        <div class="q-pa-md">{{form.description}}</div>
        <div v-if="rol === 2" class="row justify-center q-pa-sm q-mt-md">
          <q-btn color="primary" label="Ir A Tienda" icon-right="store" @click="$router.push('/tienda/' + infoProv._id)"/>
        </div>
      </q-card>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      rol: 0,
      ruta: 'producto',
      form: {},
      infoProv: {},
      categoria: {},
      baseu: ''
    }
  },
  mounted () {
    this.cargarProducto()
  },
  methods: {
    cargarProducto () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.$api.get(`${this.ruta}/${this.id}`).then(res => {
            if (res) {
              this.form = res
              this.baseu = env.apiUrl + '/productos_img/' + this.form.fileName
              this.cargarCategoria()
              if (this.form) {
                this.$api.get('user_by_id/' + this.form.proveedor_id).then(v => {
                  this.infoProv = v
                })
              }
            }
          })
        }
      })
    },
    cargarCategoria () {
      this.$api.get('categoria').then(v => {
        if (v) {
          this.categoria = v.find(x => x._id === this.form.categoria_id)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-top: 6px solid $primary
}
</style>
