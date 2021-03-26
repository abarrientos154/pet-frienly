<template>
  <div class="bg-secondary" style="height:100%">
      <q-img :src="form.images ? baseu : 'noimgpro.png'" spinner-color="white" style="height: 250px; width: 100%;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
          <div class="text-h6 text-white text-weight-bolder" style="width: 100%">{{infoProv.name}}</div>
      </q-img>
      <q-card class="q-pa-md bg-secondary shadow-up-3 q-mt-sm" style="border-top-left-radius:25px;border-top-right-radius:25px">
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 text-weight-bolder">{{form.name}}</q-item-label>
              <q-item-label class="text-subtitle2">Cantidad: {{form.cantidad}}</q-item-label>
            </q-item-section>
          </q-item>
      </q-card>
      <q-card class="q-pa-md shadow-up-4" style="border-top-left-radius: 25px; border-top-right-radius: 25px; min-height:340px">
        <div class="text-subtitle2 q-ml-md q-pt-xs">Descripción</div>
        <div class="q-pa-md">{{form.descripcion}}</div>
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
      form: {},
      infoProv: {},
      baseu: ''
    }
  },
  mounted () {
    this.cargarProducto()
    console.log(this.form)
  },
  methods: {
    cargarProducto () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.$api.get('producto/' + this.id).then(res => {
            if (res) {
              this.form = res
              this.baseu = env.apiUrl + 'productos_img/' + this.form.images
              if (this.form) {
                this.$api.get('user_by_id/' + this.form.proveedor_id).then(v => {
                  this.infoProv = v
                })
              }
            }
          })
        }
      })
    }
  }
}
</script>
