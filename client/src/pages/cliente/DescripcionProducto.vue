<template>
  <div class="q-pa-sm row justify-center">
    <div class="col" style="max-width: 500px; min-width: 300px;">
      <q-card class="q-mb-md shadow-11" style="border-radius: 15px;">
        <q-img :src="imgProd + form.images[0].src"  style="height: 300px;"/>
        <q-separator />
        <q-card-section class="bg-orange-2" style="height: 35%;">
          <div class="q-mb-sm column items-center">
            <div class="text-weight-bolder text-h6">{{form.name}}</div>
            <q-item-label class="text-grey text-subtitle2">Precio: {{form.precio}}$ C/u</q-item-label>
            <q-item-label class="text-grey text-subtitle2">Cantidad: {{form.cantidad}}</q-item-label>
          </div>
          <div>
            <div class="text-subtitle2">Descripción:</div>
            <q-scroll-area style="height: 75px;">
              <div>{{form.descripcion}}</div>
            </q-scroll-area>
          </div>
          <div v-if="rol === 2" class="row justify-center">
            <q-btn flat dense class="bg-primary text-white">
              <div class="row items-center justify-center" style="width:100%">
                <q-icon class="col-1 q-ma-sm" name="payment" color="blak" style="font-size: 20px;"/>
                <div class="q-pl-xs q-pt-xs text-subtitle2">Comprar</div>
              </div>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="bg-orange-2 shadow-11" style="border-radius: 15px; max-width: 500px; min-width: 300px;">
        <div class="row justify-between">
          <div class="col-4" style="width: 100px; height: 110px; border-radius: 15px">
            <q-img :src="imgProv + infoProv._id" style="width: 100px; height: 110px; border-radius: 15px"/>
          </div>
          <div class="col-6 q-py-sm justify-center column">
            <q-scroll-area class="q-ml-sm" horizontal style="height: 20px; width:100%">
              <div class="text-subtitle2 text-weight-bolder">{{infoProv.name}}</div>
            </q-scroll-area>
            <div class="q-ml-sm">{{infoProv.email}}</div>
            <div class="q-ml-sm items-center row text-grey">
              <q-icon class="col-1" name="place" />
              <q-scroll-area class="col" style="height: 20px">
                <div class="text-subtitle2" style="font-size: 12px">{{infoProv.place}}</div>
              </q-scroll-area>
            </div>
          </div>
          <div class="col-2 column justify-center">
            <q-btn round flat color="primary" icon="store" @click="rol === 2 ? $router.push('/tienda/' + infoProv._id) : $router.push('/descripcionusuario/' + infoProv._id)"/>
          </div>
        </div>
      </q-card>
      <div style="height: 100px;"></div>
    </div>
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
      imgProd: '',
      imgProv: ''
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
          this.$api.get('producto/' + this.id).then(res => {
            if (res) {
              this.form = res
              this.imgProd = env.apiUrl + 'productos_img/'
              if (this.form) {
                console.log(this.form)
                this.$api.get('user_by_id/' + this.form.proveedor_id).then(v => {
                  this.infoProv = v
                  this.imgProv = env.apiUrl + 'perfil_img/'
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
