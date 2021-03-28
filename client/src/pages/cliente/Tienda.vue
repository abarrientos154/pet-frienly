<template>
  <div class="q-pa-sm row justify-center">
    <div class="col" style="max-width: 500px; min-width: 300px;">
      <q-card class="q-mb-md shadow-11" style="border-radius: 15px;">
        <div class="row justify-between bg-secondary">
          <div class="col-3">
            <q-scroll-area v-if="rol === 3" style="height: 250px;" class="q-ma-sm">
              <div class="column no-wrap" style="width: 100%">
                <q-card v-for="(img, index) in data.tiendaFiles" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;" :key="index">
                  <q-img :src="baseuTienda + img" spinner-color="white" style="height: 100px; width: 100%" />
                </q-card>
              </div>
            </q-scroll-area>
          </div>
          <div class="q-pa-sm col column items-center">
            <q-avatar size="200px">
              <q-img :src="baseu + perfile" style="width: 100%; height: 100%;"/>
            </q-avatar>
            <div class="row justify-center" style="width: 100%;">
              <q-icon class="col-1" name="person" color="Black" style="font-size: 1.5rem;"/>
              <div class="q-pl-xs q-pt-xs text-weight-bolder text-h6">{{data.name}}</div>
            </div>
          </div>
        </div>
        <q-separator />
        <q-card-section class="bg-orange-2" style="height: 35%;">
          <div class="q-mb-sm column items-center">
            <div class="row" style="width:100%">
              <q-icon class="col-1" name="email" color="blak" style="font-size: 1.5rem;"/>
              <div class="q-pl-xs q-pt-xs text-subtitle2">{{data.email}}</div>
            </div>
            <div class="row" style="width:100%">
              <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
              <q-scroll-area class="col" horizontal style="height: 25px; width:100%">
                <div class="q-pl-xs q-pt-xs text-subtitle2">{{data.place}}</div>
              </q-scroll-area>
            </div>
            <div class="row" style="width:100%">
              <q-icon class="col-1" name="payment" color="blak" style="font-size: 1.5rem;"/>
              <div class="q-pl-xs q-pt-xs text-subtitle2">DNI: {{data.dni}}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card v-if="data.roles" class="q-pa-xs q-mt-md shadow-11 bg-orange-2" style="border-radius: 25px;">
        <div class="q-mx-md text-h6 text-center">{{rol === 3 ? 'Mis Productos' : ''}}</div>
        <listado-de-sugerencia :data="misDatos" :direccion="false" :ruta="data.roles[0] !== 3 ? 'proveedor' : 'cliente'" class="q-mt-xs"/>
      </q-card>

      <div style="height: 100px;"></div>
    </div>
  </div>
</template>

<script>
import ListadoDeSugerencia from '../../components/ListadoDeSugerencia.vue'
import env from '../../env'
export default {
  components: { ListadoDeSugerencia },
  data () {
    return {
      id: this.$route.params.id,
      baseu: '',
      baseuTienda: '',
      perfile: '',
      rol: null,
      today: null,
      now: null,
      data: {},
      misDatos: [],
      img: '',
      estado: false,
      dialogStado: false,
      ratingPerfil: 0
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    verImg (img) {
      this.baseu = env.apiUrl + 'tienda_img/'
      this.perfile = img
    },
    getInfo () {
      this.$api.get('user_by_id/' + this.id).then(v => {
        this.data = v
        this.rol = v.roles[0]
        this.perfile = this.id
        this.baseu = env.apiUrl + 'perfil_img/'
        this.baseuTienda = env.apiUrl + 'tienda_img/'
        if (this.rol === 3) {
          this.getProduct()
        } else {
        }
      })
    },
    getProduct () {
      this.$api.get('producto_by_proveedor/' + this.id).then(v => {
        if (v) {
          this.misDatos = v
        }
      })
    }
  }
}
</script>
