<template>
  <div class="bg-secondary" style="height:100%">
      <q-img :src="form.images ? baseu + perfile : 'noimgpro.png'" spinner-color="white" style="height: 250px; width: 100%;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
        <div class="row justify-between" style="width:100%">
            <div class="col-10 text-h6 text-white text-weight-bolder">{{infoClient.full_name && infoClient.last_name ? infoClient.full_name + ' ' + infoClient.last_name : infoClient.full_name}}</div>
        </div>
        <div class="row absolute-bottom" style="width:100%">
          <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
          <div class="q-pl-md q-pt-xs text-caption">{{form.direccion}}</div>
        </div>
      </q-img>

      <q-card class="q-px-md q-py-sm bg-secondary shadow-up-3 q-mt-sm" style="border-top-left-radius:25px;border-top-right-radius:25px">
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6 text-weight-bolder">{{form.name}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <div class="row">
                <q-icon :name="categoria.icons" color="yellow" style="font-size: 2rem;"/>
              </div>
            </q-item-section>
          </q-item>
          <q-scroll-area
          horizontal
          style="height: 110px;"
        >
          <div class="row no-wrap" style="width: 100%">
            <q-card @click="perfile = img" v-for="(img, index) in form.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
              <q-img :src="form.images ? baseu + img : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
            </q-card>
          </div>
        </q-scroll-area>
      </q-card>

      <q-card class="bordes q-pa-md shadow-up-4" style="border-radius:25px">
        <div class="text-subtitle2 q-ml-md q-pt-xs">Descripción</div>
        <div class="q-pa-md">{{form.descripcion}}</div>
      </q-card>

      <q-card class="q-px-sm q-pt-xs q-pb-md shadow-up-4" style="border-top-left-radius:25px;border-top-right-radius:25px;min-height:240px">
        <div class="text-primary text-center text-bold q-my-md text-h5">* Cotización *</div>
        <q-separator inset />
        <div class="column q-ma-md">
          <div class="row items-center">
            <div class="text-subtitle2 text-grey-9 q-ml-sm">* Servicios *</div>
          </div>
          <div class="row justify-center">
            <div class="col-6 title-table q-pa-xs">Servicio</div>
            <div class="col-6 title-table q-pa-xs">Precio</div>
          </div>
          <div class="row justify-center q-mt-sm" v-for="(item, index) in cotization.servicios" :key="index">
            <div class="col-6 title-table-product q-pa-xs">{{item.servicio}}</div>
            <div class="col-6 title-table-product q-pa-xs">{{item.precio}}</div>
          </div>
        </div>
        <q-separator inset />
        <div class="row justify-around q-my-md">
          <div class="text-h6 text-primary">Total</div>
          <div class="text-h6 text-primary">$ {{cotization.total}}</div>
        </div>
      </q-card>
  </div>
</template>

<script>
import env from '../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      idCot: this.$route.params.id_cotizacion,
      rol: 0,
      perfile: '',
      ruta: 'necesidad',
      form: {},
      infoClient: {},
      cotization: {},
      categoria: {},
      baseu: ''
    }
  },
  mounted () {
    this.cargarSolicitud()
    this.getCotization()
    this.baseu = env.apiUrl + '/necesidad_img/'
  },
  methods: {
    cargarSolicitud () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.$api.get(`${this.ruta}/${this.id}`).then(res => {
            if (res) {
              this.form = res
              this.perfile = this.form.images[0]
              this.cargarCategoria()
              if (this.form) {
                this.$api.get('user_by_id/' + this.form.ownerId).then(v => {
                  this.infoClient = v
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
    },
    getCotization () {
      this.$api.get('cotization_by_id/' + this.idCot).then(v => {
        if (v) {
          this.cotization = v.cotizacion
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
.title-table {
  border-radius: 12px;
  background-color: #b3e3f4;
  color: #529cb3;
  border: 1px solid grey;
}
.title-table-product {
  border-radius: 12px;
  background-color: #888585;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
}
</style>
